class RankingSystem {
    constructor() {
        this.currentPlayer = null;
        this.rankings = [];
        this.currentFilter = 'total';
        this.currentPage = 1;
        this.itemsPerPage = 10;
        
        // Simulação de API - Em produção, usar servidor real
        this.apiUrl = 'https://api.exemplo.com/ranking'; // Substituir por API real
        this.useLocalStorage = true; // Mudar para false quando tiver API real
        
        this.init();
    }

    init() {
        console.log('🏆 Iniciando sistema de ranking...');
        this.loadCurrentPlayer();
        this.setupEventListeners();
        this.loadRankings();
        this.updateStats();
        console.log('✅ Sistema de ranking inicializado!');
    }

    setupEventListeners() {
        // Salvar nome do jogador
        document.getElementById('savePlayerBtn').onclick = () => this.savePlayer();
        document.getElementById('changeNameBtn').onclick = () => this.changePlayerName();
        
        // Enter no input do nome
        document.getElementById('playerName').onkeypress = (e) => {
            if (e.key === 'Enter') this.savePlayer();
        };
        
        // Filtros do ranking
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.onclick = () => this.changeFilter(btn.dataset.filter);
        });
        
        // Atualizar ranking
        document.getElementById('refreshBtn').onclick = () => this.loadRankings();
        
        // Paginação
        document.getElementById('prevPage').onclick = () => this.changePage(-1);
        document.getElementById('nextPage').onclick = () => this.changePage(1);
    }

    loadCurrentPlayer() {
        const saved = localStorage.getItem('currentPlayer');
        if (saved) {
            this.currentPlayer = JSON.parse(saved);
            this.showPlayerInfo();
        } else {
            this.showLoginForm();
        }
    }

    savePlayer() {
        const nameInput = document.getElementById('playerName');
        const name = nameInput.value.trim();
        
        if (!name) {
            alert('⚠️ Por favor, digite um nome!');
            return;
        }
        
        if (name.length > 20) {
            alert('⚠️ Nome muito longo! Máximo 20 caracteres.');
            return;
        }
        
        this.currentPlayer = {
            id: this.generatePlayerId(),
            name: name,
            totalScore: 0,
            totalGames: 0,
            perfectHits: 0,
            currentStreak: 0,
            bestStreak: 0,
            joinDate: new Date().toISOString(),
            lastPlayed: null
        };
        
        localStorage.setItem('currentPlayer', JSON.stringify(this.currentPlayer));
        this.showPlayerInfo();
        this.loadRankings();
        
        console.log('👤 Jogador salvo:', this.currentPlayer.name);
    }

    changePlayerName() {
        this.showLoginForm();
        document.getElementById('playerName').value = this.currentPlayer.name;
    }

    showLoginForm() {
        document.getElementById('loginForm').style.display = 'flex';
        document.getElementById('playerInfo').style.display = 'none';
        document.getElementById('playerName').focus();
    }

    showPlayerInfo() {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('playerInfo').style.display = 'flex';
        
        document.getElementById('playerInitial').textContent = this.currentPlayer.name.charAt(0).toUpperCase();
        document.getElementById('currentPlayerName').textContent = this.currentPlayer.name;
        document.getElementById('playerPoints').textContent = this.currentPlayer.totalScore;
        document.getElementById('playerGames').textContent = this.currentPlayer.totalGames;
        
        this.updatePlayerRank();
    }

    generatePlayerId() {
        return 'player_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Função chamada quando o jogador acerta no jogo principal
    addScore(hintsUsed) {
        if (!this.currentPlayer) {
            console.warn('⚠️ Nenhum jogador logado para adicionar pontuação');
            return;
        }

        // Sistema de pontuação: 5, 4, 3, 2, 1 pontos
        const points = Math.max(6 - hintsUsed, 1);
        
        this.currentPlayer.totalScore += points;
        this.currentPlayer.totalGames++;
        this.currentPlayer.lastPlayed = new Date().toISOString();
        
        // Atualizar sequências
        this.currentPlayer.currentStreak++;
        if (this.currentPlayer.currentStreak > this.currentPlayer.bestStreak) {
            this.currentPlayer.bestStreak = this.currentPlayer.currentStreak;
        }
        
        // Acerto perfeito
        if (hintsUsed === 1) {
            this.currentPlayer.perfectHits++;
        }
        
        // Salvar localmente
        localStorage.setItem('currentPlayer', JSON.stringify(this.currentPlayer));
        
        // Enviar para ranking online
        this.submitScore();
        
        console.log(`🎯 Pontuação adicionada: ${points} pontos (${hintsUsed} dicas)`);
        
        // Atualizar interface
        this.showPlayerInfo();
        this.loadRankings();
    }

    // Função chamada quando o jogador erra ou desiste
    addFailure() {
        if (!this.currentPlayer) return;
        
        this.currentPlayer.totalGames++;
        this.currentPlayer.currentStreak = 0; // Zerar sequência
        this.currentPlayer.lastPlayed = new Date().toISOString();
        
        localStorage.setItem('currentPlayer', JSON.stringify(this.currentPlayer));
        this.submitScore();
        
        console.log('❌ Falha registrada - sequência zerada');
        
        this.showPlayerInfo();
        this.loadRankings();
    }

    async submitScore() {
        if (this.useLocalStorage) {
            // Simulação com localStorage
            this.saveToLocalRanking();
        } else {
            // Enviar para API real
            try {
                const response = await fetch(`${this.apiUrl}/submit`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.currentPlayer)
                });
                
                if (!response.ok) {
                    throw new Error('Erro ao enviar pontuação');
                }
                
                console.log('✅ Pontuação enviada para o servidor');
            } catch (error) {
                console.error('❌ Erro ao enviar pontuação:', error);
                // Fallback para localStorage
                this.saveToLocalRanking();
            }
        }
    }

    saveToLocalRanking() {
        let rankings = JSON.parse(localStorage.getItem('globalRankings') || '[]');
        
        // Atualizar ou adicionar jogador
        const existingIndex = rankings.findIndex(p => p.id === this.currentPlayer.id);
        if (existingIndex >= 0) {
            rankings[existingIndex] = { ...this.currentPlayer };
        } else {
            rankings.push({ ...this.currentPlayer });
        }
        
        // Ordenar por pontuação total
        rankings.sort((a, b) => {
            if (b.totalScore !== a.totalScore) {
                return b.totalScore - a.totalScore;
            }
            // Em caso de empate, ordenar por menor número de jogos
            return a.totalGames - b.totalGames;
        });
        
        localStorage.setItem('globalRankings', JSON.stringify(rankings));
        console.log('💾 Ranking salvo localmente');
    }

    async loadRankings() {
        document.getElementById('loadingRanking').style.display = 'block';
        
        try {
            if (this.useLocalStorage) {
                // Carregar do localStorage
                this.rankings = JSON.parse(localStorage.getItem('globalRankings') || '[]');
            } else {
                // Carregar da API
                const response = await fetch(`${this.apiUrl}/rankings?filter=${this.currentFilter}`);
                if (!response.ok) {
                    throw new Error('Erro ao carregar rankings');
                }
                this.rankings = await response.json();
            }
            
            this.displayRankings();
            this.updateStats();
            
        } catch (error) {
            console.error('❌ Erro ao carregar rankings:', error);
            document.getElementById('rankingList').innerHTML = `
                <div style="text-align: center; padding: 40px; color: #666;">
                    ❌ Erro ao carregar ranking<br>
                    <small>Tente novamente em alguns instantes</small>
                </div>
            `;
        } finally {
            document.getElementById('loadingRanking').style.display = 'none';
        }
    }

    displayRankings() {
        const rankingList = document.getElementById('rankingList');
        
        if (this.rankings.length === 0) {
            rankingList.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #666;">
                    🏆 Nenhum jogador no ranking ainda<br>
                    <small>Seja o primeiro a jogar!</small>
                </div>
            `;
            return;
        }
        
        // Paginação
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageRankings = this.rankings.slice(startIndex, endIndex);
        
        rankingList.innerHTML = pageRankings.map((player, index) => {
            const globalRank = startIndex + index + 1;
            const isCurrentPlayer = this.currentPlayer && player.id === this.currentPlayer.id;
            
            let rankDisplay = '';
            let itemClass = 'ranking-item';
            
            if (globalRank === 1) {
                rankDisplay = '<div class="rank-medal">🥇</div>';
                itemClass += ' top-1';
            } else if (globalRank === 2) {
                rankDisplay = '<div class="rank-medal">🥈</div>';
                itemClass += ' top-2';
            } else if (globalRank === 3) {
                rankDisplay = '<div class="rank-medal">🥉</div>';
                itemClass += ' top-3';
            } else {
                rankDisplay = `<div class="rank-position">#${globalRank}</div>`;
                itemClass += ' top-other';
            }
            
            if (isCurrentPlayer) {
                itemClass += ' current-player';
            }
            
            const winRate = player.totalGames > 0 
                ? Math.round((player.totalScore / (player.totalGames * 5)) * 100)
                : 0;
            
            return `
                <div class="${itemClass}">
                    ${rankDisplay}
                    <div class="player-avatar-small">
                        ${player.name.charAt(0).toUpperCase()}
                    </div>
                    <div class="player-info-rank">
                        <div class="player-name">
                            ${player.name}
                            ${isCurrentPlayer ? ' (Você)' : ''}
                        </div>
                        <div class="player-stats">
                            ${player.totalGames} partidas • ${winRate}% acerto
                            ${player.currentStreak > 0 ? ` • 🔥${player.currentStreak}` : ''}
                        </div>
                    </div>
                    <div class="player-score">
                        <div class="score-value">${player.totalScore}</div>
                        <div class="score-games">pontos</div>
                    </div>
                </div>
            `;
        }).join('');
        
        this.updatePagination();
    }

    updatePagination() {
        const totalPages = Math.ceil(this.rankings.length / this.itemsPerPage);
        
        document.getElementById('pageInfo').textContent = `Página ${this.currentPage} de ${totalPages}`;
        document.getElementById('prevPage').disabled = this.currentPage === 1;
        document.getElementById('nextPage').disabled = this.currentPage === totalPages || totalPages === 0;
    }

    changePage(direction) {
        const totalPages = Math.ceil(this.rankings.length / this.itemsPerPage);
        const newPage = this.currentPage + direction;
        
        if (newPage >= 1 && newPage <= totalPages) {
            this.currentPage = newPage;
            this.displayRankings();
        }
    }

    changeFilter(filter) {
        this.currentFilter = filter;
        this.currentPage = 1;
        
        // Atualizar botões
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        this.loadRankings();
    }

    updatePlayerRank() {
        if (!this.currentPlayer) return;
        
        const playerRank = this.rankings.findIndex(p => p.id === this.currentPlayer.id) + 1;
        document.getElementById('playerRank').textContent = playerRank > 0 ? `#${playerRank}` : '#-';
    }

    updateStats() {
        // Estatísticas globais
        document.getElementById('totalPlayers').textContent = this.rankings.length;
        
        const totalGames = this.rankings.reduce((sum, p) => sum + p.totalGames, 0);
        document.getElementById('totalGames').textContent = totalGames;
        
        const avgScore = this.rankings.length > 0 
            ? Math.round(this.rankings.reduce((sum, p) => sum + p.totalScore, 0) / this.rankings.length)
            : 0;
        document.getElementById('avgScore').textContent = avgScore;
        
        // Estatísticas do jogador atual
        if (this.currentPlayer) {
            document.getElementById('perfectHits').textContent = this.currentPlayer.perfectHits;
            document.getElementById('currentStreak').textContent = this.currentPlayer.currentStreak;
            document.getElementById('bestStreak').textContent = this.currentPlayer.bestStreak;
            
            const winRate = this.currentPlayer.totalGames > 0 
                ? Math.round((this.currentPlayer.totalScore / (this.currentPlayer.totalGames * 5)) * 100)
                : 0;
            document.getElementById('winRate').textContent = `${winRate}%`;
        }
    }
}

// Inicializar sistema de ranking
const rankingSystem = new RankingSystem();

// Função global para ser chamada pelo jogo principal
window.addGameScore = (hintsUsed) => {
    rankingSystem.addScore(hintsUsed);
};

window.addGameFailure = () => {
    rankingSystem.addFailure();
};