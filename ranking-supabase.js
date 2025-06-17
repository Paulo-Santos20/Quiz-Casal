// ranking-supabase.js
class SupabaseRanking {
    constructor() {
        this.currentPlayer = null;
        this.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        
        this.init();
    }

    async init() {
        console.log('🟢 Iniciando Supabase Ranking...');
        
        // FORÇAR limpeza de dados incompatíveis
        this.forceCleanIncompatibleData();
        
        // Testar conexão
        try {
            const { data, error } = await this.supabase.from('players').select('count').limit(1);
            if (error) {
                console.error('❌ Erro de conexão:', error);
                alert('❌ Erro ao conectar com o banco de dados!');
                return;
            }
            console.log('✅ Conexão com Supabase OK!');
        } catch (error) {
            console.error('❌ Erro crítico:', error);
            alert('❌ Erro crítico ao conectar com Supabase!');
            return;
        }
        
        await this.loadCurrentPlayer();
        console.log('✅ Sistema Supabase inicializado!');
    }

    // NOVA FUNÇÃO: Limpeza forçada e detecção de versão
    forceCleanIncompatibleData() {
        const version = localStorage.getItem('supabase_version');
        const currentVersion = '2.0'; // Nova versão com IDs numéricos
        
        if (version !== currentVersion) {
            console.log('🧹 Detectada versão incompatível, limpando todos os dados...');
            
            // Limpar TODOS os dados relacionados
            const keysToRemove = [
                'currentPlayer',
                'globalRankings', 
                'gameStats',
                'lastPlayedDate',
                'playerStats',
                'dailyProgress'
            ];
            
            keysToRemove.forEach(key => {
                localStorage.removeItem(key);
            });
            
            // Marcar nova versão
            localStorage.setItem('supabase_version', currentVersion);
            console.log('✅ Dados limpos, versão atualizada para', currentVersion);
        }
        
        // Verificação adicional de segurança
        const localPlayer = localStorage.getItem('currentPlayer');
        if (localPlayer) {
            try {
                const playerData = JSON.parse(localPlayer);
                
                // Se ID é string ou tem formato antigo, limpar
                if (typeof playerData.id === 'string' || 
                    (playerData.id && playerData.id.toString().includes('player_'))) {
                    console.log('🚨 ID antigo detectado, forçando limpeza...');
                    localStorage.removeItem('currentPlayer');
                }
            } catch (error) {
                console.log('🧹 Dados corrompidos detectados, limpando...');
                localStorage.removeItem('currentPlayer');
            }
        }
    }

    async loadCurrentPlayer() {
        // Tentar carregar do localStorage
        const localPlayer = localStorage.getItem('currentPlayer');
        
        if (localPlayer) {
            try {
                this.currentPlayer = JSON.parse(localPlayer);
                
                // VERIFICAÇÃO RIGOROSA: ID deve ser número
                if (typeof this.currentPlayer.id !== 'number' || 
                    isNaN(this.currentPlayer.id) ||
                    this.currentPlayer.id <= 0) {
                    throw new Error('ID inválido detectado');
                }
                
                console.log('👤 Jogador carregado:', this.currentPlayer.name, 'ID:', this.currentPlayer.id);
                
                // Sincronizar com servidor
                await this.syncPlayerToServer();
            } catch (error) {
                console.log('❌ Erro ao carregar jogador:', error.message);
                console.log('🔄 Criando novo jogador...');
                await this.createNewPlayer();
            }
        } else {
            await this.createNewPlayer();
        }
    }

    async createNewPlayer() {
        const playerName = prompt('🎯 Digite seu nome para o ranking online:') || 'Jogador Anônimo';
        
        // Gerar ID numérico único
        const playerId = this.generateNumericPlayerId();
        
        const playerData = {
            id: playerId,
            name: playerName.trim().substring(0, 20),
            total_score: 0,
            total_games: 0,
            perfect_hits: 0,
            current_streak: 0,
            best_streak: 0,
            join_date: new Date().toISOString(),
            last_played: null
        };

        console.log('🆔 Novo jogador criado:');
        console.log('- ID:', playerId, '(tipo:', typeof playerId, ')');
        console.log('- Nome:', playerData.name);

        try {
            // Inserir no Supabase
            const { data, error } = await this.supabase
                .from('players')
                .insert([playerData])
                .select();

            if (error) throw error;

            // Salvar localmente
            this.currentPlayer = playerData;
            localStorage.setItem('currentPlayer', JSON.stringify(this.currentPlayer));
            
            console.log('👤 Jogador salvo no Supabase com sucesso!');
            this.showNotification('Bem-vindo!', `Jogador ${playerName} criado com sucesso`);
            
        } catch (error) {
            console.error('❌ Erro ao criar jogador:', error);
            alert('❌ Erro ao salvar jogador no servidor! Verifique sua conexão.');
        }
    }

    generateNumericPlayerId() {
        // Gerar ID baseado em timestamp + random para garantir unicidade
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        const id = parseInt(`${timestamp}${random}`);
        
        console.log('🔢 ID numérico gerado:', id);
        return id;
    }

    async addScore(hintsUsed) {
        if (!this.currentPlayer) {
            console.warn('⚠️ Nenhum jogador logado');
            return;
        }

        // VERIFICAÇÃO CRÍTICA: ID deve ser número
        if (typeof this.currentPlayer.id !== 'number') {
            console.error('🚨 ID inválido detectado durante addScore:', this.currentPlayer.id);
            alert('❌ Erro: Dados do jogador corrompidos. A página será recarregada.');
            localStorage.removeItem('currentPlayer');
            location.reload();
            return;
        }

        const points = Math.max(6 - hintsUsed, 1);
        
        // Atualizar dados localmente
        this.currentPlayer.total_score += points;
        this.currentPlayer.total_games++;
        this.currentPlayer.current_streak++;
        this.currentPlayer.last_played = new Date().toISOString();
        
        if (this.currentPlayer.current_streak > this.currentPlayer.best_streak) {
            this.currentPlayer.best_streak = this.currentPlayer.current_streak;
        }
        
        if (hintsUsed === 1) {
            this.currentPlayer.perfect_hits++;
        }

        // Salvar localmente
        localStorage.setItem('currentPlayer', JSON.stringify(this.currentPlayer));

        // Enviar para Supabase
        await this.syncPlayerToServer();
        
        console.log(`🎯 +${points} pontos (${hintsUsed} dicas) - Total: ${this.currentPlayer.total_score}`);
        this.showNotification(`+${points} pontos!`, `Acertou com ${hintsUsed} dica${hintsUsed > 1 ? 's' : ''}`);
    }

    async addFailure() {
        if (!this.currentPlayer) return;
        
        // VERIFICAÇÃO CRÍTICA: ID deve ser número
        if (typeof this.currentPlayer.id !== 'number') {
            console.error('🚨 ID inválido detectado durante addFailure:', this.currentPlayer.id);
            localStorage.removeItem('currentPlayer');
            location.reload();
            return;
        }
        
        this.currentPlayer.total_games++;
        this.currentPlayer.current_streak = 0;
        this.currentPlayer.last_played = new Date().toISOString();
        
        localStorage.setItem('currentPlayer', JSON.stringify(this.currentPlayer));
        await this.syncPlayerToServer();
        
        console.log('❌ Falha registrada - sequência zerada');
    }

    async syncPlayerToServer() {
        try {
            // VERIFICAÇÃO FINAL ANTES DE ENVIAR
            if (typeof this.currentPlayer.id !== 'number') {
                throw new Error(`ID deve ser número, recebido: ${typeof this.currentPlayer.id} (${this.currentPlayer.id})`);
            }

            const updateData = {
                name: this.currentPlayer.name,
                total_score: this.currentPlayer.total_score,
                total_games: this.currentPlayer.total_games,
                perfect_hits: this.currentPlayer.perfect_hits,
                current_streak: this.currentPlayer.current_streak,
                best_streak: this.currentPlayer.best_streak,
                last_played: this.currentPlayer.last_played
            };

            console.log('📤 Sincronizando com Supabase:');
            console.log('- ID:', this.currentPlayer.id, '(tipo:', typeof this.currentPlayer.id, ')');
            console.log('- Dados:', updateData);

            const { data, error } = await this.supabase
                .from('players')
                .update(updateData)
                .eq('id', this.currentPlayer.id)
                .select();

            if (error) throw error;

            console.log('☁️ Dados sincronizados com Supabase com sucesso!');
            
        } catch (error) {
            console.error('❌ Erro ao sincronizar:', error);
            
            // Se for erro de ID, limpar dados e recarregar
            if (error.message && error.message.includes('invalid input syntax')) {
                console.log('🚨 Erro de ID detectado, limpando dados...');
                localStorage.removeItem('currentPlayer');
                alert('❌ Dados corrompidos detectados. A página será recarregada.');
                location.reload();
                return;
            }
            
            console.log('📱 Dados salvos apenas localmente');
        }
    }

    async loadRankings() {
        try {
            console.log('📡 Carregando ranking do Supabase...');
            
            const { data, error } = await this.supabase
                .from('players')
                .select('*')
                .order('total_score', { ascending: false })
                .order('total_games', { ascending: true })
                .limit(100);

            if (error) throw error;

            console.log(`🏆 ${data.length} jogadores carregados do Supabase`);
            return data;
            
        } catch (error) {
            console.error('❌ Erro ao carregar ranking:', error);
            
            // Fallback para localStorage
            const localRankings = JSON.parse(localStorage.getItem('globalRankings') || '[]');
            console.log('📱 Usando ranking local como fallback');
            return localRankings;
        }
    }

    async getPlayerRank() {
        try {
            const { data, error } = await this.supabase
                .from('players')
                .select('total_score')
                .gt('total_score', this.currentPlayer.total_score);

            if (error) throw error;
                
            return data.length + 1;
        } catch (error) {
            console.error('❌ Erro ao obter posição:', error);
            return 0;
        }
    }

    async getGlobalStats() {
        try {
            // Contar total de jogadores
            const { count: totalPlayers, error: countError } = await this.supabase
                .from('players')
                .select('*', { count: 'exact', head: true });

            if (countError) throw countError;

            // Somar estatísticas
            const { data, error } = await this.supabase
                .from('players')
                .select('total_games, total_score');

            if (error) throw error;

            const totalGames = data.reduce((sum, p) => sum + (p.total_games || 0), 0);
            const totalScore = data.reduce((sum, p) => sum + (p.total_score || 0), 0);
            const avgScore = totalPlayers > 0 ? Math.round(totalScore / totalPlayers) : 0;

            return {
                totalPlayers: totalPlayers || 0,
                totalGames,
                avgScore
            };
        } catch (error) {
            console.error('❌ Erro ao carregar estatísticas:', error);
            return { totalPlayers: 0, totalGames: 0, avgScore: 0 };
        }
    }

    async resetAllRankings() {
        if (!confirm('🔄 ATENÇÃO! Isso vai apagar TODOS os dados do ranking online!\n\nTem certeza absoluta?')) {
            return;
        }

        try {
            const { error } = await this.supabase
                .from('players')
                .delete()
                .neq('id', 0); // Deleta todos (ID nunca será 0)

            if (error) throw error;

            // Limpar dados locais também
            localStorage.clear(); // Limpar TUDO
            
            alert('✅ Ranking resetado com sucesso!');
            location.reload();
            
        } catch (error) {
            console.error('❌ Erro ao resetar:', error);
            alert('❌ Erro ao resetar ranking!');
        }
    }

    showNotification(title, subtitle) {
        const notification = document.createElement('div');
        notification.className = 'supabase-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">🟢</div>
                <div class="notification-text">
                    <strong>${title}</strong><br>
                    <small>${subtitle}</small>
                    <small class="supabase-badge">☁️ Supabase</small>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 4000);
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }
}

// Inicializar sistema Supabase
let supabaseRanking;

document.addEventListener('DOMContentLoaded', async () => {
    // Verificar se Supabase está carregado
    if (typeof window.supabase === 'undefined') {
        console.error('❌ Supabase não carregado!');
        alert('❌ Erro: Biblioteca Supabase não encontrada!');
        return;
    }

    supabaseRanking = new SupabaseRanking();
    
    // Funções globais
    window.addGameScore = (hintsUsed) => {
        supabaseRanking.addScore(hintsUsed);
    };

    window.addGameFailure = () => {
        supabaseRanking.addFailure();
    };

    window.getCurrentPlayer = () => {
        return supabaseRanking.getCurrentPlayer();
    };

    window.loadOnlineRankings = () => {
        return supabaseRanking.loadRankings();
    };

    window.getGlobalStats = () => {
        return supabaseRanking.getGlobalStats();
    };

    window.resetSupabaseRanking = () => {
        return supabaseRanking.resetAllRankings();
    };
});