class JSONBinRanking {
    constructor() {
        // SUBSTITUA PELOS SEUS DADOS:
        this.binId = '685069758960c979a5aafc13'; // Ex: '65a1b2c3d4e5f6789'
        this.apiKey = '$2a$10$zkLupWwTr6kn9NpCl8xckujt9lubBU9jT/wi5t3jnEQL3h/dL/Rda'; // Ex: '$2a$10$abc123...'
        this.apiUrl = `https://api.jsonbin.io/v3/b/${this.binId}`;
        
        this.currentPlayer = null;
        this.rankings = [];
        
        this.init();
    }

    async init() {
        console.log('🌐 Iniciando JSONBin Ranking...');
        await this.loadCurrentPlayer();
        console.log('✅ Sistema online inicializado!');
    }

    async loadCurrentPlayer() {
        const localPlayer = localStorage.getItem('currentPlayer');
        
        if (localPlayer) {
            this.currentPlayer = JSON.parse(localPlayer);
            console.log('👤 Jogador carregado:', this.currentPlayer.name);
        } else {
            await this.createNewPlayer();
        }
    }

    async createNewPlayer() {
        const playerName = prompt('🎯 Digite seu nome para o ranking online:') || 'Jogador Anônimo';
        
        this.currentPlayer = {
            id: this.generatePlayerId(),
            name: playerName.trim().substring(0, 20),
            totalScore: 0,
            totalGames: 0,
            perfectHits: 0,
            currentStreak: 0,
            bestStreak: 0,
            joinDate: new Date().toISOString(),
            lastPlayed: null
        };
        
        localStorage.setItem('currentPlayer', JSON.stringify(this.currentPlayer));
        await this.syncToServer();
        
        console.log('👤 Novo jogador criado:', this.currentPlayer.name);
    }

    generatePlayerId() {
        return 'player_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    async addScore(hintsUsed) {
        if (!this.currentPlayer) return;

        const points = Math.max(6 - hintsUsed, 1);
        
        this.currentPlayer.totalScore += points;
        this.currentPlayer.totalGames++;
        this.currentPlayer.currentStreak++;
        this.currentPlayer.lastPlayed = new Date().toISOString();
        
        if (this.currentPlayer.currentStreak > this.currentPlayer.bestStreak) {
            this.currentPlayer.bestStreak = this.currentPlayer.currentStreak;
        }
        
        if (hintsUsed === 1) {
            this.currentPlayer.perfectHits++;
        }

        localStorage.setItem('currentPlayer', JSON.stringify(this.currentPlayer));
        await this.syncToServer();
        
        console.log(`🎯 +${points} pontos (${hintsUsed} dicas)`);
        this.showNotification(`+${points} pontos!`, `Acertou com ${hintsUsed} dica${hintsUsed > 1 ? 's' : ''}`);
    }

    async addFailure() {
        if (!this.currentPlayer) return;
        
        this.currentPlayer.totalGames++;
        this.currentPlayer.currentStreak = 0;
        this.currentPlayer.lastPlayed = new Date().toISOString();
        
        localStorage.setItem('currentPlayer', JSON.stringify(this.currentPlayer));
        await this.syncToServer();
    }

    async syncToServer() {
        try {
            // Carregar dados atuais
            const currentData = await this.loadFromServer();
            
            // Atualizar ou adicionar jogador
            const playerIndex = currentData.players.findIndex(p => p.id === this.currentPlayer.id);
            
            if (playerIndex >= 0) {
                currentData.players[playerIndex] = this.currentPlayer;
            } else {
                currentData.players.push(this.currentPlayer);
            }
            
            // Ordenar por pontuação
            currentData.players.sort((a, b) => {
                if (b.totalScore !== a.totalScore) {
                    return b.totalScore - a.totalScore;
                }
                return a.totalGames - b.totalGames;
            });
            
            currentData.lastUpdate = new Date().toISOString();
            
            // Salvar no servidor
            const response = await fetch(this.apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': this.apiKey
                },
                body: JSON.stringify(currentData)
            });
            
            if (response.ok) {
                console.log('☁️ Dados salvos online!');
            } else {
                throw new Error('Erro ao salvar');
            }
            
        } catch (error) {
            console.error('❌ Erro ao sincronizar:', error);
            console.log('📱 Continuando offline...');
        }
    }

    async loadFromServer() {
        try {
            const response = await fetch(`${this.apiUrl}/latest`, {
                headers: {
                    'X-Master-Key': this.apiKey
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                return data.record;
            } else {
                throw new Error('Erro ao carregar');
            }
            
        } catch (error) {
            console.error('❌ Erro ao carregar do servidor:', error);
            return { players: [], lastUpdate: new Date().toISOString() };
        }
    }

    async loadRankings() {
        try {
            const data = await this.loadFromServer();
            this.rankings = data.players || [];
            console.log(`🏆 ${this.rankings.length} jogadores carregados`);
            return this.rankings;
        } catch (error) {
            console.error('❌ Erro ao carregar ranking:', error);
            return [];
        }
    }

    async getGlobalStats() {
        try {
            const rankings = await this.loadRankings();
            
            const totalPlayers = rankings.length;
            const totalGames = rankings.reduce((sum, p) => sum + (p.totalGames || 0), 0);
            const totalScore = rankings.reduce((sum, p) => sum + (p.totalScore || 0), 0);
            const avgScore = totalPlayers > 0 ? Math.round(totalScore / totalPlayers) : 0;
            
            return { totalPlayers, totalGames, avgScore };
        } catch (error) {
            return { totalPlayers: 0, totalGames: 0, avgScore: 0 };
        }
    }

    showNotification(title, subtitle) {
        const notification = document.createElement('div');
        notification.className = 'online-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">🎯</div>
                <div class="notification-text">
                    <strong>${title}</strong><br>
                    <small>${subtitle}</small>
                    <small class="online-badge">☁️ Salvo online</small>
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

// Inicializar sistema
let jsonBinRanking;

document.addEventListener('DOMContentLoaded', async () => {
    jsonBinRanking = new JSONBinRanking();
    
    // Funções globais
    window.addGameScore = (hintsUsed) => {
        jsonBinRanking.addScore(hintsUsed);
    };

    window.addGameFailure = () => {
        jsonBinRanking.addFailure();
    };

    window.getCurrentPlayer = () => {
        return jsonBinRanking.getCurrentPlayer();
    };

    window.loadOnlineRankings = () => {
        return jsonBinRanking.loadRankings();
    };

    window.getGlobalStats = () => {
        return jsonBinRanking.getGlobalStats();
    };
});