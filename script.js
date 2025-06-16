class DailyChallenge {
    constructor() {
        this.challenges = [
            {
                // CARNAVAL - Foto no carnaval com tiara da Marta
                image: "./img/carnaval.jpg",
                hints: [
                    "Nesta foto especial, há uma tiara envolvida.",
                    "Acontece no Brasil antes da quaresma, com música, dança e muita alegria nas ruas.",
                    "Uma festa colorida e animada onde todo mundo se fantasia e se diverte muito!",
                    "É a época do ano onde casais se fantasiam juntos e aproveitam os blocos de rua.",
                    "🎭 A festa mais famosa do Brasil!"
                ],
                answer: ["carnaval", "foto no carnaval"]
            },
            {
                // ANO NOVO 2025 - Foto com Kenai e árvore de natal, barba descolorida
                image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&h=600&fit=crop",
                hints: [
                    "Uma foto muito especial com Kenai participando da celebração.",
                    "A virada mais recente que este trio viveu juntos, com decoração natalina ao fundo.",
                    "Paulo estava com um visual bem diferente - barba com uma cor bem inusitada, cor de ovo!",
                    "🎆 A primeira celebração de 2025!",
                    "A festa após a data favorita de Rafhaela."
                ],
                answer: ["ano novo 2025", "foto no ano novo de 2025", "foto ano novo 2025", "ano novo"]
            },
            {
                // JANTAR - Saída com amigos em dezembro 2024
                image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
                hints: [
                    "Um momento social muito gostoso que aconteceu no último mês de 2024.",
                    "🍽️ Uma noite de confraternização e boa comida com os amigos queridos!",
                    "O casal saiu para se divertir e comer algo delicioso com a turma da namorada.",
                    "Foi uma ocasião especial para conhecer melhor o círculo de amizade de Rafhaela.",
                    "Comer a noite na cidade vizinha."
                ],
                answer: ["jantar", "saida para comer", "saida com amigos"]
            },
            {
                // CINEMA - Vitória Park Shopping, 13 abril 2024
                image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
                hints: [
                    "Um passeio em um centro comercial muito conhecido de Vitória.",
                    "A foto foi tirada perto de plantas, na saída de um local de entretenimento e compras.",
                    "Foi em abril de 2024, mais precisamente no dia 13.",
                    "É um dos shoppings mais famosos da região metropolitana.",
                    "Lugar onde mais costumamos ir e ver um filme!"
                ],
                answer: ["cinema", "vitoria park shopping", "shopping de vitoria"]
            },
            {
                // 1 DE JANEIRO - Família toda, ano novo 2024
                image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop",
                hints: [
                    "Uma foto em família muito especial, com todos os parentes reunidos.",
                    "Dia após a ultima festa do ano.",
                    "O primeiro dia de um ano que trouxe muitas alegrias para este casal.",
                    "1º de janeiro de 2024 - um marco de união e acolhimento familiar.",
                    "👨‍👩‍👧‍👦 O primeiro dia de 2024 registrado com toda a família dela!"
                ],
                answer: ["1 de janeiro", "primeiro dia", "familia", "ano novo 2024", "ano novo"]
            },
            {
                // NATAL 2023 - Trio com árvore, 24 dezembro
                image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&h=600&fit=crop",
                hints: [
                    "A véspera da festa mais especial do ano, celebrada em família.",
                    "Kenai também participou desta celebração natalina muito especial de 2023.",
                    "Uma árvore decorada ao fundo emoldurou este momento mágico do trio.",
                    "24 de dezembro de 2023 - uma data que ficou marcada na memória.",
                    "🎄 A véspera do Natal de 2023 registrada com muito amor e carinho!"
                ],
                answer: ["natal"]
            },
            {
                // BABY/MOMO - Rafhaela dormindo como princesa
                image: "./img/dormindo.jpeg",
                hints: [
                    "Um momento de pura delicadeza e ternura, capturado em uma foto especial.",
                    "Ela estava em seu estado mais angelical, parecendo uma verdadeira princesa.",
                    "Rafhaela em um momento de descanso, irradiando paz e beleza natural.",
                    "Uma foto que mostra o lado mais doce e sereno da namorada.",
                    "👑 A princesa Rafhaela fazendo oque mais ama!"
                ],
                answer: ["dormindo"]
            },
            {
                // NOIVADO - Comemoração 5 agosto 2023
                image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
                hints: [
                    "O dia mais especial na vida deste casal apaixonado, uma celebração única.",
                    "5 de agosto de 2023 - uma data que mudou para sempre a vida dos dois.",
                    "A comemoração de um compromisso sério e cheio de amor entre eles.",
                    "Um momento de muita emoção, alegria e promessas para o futuro.",
                    "💍 O dia em que eles oficializaram seu amor e compromisso eterno!"
                ],
                answer: ["noivado"]
            },
            {
                // NATAL 2022 - Casal com Kenai, presentes e árvore
                image: "https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?w=800&h=600&fit=crop",
                hints: [
                    "O primeiro Natal que eles passaram juntos como um casal apaixonado.",
                    "Kenai também estava presente nesta celebração especial de 2022.",
                    "Presentes embaixo da árvore decorada completavam o cenário mágico.",
                    "24 de dezembro de 2022 - uma véspera de Natal inesquecível para o trio.",
                    "🎁 O primeiro Natal deste casal, celebrado com muito amor e presentes!"
                ],
                answer: ["natal", "natal 2022", "casal"]
            },
            {
                // PALHAÇA - Maquiagem da Valentina, 22 outubro 2022
                image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
                hints: [
                    "Um momento muito divertido e descontraído, cheio de cores e risadas.",
                    "22 de outubro de 2022 - um dia de muita diversão e criatividade infantil.",
                    "Valentina, a sobrinha artista, foi a responsável por esta transformação especial.",
                    "Rafhaela se deixou ser 'maquiada' e o resultado foi hilário e adorável.",
                    "🤡 Uma transformação divertida feita pelas mãozinhas carinhosas da sobrinha!"
                ],
                answer: ["palhaça", "maquiada"]
            },
            {
                // BUQUÊ - Girassóis aniversário namoro, 17 setembro 2022
                image: "https://images.unsplash.com/photo-1469259943454-aa100abba749?w=800&h=600&fit=crop",
                hints: [
                    "Um presente muito especial para celebrar uma data importante do relacionamento.",
                    "Girassóis - as flores preferidas dela, escolhidas com muito carinho.",
                    "17 de setembro de 2022 - aniversário de namoro celebrado com flores.",
                    "Ela está segurando um buquê lindo, com um sorriso radiante no rosto.",
                    "🌻 As flores amarelas favoritas dela, recebidas em uma data muito especial!"
                ],
                answer: ["buque", "flores"]
            },
            {
                // FORMATURA - Farmácia, vestido vermelho, 8 julho 2022
                image: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=800&h=600&fit=crop",
                hints: [
                    "Um dia de muito orgulho e conquista acadêmica para ela.",
                    "Rafhaela estava deslumbrante em um vestido vermelho muito elegante.",
                    "Ele estava de social, todo arrumado para acompanhar este momento especial.",
                    "8 de julho de 2022 - o dia da formatura em Farmácia dela.",
                    "🎓 A conquista do diploma em Farmácia, celebrada com muito amor e elegância!"
                ],
                answer: ["formatura"]
            },
            {
                // Jantar romântico
                image: "./img/jantar.jpeg",
                hints: [
                    "Um dos poucos momentos românticos do casal.",
                    "Nesse momento ambos estavam comendo e dando as mãos.",
                    "Momento aconteceu no local que Kenai mais odeia na casa.",
                    "Momento organizado pelo casal, Paulo estava com camisa social e bermuda kkk.",
                    "🕯️ Momento à luz de velas!"
                ],
                answer: ["jantar", "jantar romântico", "jantar romantico"]
            },
            {
                // Primeiro encontro
                image: "./img/primeiro encontro.jpeg",
                hints: [
                    "Saída onde estavam Rafhaela, Marta e Paulo.",
                    "Momento em que Paulo e Marta dançaram e Rafhaela ficou morrendo de vergonha.",
                    "Uma saída de gelar a guela.",
                    "Primeira foto envolvendo Paulo e Marta.",
                    "🍻 O primeiro de muitos!"
                ],
                answer: ["primeiro encontro"]
            },
            {
                // AMIGOS - Saída Recife, 3 julho 2022
                image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop",
                hints: [
                    "Um dia especial de confraternização com a turma de amigos dele.",
                    "Foi também o dia em que ela viajou para uma capital nordestina.",
                    "3 de julho de 2022 - uma data com programações diferentes para o casal.",
                    "Vários amigos estavam presentes nesta reunião social divertida.",
                    "✈️ O dia da viagem dela para Recife e da confraternização com os amigos!"
                ],
                answer: ["amigos", "saida"]
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
        
        // Carregar imagem com tratamento de erro
        const challengeImage = document.getElementById('challengeImage');
        const imageContainer = document.querySelector('.image-container');
        
        challengeImage.src = this.currentChallenge.image;
        
        // Detectar orientação da imagem quando carregar
        challengeImage.onload = () => {
            const aspectRatio = challengeImage.naturalWidth / challengeImage.naturalHeight;
            
            // Remover classes anteriores
            imageContainer.classList.remove('landscape', 'portrait', 'square', 'wide', 'tall');
            
            // Adicionar classe baseada na orientação
            if (aspectRatio > 1.5) {
                imageContainer.classList.add('wide');
            } else if (aspectRatio > 1.2) {
                imageContainer.classList.add('landscape');
            } else if (aspectRatio > 0.8) {
                imageContainer.classList.add('square');
            } else if (aspectRatio > 0.6) {
                imageContainer.classList.add('portrait');
            } else {
                imageContainer.classList.add('tall');
            }
            
            console.log(`📐 Imagem carregada - Proporção: ${aspectRatio.toFixed(2)}`);
        };
        
        // Tratamento de erro para imagens não encontradas
        challengeImage.onerror = () => {
            console.warn(`⚠️ Imagem não encontrada: ${this.currentChallenge.image}`);
            challengeImage.src = './img/placeholder.jpg';
            challengeImage.alt = 'Imagem não disponível';
            imageContainer.classList.add('square');
        };

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

        // Remover classes anteriores
        imageContainer.classList.remove('blurred-1', 'blurred-2', 'blurred-3', 'blurred-4', 'blurred-5', 'revealed', 'no-blur');
        
        // Atualizar classe do overlay
        imageOverlay.className = `image-reveal-overlay hints-${hintsShown}`;
        
        // Atualizar classe do container da imagem para blur
        imageContainer.classList.add(`blurred-${hintsShown}`);
        
        // Atualizar texto da porcentagem
        revealPercentage.textContent = `${percentage}%`;

        console.log(`🖼️ Imagem ${percentage}% revelada (${hintsShown} dicas)`);
    }

    revealFullImage() {
        const imageOverlay = document.getElementById('imageOverlay');
        const revealPercentage = document.getElementById('revealPercentage');
        const imageContainer = document.querySelector('.image-container');

        // Remover todas as classes de blur
        imageContainer.classList.remove('blurred-1', 'blurred-2', 'blurred-3', 'blurred-4', 'blurred-5');
        
        // Adicionar classes de revelação completa
        imageOverlay.className = 'image-reveal-overlay revealed';
        imageContainer.classList.add('revealed', 'no-blur');
        
        // Atualizar texto da porcentagem
        revealPercentage.textContent = '100%';

        console.log('🖼️ Imagem 100% revelada - Blur removido!');
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

            // Mostrar a resposta que o usuário digitou
            resultDiv.innerHTML = `
                🎉 <strong>Parabéns!</strong> Você acertou!<br>
                Resposta: <strong>${userAnswer.toUpperCase()}</strong><br>
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
            
            // Enviar pontuação para o ranking
            if (typeof window.addGameScore === 'function') {
                window.addGameScore(this.currentHintIndex + 1);
            }
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
            hintsUsed: this.maxHints,
            correctAnswer: this.currentChallenge.answer[0]
        }));

        this.finishGame();
        
        // Registrar falha no ranking
        if (typeof window.addGameFailure === 'function') {
            window.addGameFailure();
        }
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
            const correctAnswer = result.correctAnswer || this.currentChallenge.answer[0];
            resultDiv.innerHTML = `
                📝 <strong>Você desistiu hoje!</strong><br>
                A resposta era: <strong>${correctAnswer.toUpperCase()}</strong><br>
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