class DailyChallenge {
    constructor() {
        this.challenges = [
            {
                // PIZZA - Imagem de pizza deliciosa
                image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop",
                hints: [
                    "É redondo, tem queijo e todo mundo ama. Nasceu na Itália mas conquistou o mundo!",
                    "Tem massa fina ou grossa, molho de tomate e pode ter vários ingredientes por cima.",
                    "É assada no forno, cortada em fatias e muito popular nas sextas-feiras.",
                    "Rima com 'preguiça' e tem origem napolitana. Margherita é um tipo famoso.",
                    "🍕 Começa com 'P' e termina com 'A'. É o prato italiano mais famoso do mundo!"
                ],
                answer: ["pizza", "piza"]
            },
            {
                // CAFÉ - Xícara de café fumegante
                image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
                hints: [
                    "Preto, quente e desperta. É o combustível de muita gente pela manhã!",
                    "Vem do grão torrado e moído. Pode ser expresso, cappuccino ou americano.",
                    "Tem cafeína e pode ser bebido com leite, açúcar ou puro.",
                    "O Brasil é um dos maiores produtores mundiais. Starbucks é uma marca famosa.",
                    "☕ Rima com 'sofá' e deixa muita gente acordada à noite!"
                ],
                answer: ["café", "cafe"]
            },
            {
                // LIVRO - Livros empilhados
                image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",
                hints: [
                    "Tem páginas, conta histórias e pode te levar para outros mundos sem sair do lugar.",
                    "Pode ser de ficção, romance, terror ou educativo. Alguns viram filmes famosos.",
                    "Tem capa, contracapa e pode ser físico ou digital (e-book).",
                    "Biblioteca é onde você encontra milhares deles. Harry Potter é uma série famosa.",
                    "📚 Rima com 'futuro' e você está lendo suas instruções agora mesmo!"
                ],
                answer: ["livro", "libro"]
            },
            {
                // CACHORRO - Cachorro fofo
                image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&h=600&fit=crop",
                hints: [
                    "Tem quatro patas, late e é o melhor amigo do homem.",
                    "Pode ser pequeno como um Chihuahua ou grande como um Pastor Alemão. Adora brincar de buscar.",
                    "Balança o rabo quando está feliz e pode aprender truques como 'senta' e 'fica'.",
                    "Precisa passear na coleira, come ração e alguns são usados como cães-guia.",
                    "🐕 Rima com 'socorro' e é o oposto de gato na rivalidade clássica!"
                ],
                answer: ["cachorro", "cão", "cao", "dog"]
            },
            {
                // CÉU - Céu azul com nuvens
                image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop",
                hints: [
                    "Azul, infinito e onde as nuvens passeiam. Olhamos para cima para vê-lo.",
                    "Muda de cor durante o dia: azul de manhã, laranja no pôr do sol, escuro à noite.",
                    "Os pássaros voam por ele e os aviões atravessam suas nuvens.",
                    "Tem estrelas à noite e o sol durante o dia. Pode estar limpo ou nublado.",
                    "☁️ Rima com 'véu' e é onde fica o arco-íris depois da chuva!"
                ],
                answer: ["céu", "ceu", "sky"]
            },
            {
                // SOL - Sol brilhante
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
                hints: [
                    "Amarelo, brilhante e nos dá energia. Sem ele, não haveria vida na Terra.",
                    "Nasce no leste e se põe no oeste. É uma estrela gigante no centro do nosso sistema.",
                    "Produz luz e calor, causa bronzeado e faz as plantas crescerem.",
                    "Tem manchas solares e pode causar tempestades magnéticas. É muito maior que a Terra.",
                    "☀️ Rima com 'gol' e você não deve olhar diretamente para ele!"
                ],
                answer: ["sol", "sun"]
            },
            {
                // ÁGUA - Água cristalina
                image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
                hints: [
                    "Cristalina, essencial e mata a sede. Cobre a maior parte do nosso planeta.",
                    "Pode estar nos três estados: líquida, sólida (gelo) ou gasosa (vapor).",
                    "Precisamos beber pelo menos 2 litros por dia. Forma oceanos, rios e lagos.",
                    "Ferve a 100°C e congela a 0°C. É formada por hidrogênio e oxigênio (H2O).",
                    "💧 Rima com 'mágoa' e é essencial para todos os seres vivos!"
                ],
                answer: ["água", "agua", "water"]
            },
            {
                // GATO - Gato fofo (desafio extra)
                image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=600&fit=crop",
                hints: [
                    "Tem quatro patas, mia e é independente. Dorme muito durante o dia.",
                    "Tem bigodes, unhas afiadas e adora brincar com novelos de lã.",
                    "Ronrona quando está feliz e pode ter pelos longos ou curtos.",
                    "Caça ratos, tem visão noturna excelente e sempre cai em pé.",
                    "🐱 Rima com 'pato' e é famoso por ter 7 vidas!"
                ],
                answer: ["gato", "cat"]
            },
            {
                // FLOR - Flores coloridas (desafio extra)
                image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=600&fit=crop",
                hints: [
                    "Colorida, perfumada e cresce no jardim. As abelhas adoram visitá-la!",
                    "Tem pétalas delicadas e pode ser vermelha, amarela, rosa ou branca.",
                    "É dada de presente no Dia das Mães e simboliza amor e carinho.",
                    "Precisa de água, sol e terra para crescer. Rosa é um tipo famoso.",
                    "🌸 Rima com 'cor' e deixa qualquer ambiente mais bonito!"
                ],
                answer: ["flor", "flower"]
            },
            {
                // CARRO - Carro moderno (desafio extra)
                image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop",
                hints: [
                    "Tem quatro rodas e nos leva de um lugar para outro rapidamente.",
                    "Precisa de combustível para funcionar e tem volante para dirigir.",
                    "Pode ser sedan, SUV, hatchback ou conversível. Tem faróis e retrovisores.",
                    "Precisa de carteira de motorista para dirigir e tem cinto de segurança.",
                    "🚗 Rima com 'barro' e é o meio de transporte mais comum nas cidades!"
                ],
                answer: ["carro", "car", "automóvel", "automovel"]
            }
        ];

        this.currentChallenge = null;
        this.currentHintIndex = 0;
        this.attempts = 0;
        this.gameFinished = false;
        this.maxHints = 5;
        this.stats = this.loadStats();

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        console.log('🎯 Iniciando jogo...');
        this.updateDate();
        this.loadTodaysChallenge();
        this.updateStats();
        this.setupEventListeners();
        this.startCountdown();
        console.log('✅ Jogo inicializado!');
    }

    updateDate() {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        document.getElementById('dateDisplay').textContent = now.toLocaleDateString('pt-BR', options);
    }

    getDayOfYear() {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now - start;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    }

    loadTodaysChallenge() {
        const dayOfYear = this.getDayOfYear();
        const challengeIndex = dayOfYear % this.challenges.length;
        this.currentChallenge = this.challenges[challengeIndex];

        document.getElementById('challengeNumber').textContent = `Desafio #${dayOfYear}`;
        document.getElementById('challengeImage').src = this.currentChallenge.image;

        this.showFirstHint();
        this.updateImageReveal();

        const todayKey = `challenge_${dayOfYear}`;
        const todayResult = localStorage.getItem(todayKey);

        if (todayResult) {
            this.showPreviousResult(JSON.parse(todayResult));
        }
    }

    showFirstHint() {
        const hintsContainer = document.getElementById('hintsContainer');
        hintsContainer.innerHTML = '';

        const hintElement = document.createElement('div');
        hintElement.className = 'hint';
        hintElement.textContent = this.currentChallenge.hints[0];
        hintsContainer.appendChild(hintElement);

        this.currentHintIndex = 0;
        this.updateProgress();
    }

    addNewHint() {
        if (this.currentHintIndex < this.maxHints - 1) {
            this.currentHintIndex++;

            const hintsContainer = document.getElementById('hintsContainer');
            const hintElement = document.createElement('div');
            hintElement.className = 'hint';
            hintElement.textContent = this.currentChallenge.hints[this.currentHintIndex];
            hintsContainer.appendChild(hintElement);

            this.updateProgress();
            this.updateImageReveal();
        }
    }


    updateImageReveal() {
        const imageOverlay = document.getElementById('imageOverlay');
        const revealPercentage = document.getElementById('revealPercentage');
        const imageContainer = document.querySelector('.image-container');

        const hintsShown = this.currentHintIndex + 1;
        const percentage = Math.min(hintsShown * 25, 100);

        // Atualizar classe do overlay
        imageOverlay.className = `image-reveal-overlay hints-${hintsShown}`;

        // Atualizar classe do container da imagem para blur
        imageContainer.className = `image-container blurred-${hintsShown}`;

        // Atualizar texto da porcentagem
        revealPercentage.textContent = `${percentage}%`;

        console.log(`🖼️ Imagem ${percentage}% revelada (${hintsShown} dicas)`);
    }

    revealFullImage() {
        const imageOverlay = document.getElementById('imageOverlay');
        const revealPercentage = document.getElementById('revealPercentage');
        const imageContainer = document.querySelector('.image-container');

        imageOverlay.className = 'image-reveal-overlay revealed';
        imageContainer.className = 'image-container revealed';
        revealPercentage.textContent = '100%';

        console.log('🖼️ Imagem 100% revelada!');
    }

    updateProgress() {
        document.getElementById('currentHint').textContent = this.currentHintIndex + 1;
        document.getElementById('attempts').textContent = this.attempts;

        const progressPercentage = ((this.currentHintIndex + 1) / this.maxHints) * 100;
        document.getElementById('progressFill').style.width = `${progressPercentage}%`;
    }

    setupEventListeners() {
        console.log('🔧 Configurando botões...');

        const submitBtn = document.getElementById('submitBtn');
        const answerInput = document.getElementById('answerInput');
        const giveUpBtn = document.getElementById('giveUpBtn');

        if (submitBtn) {
            submitBtn.onclick = () => {
                console.log('🔥 Botão clicado!');
                this.checkAnswer();
            };
        }

        if (answerInput) {
            answerInput.onkeypress = (e) => {
                if (e.key === 'Enter') {
                    console.log('⚡ Enter pressionado!');
                    this.checkAnswer();
                }
            };
            answerInput.disabled = false;
            answerInput.readOnly = false;
        }

        if (giveUpBtn) {
            giveUpBtn.onclick = () => {
                console.log('🏳️ Desistir clicado!');
                this.giveUp();
            };
        }
    }

    checkAnswer() {
        console.log('🎯 Verificando resposta...');

        if (this.gameFinished) {
            console.log('❌ Jogo já finalizado');
            return;
        }

        const answerInput = document.getElementById('answerInput');
        const resultDiv = document.getElementById('result');

        const userAnswer = answerInput.value.trim().toLowerCase();
        console.log('📝 Resposta:', userAnswer);

        if (!userAnswer) {
            resultDiv.innerHTML = '⚠️ <strong>Por favor, digite uma resposta!</strong>';
            resultDiv.className = 'result incorrect';
            return;
        }

        this.attempts++;
        this.updateProgress();

        const isCorrect = this.currentChallenge.answer.some(answer =>
            answer.toLowerCase() === userAnswer
        );

        console.log(isCorrect ? '🎉 CORRETO!' : '❌ Incorreto');

        const dayOfYear = this.getDayOfYear();
        const todayKey = `challenge_${dayOfYear}`;

        if (isCorrect) {
            this.revealFullImage();

            resultDiv.innerHTML = `
                🎉 <strong>Parabéns!</strong> Você acertou!<br>
                Resposta: <strong>${this.currentChallenge.answer[0].toUpperCase()}</strong><br>
                Tentativas: <strong>${this.attempts}</strong> | Dicas usadas: <strong>${this.currentHintIndex + 1}</strong>
            `;
            resultDiv.className = 'result correct';
            this.updateStats(true);

            localStorage.setItem(todayKey, JSON.stringify({
                correct: true,
                answer: userAnswer,
                attempts: this.attempts,
                hintsUsed: this.currentHintIndex + 1
            }));

            this.finishGame();
        } else {
            if (this.currentHintIndex < this.maxHints - 1) {
                this.addNewHint();
                resultDiv.innerHTML = `
                    ❌ <strong>Resposta incorreta!</strong><br>
                    💡 Nova dica liberada e mais 25% da imagem revelada!
                `;
                resultDiv.className = 'result incorrect';
            } else {
                resultDiv.innerHTML = `
                    ❌ <strong>Resposta incorreta!</strong><br>
                    😔 Você usou todas as 5 dicas e viu 100% da imagem.<br>
                    <strong>Deseja desistir e ver a resposta?</strong>
                `;
                resultDiv.className = 'result final-attempt';
            }

            answerInput.value = '';
            answerInput.focus();
        }
    }

    giveUp() {
        if (this.gameFinished) return;

        this.revealFullImage();

        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
            🏳️ <strong>Você desistiu!</strong><br>
            A resposta era: <strong>${this.currentChallenge.answer[0].toUpperCase()}</strong><br>
            Tentativas: <strong>${this.attempts}</strong> | Dicas usadas: <strong>${this.currentHintIndex + 1}</strong><br>
            Não desanime, tente novamente amanhã! 💪
        `;
        resultDiv.className = 'result revealed';

        while (this.currentHintIndex < this.maxHints - 1) {
            this.addNewHint();
        }

        const dayOfYear = this.getDayOfYear();
        const todayKey = `challenge_${dayOfYear}`;

        this.updateStats(false);
        localStorage.setItem(todayKey, JSON.stringify({
            correct: false,
            gaveUp: true,
            attempts: this.attempts || 1,
            hintsUsed: this.maxHints
        }));

        this.finishGame();
    }

    finishGame() {
        this.gameFinished = true;
        document.getElementById('answerInput').disabled = true;
        document.getElementById('submitBtn').disabled = true;
        document.getElementById('giveUpBtn').disabled = true;
    }

    showPreviousResult(result) {
        const resultDiv = document.getElementById('result');
        const hintsContainer = document.getElementById('hintsContainer');
        hintsContainer.innerHTML = '';

        const hintsToShow = Math.min(result.hintsUsed || 1, this.currentChallenge.hints.length);
        for (let i = 0; i < hintsToShow; i++) {
            const hintElement = document.createElement('div');
            hintElement.className = 'hint';
            hintElement.textContent = this.currentChallenge.hints[i];
            hintsContainer.appendChild(hintElement);
        }

        this.currentHintIndex = (result.hintsUsed || 1) - 1;
        this.attempts = result.attempts || 0;
        this.updateProgress();

        if (result.correct || result.gaveUp) {
            this.revealFullImage();
        } else {
            this.updateImageReveal();
        }

        if (result.correct) {
            resultDiv.innerHTML = `
                ✅ <strong>Você já acertou hoje!</strong><br>
                Sua resposta: <strong>${result.answer.toUpperCase()}</strong><br>
                Tentativas: <strong>${result.attempts}</strong> | Dicas usadas: <strong>${result.hintsUsed}</strong>
            `;
            resultDiv.className = 'result correct';
        } else if (result.gaveUp) {
            resultDiv.innerHTML = `
                📝 <strong>Você desistiu hoje!</strong><br>
                A resposta era: <strong>${this.currentChallenge.answer[0].toUpperCase()}</strong><br>
                Tentativas: <strong>${result.attempts}</strong> | Dicas usadas: <strong>${result.hintsUsed}</strong><br>
                Tente novamente amanhã! 💪
            `;
            resultDiv.className = 'result revealed';
        }

        this.finishGame();
    }

    loadStats() {
        const saved = localStorage.getItem('gameStats');
        return saved ? JSON.parse(saved) : {
            totalPlayed: 0,
            totalCorrect: 0
        };
    }

    updateStats(isCorrect = null) {
        if (isCorrect !== null) {
            this.stats.totalPlayed++;
            if (isCorrect) {
                this.stats.totalCorrect++;
            }
            localStorage.setItem('gameStats', JSON.stringify(this.stats));
        }

        document.getElementById('totalPlayed').textContent = this.stats.totalPlayed;
        document.getElementById('totalCorrect').textContent = this.stats.totalCorrect;

        const winRate = this.stats.totalPlayed > 0
            ? Math.round((this.stats.totalCorrect / this.stats.totalPlayed) * 100)
            : 0;
        document.getElementById('winRate').textContent = `${winRate}%`;
    }

    startCountdown() {
        const updateCountdown = () => {
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);

            const diff = tomorrow - now;
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            document.getElementById('countdown').textContent =
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        };

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
}

// Inicializar
new DailyChallenge();