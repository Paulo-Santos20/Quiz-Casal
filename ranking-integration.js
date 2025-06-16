// Sistema de Ranking Integrado para a Página Principal
class RankingIntegration {
    constructor() {
        this.currentPlayer = null;
        this.loadCurrentPlayer();
        console.log('🏆 Sistema de ranking integrado carregado');
    }

    loadCurrentPlayer() {
        const saved = localStorage.getItem('currentPlayer');
        if (saved) {
            this.currentPlayer = JSON.parse(saved);
            console.log('👤 Jogador carregado:', this.currentPlayer.name);
        } else {
            // Criar jogador padrão se não existir
            this.createDefaultPlayer();
        }
    }

    createDefaultPlayer() {
        const playerName = prompt('🎯 Digite seu nome para o ranking:') || 'Jogador Anônimo';
        
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
        console.log('👤 Novo jogador criado:', this.currentPlayer.name);
    }

    generatePlayerId() {
        return 'player_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Função chamada quando o jogador acerta
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
        
        console.log(`🎯 Pontuação adicionada: ${points} pontos (${hintsUsed} dicas) - Total: ${this.currentPlayer.totalScore}`);
        
        // Mostrar notificação de pontos
        this.showPointsNotification(points, hintsUsed);
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
    }

    submitScore() {
        // Salvar no ranking local
        this.saveToLocalRanking();
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
        console.log('💾 Ranking atualizado - Posição atual:', rankings.findIndex(p => p.id === this.currentPlayer.id) + 1);
    }

    showPointsNotification(points, hintsUsed) {
        // Criar notificação de pontos
        const notification = document.createElement('div');
        notification.className = 'points-notification';
        notification.innerHTML = `
            <div class="points-content">
                <div class="points-icon">🎯</div>
                <div class="points-text">
                    <strong>+${points} pontos!</strong><br>
                    <small>Acertou com ${hintsUsed} dica${hintsUsed > 1 ? 's' : ''}</small>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remover após 3 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }
}

// Inicializar sistema de ranking
const rankingIntegration = new RankingIntegration();

// Funções globais para serem chamadas pelo jogo principal
window.addGameScore = (hintsUsed) => {
    rankingIntegration.addScore(hintsUsed);
};

window.addGameFailure = () => {
    rankingIntegration.addFailure();
};

// Função para obter dados do jogador atual
window.getCurrentPlayer = () => {
    return rankingIntegration.getCurrentPlayer();
};