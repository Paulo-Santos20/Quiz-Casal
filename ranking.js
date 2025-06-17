// ranking.js
class RankingSystem {
    constructor() {
        this.rankings = [];
        this.currentFilter = 'all';
        this.currentPlayer = null;
        
        // Aguardar DOM carregar antes de inicializar
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        console.log('🏆 Iniciando sistema de ranking...');
        
        // Verificar se elementos existem antes de usar
        this.checkRequiredElements();
        
        this.setupEventListeners();
        this.loadCurrentPlayer();
        this.loadRankings();
    }

    checkRequiredElements() {
        const requiredElements = [
            'rankingList',
            'loadingRanking',
            'totalPlayers',
            'totalGames',
            'avgScore'
        ];

        const missingElements = [];
        
        requiredElements.forEach(id => {
            const element = document.getElementById(id);
            if (!element) {
                missingElements.push(id);
            }
        });

        if (missingElements.length > 0) {
            console.warn('⚠️ Elementos HTML não encontrados:', missingElements);
            
            // Criar elementos faltantes dinamicamente
            this.createMissingElements(missingElements);
        }
    }

    createMissingElements(missingElements) {
        const container = document.querySelector('.container') || document.body;
        
        missingElements.forEach(id => {
            const element = document.createElement('div');
            element.id = id;
            
            switch(id) {
                case 'loadingRanking':
                    element.innerHTML = `
                        <div class="loading" style="display: none;">
                            <div class="loading-spinner"></div>
                            <p>Carregando ranking...</p>
                        </div>
                    `;
                    element.style.display = 'none';
                    break;
                    
                case 'rankingList':
                    element.className = 'ranking-list';
                    break;
                    
                case 'totalPlayers':
                case 'totalGames':
                case 'avgScore':
                    element.textContent = '0';
                    break;
            }
            
            container.appendChild(element);
        });
    }

    setupEventListeners() {
        // Filtros de ranking
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.setFilter(filter);
            });
        });

        // Botão de atualizar
        const refreshBtn = document.getElementById('refreshRanking');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => this.loadRankings());
        }
    }

    loadCurrentPlayer() {
        try {
            // Tentar carregar do sistema Supabase primeiro
            if (typeof window.getCurrentPlayer === 'function') {
                this.currentPlayer = window.getCurrentPlayer();
                console.log('👤 Jogador atual (Supabase):', this.currentPlayer?.name || 'Nenhum');
            } else {
                // Fallback para localStorage
                const localPlayer = localStorage.getItem('currentPlayer');
                if (localPlayer) {
                    this.currentPlayer = JSON.parse(localPlayer);
                    console.log('👤 Jogador atual (Local):', this.currentPlayer?.name || 'Nenhum');
                }
            }

            this.showPlayerInfo();
        } catch (error) {
            console.error('❌ Erro ao carregar jogador atual:', error);
        }
    }

    showPlayerInfo() {
        const playerInfoElement = document.getElementById('currentPlayerInfo');
        
        // Verificar se elemento existe
        if (!playerInfoElement) {
            console.log('ℹ️ Elemento currentPlayerInfo não encontrado, criando...');
            this.createPlayerInfoElement();
            return;
        }

        if (this.currentPlayer) {
            const rank = this.getPlayerRankPosition();
            playerInfoElement.innerHTML = `
                <div class="current-player-card">
                    <div class="player-avatar">👤</div>
                    <div class="player-details">
                        <h3>${this.currentPlayer.name}</h3>
                        <div class="player-stats">
                            <span class="stat">🏆 ${this.currentPlayer.total_score || 0} pts</span>
                            <span class="stat">🎮 ${this.currentPlayer.total_games || 0} jogos</span>
                            <span class="stat">📍 #${rank} posição</span>
                        </div>
                    </div>
                </div>
            `;
            playerInfoElement.style.display = 'block';
        } else {
            playerInfoElement.innerHTML = `
                <div class="no-player-info">
                    <p>👋 Nenhum jogador logado</p>
                    <small>Jogue uma partida para aparecer no ranking!</small>
                </div>
            `;
            playerInfoElement.style.display = 'block';
        }
    }

    createPlayerInfoElement() {
        const container = document.querySelector('.ranking-container') || document.querySelector('.container');
        if (!container) return;

        const playerInfoElement = document.createElement('div');
        playerInfoElement.id = 'currentPlayerInfo';
        playerInfoElement.className = 'current-player-info';
        
        // Inserir antes da lista de ranking
        const rankingList = document.getElementById('rankingList');
        if (rankingList) {
            container.insertBefore(playerInfoElement, rankingList);
        } else {
            container.appendChild(playerInfoElement);
        }
        
        // Chamar novamente para popular o conteúdo
        this.showPlayerInfo();
    }

    async loadRankings() {
        const loadingElement = document.getElementById('loadingRanking');
        const rankingListElement = document.getElementById('rankingList');
        
        // Mostrar loading se elemento existir
        if (loadingElement) {
            loadingElement.style.display = 'block';
        }
        
        try {
            // Carregar dados do Supabase
            if (typeof window.loadOnlineRankings === 'function') {
                this.rankings = await window.loadOnlineRankings();
                console.log('🟢 Rankings carregados do Supabase:', this.rankings.length);
            } else {
                // Fallback local
                this.rankings = JSON.parse(localStorage.getItem('globalRankings') || '[]');
                console.log('📱 Rankings carregados localmente:', this.rankings.length);
            }
            
            this.displayRankings();
            await this.updateSupabaseStats();
            
        } catch (error) {
            console.error('❌ Erro ao carregar rankings:', error);
            
            if (rankingListElement) {
                rankingListElement.innerHTML = `
                    <div class="error-message">
                        <div class="error-icon">❌</div>
                        <h3>Erro ao carregar ranking</h3>
                        <p>Não foi possível conectar com o Supabase</p>
                        <button onclick="location.reload()" class="retry-btn">🔄 Tentar Novamente</button>
                    </div>
                `;
            }
        } finally {
            // Esconder loading
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
        }
    }

    displayRankings() {
        const rankingListElement = document.getElementById('rankingList');
        if (!rankingListElement) {
            console.error('❌ Elemento rankingList não encontrado!');
            return;
        }

        if (!this.rankings || this.rankings.length === 0) {
            rankingListElement.innerHTML = `
                <div class="empty-ranking">
                    <div class="empty-icon">🏆</div>
                    <h3>Ranking Vazio</h3>
                    <p>Seja o primeiro a jogar e aparecer no ranking!</p>
                    <a href="index.html" class="play-btn">🎯 Jogar Agora</a>
                </div>
            `;
            return;
        }

        let filteredRankings = this.applyFilter(this.rankings);
        
        const rankingHTML = filteredRankings.map((player, index) => {
            const isCurrentPlayer = this.currentPlayer && player.id === this.currentPlayer.id;
            const position = index + 1;
            const medal = this.getMedal(position);
            
            // Calcular taxa de acerto
            const winRate = player.total_games > 0 ? 
                Math.round((player.total_score / (player.total_games * 5)) * 100) : 0;
            
            // Formatar última jogada
            const lastPlayed = player.last_played ? 
                new Date(player.last_played).toLocaleDateString('pt-BR') : 'Nunca';

            return `
                <div class="ranking-item ${isCurrentPlayer ? 'current-player' : ''}" data-position="${position}">
                    <div class="rank-position">
                        <span class="medal">${medal}</span>
                        <span class="position">#${position}</span>
                    </div>
                    
                    <div class="player-info">
                        <div class="player-name">
                            ${player.name}
                            ${isCurrentPlayer ? '<span class="you-badge">VOCÊ</span>' : ''}
                        </div>
                        <div class="player-details">
                            <span class="detail">🏆 ${player.total_score || 0} pts</span>
                            <span class="detail">🎮 ${player.total_games || 0} jogos</span>
                            <span class="detail">⭐ ${player.perfect_hits || 0} perfeitos</span>
                            <span class="detail">🔥 ${player.best_streak || 0} sequência</span>
                        </div>
                    </div>
                    
                    <div class="player-stats">
                        <div class="stat-item">
                            <span class="stat-value">${winRate}%</span>
                            <span class="stat-label">Taxa</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${player.current_streak || 0}</span>
                            <span class="stat-label">Atual</span>
                        </div>
                        <div class="last-played">
                            <small>Último: ${lastPlayed}</small>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        rankingListElement.innerHTML = rankingHTML;
        
        // Scroll para jogador atual se estiver na lista
        if (this.currentPlayer) {
            setTimeout(() => {
                const currentPlayerElement = document.querySelector('.ranking-item.current-player');
                if (currentPlayerElement) {
                    currentPlayerElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 500);
        }
    }

    applyFilter(rankings) {
        switch(this.currentFilter) {
            case 'top10':
                return rankings.slice(0, 10);
            case 'recent':
                return rankings
                    .filter(p => p.last_played)
                    .sort((a, b) => new Date(b.last_played) - new Date(a.last_played))
                    .slice(0, 20);
            default:
                return rankings;
        }
    }

    getMedal(position) {
        switch(position) {
            case 1: return '🥇';
            case 2: return '🥈';
            case 3: return '🥉';
            default: return '🏅';
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Atualizar botões
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.querySelector(`[data-filter="${filter}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        this.displayRankings();
    }

    getPlayerRankPosition() {
        if (!this.currentPlayer || !this.rankings.length) return 0;
        
        const position = this.rankings.findIndex(p => p.id === this.currentPlayer.id);
        return position >= 0 ? position + 1 : 0;
    }

    async updateSupabaseStats() {
        try {
            if (typeof window.getGlobalStats === 'function') {
                const stats = await window.getGlobalStats();
                
                const totalPlayersElement = document.getElementById('totalPlayers');
                const totalGamesElement = document.getElementById('totalGames');
                const avgScoreElement = document.getElementById('avgScore');
                
                if (totalPlayersElement) totalPlayersElement.textContent = stats.totalPlayers;
                if (totalGamesElement) totalGamesElement.textContent = stats.totalGames;
                if (avgScoreElement) avgScoreElement.textContent = stats.avgScore;
                
                console.log('📊 Estatísticas Supabase atualizadas:', stats);
            }
        } catch (error) {
            console.error('❌ Erro ao carregar estatísticas Supabase:', error);
        }
    }
}

// Inicializar sistema
const rankingSystem = new RankingSystem();

// Função global para reset (compatibilidade)
window.resetLocalRanking = () => {
    if (confirm('🔄 Resetar ranking local?')) {
        localStorage.removeItem('globalRankings');
        localStorage.removeItem('gameStats');
        location.reload();
    }
};