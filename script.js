// Quiz Data
const quizData = [
    {
        question: "Qual dessas ações economiza mais água no dia a dia?",
        options: [
            { text: "Tomar banhos de 5 minutos", correct: true },
            { text: "Escovar os dentes com a torneira fechada", correct: false },
            { text: "Lavar o carro com mangueira", correct: false },
            { text: "Lavar roupas com máquina cheia", correct: false }
        ],
        explanation: "Banhos mais curtos economizam grandes quantidades de água. Um banho de 15 minutos pode gastar até 135 litros, enquanto um de 5 minutos gasta cerca de 45 litros."
    },
    {
        question: "O que você pode fazer para reduzir sua pegada de carbono?",
        options: [
            { text: "Usar mais o carro", correct: false },
            { text: "Consumir alimentos locais e da época", correct: true },
            { text: "Manter todos os aparelhos em standby", correct: false },
            { text: "Comprar roupas novas toda semana", correct: false }
        ],
        explanation: "Alimentos locais e da estação não precisam ser transportados por longas distâncias, reduzindo as emissões de carbono do transporte."
    },
    {
        question: "Qual destes materiais pode ser reciclado infinitas vezes?",
        options: [
            { text: "Plástico", correct: false },
            { text: "Vidro", correct: true },
            { text: "Papel", correct: false },
            { text: "Alumínio", correct: false }
        ],
        explanation: "O vidro pode ser reciclado infinitamente sem perder qualidade, ao contrário de outros materiais que se degradam com o processo de reciclagem."
    },
    {
        question: "Qual é a principal causa do aquecimento global?",
        options: [
            { text: "Erupções vulcânicas", correct: false },
            { text: "Emissão de gases do efeito estufa", correct: true },
            { text: "Manchas solares", correct: false },
            { text: "Mudanças na órbita da Terra", correct: false }
        ],
        explanation: "A principal causa do atual aquecimento global é a emissão excessiva de gases de efeito estufa, especialmente CO₂, provenientes principalmente da queima de combustíveis fósseis."
    },
    {
        question: "Por que a COP 30 em Belém é importante?",
        options: [
            { text: "Porque será a primeira COP no Brasil", correct: false },
            { text: "Porque ocorrerá na Amazônia, bioma crucial para o clima", correct: true },
            { text: "Porque será a última COP sobre clima", correct: false },
            { text: "Porque terá participação recorde", correct: false }
        ],
        explanation: "A Amazônia desempenha papel crucial na regulação do clima global, por isso sediar a COP 30 na região destaca a importância de sua preservação nas discussões climáticas."
    }
];

// Quiz Functions
let currentQuestion = 0;
let score = 0;

function startQuiz() {
    document.getElementById('quiz-intro').classList.add('hidden');
    document.getElementById('quiz-questions').classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    
    questionElement.textContent = quizData[currentQuestion].question;
    optionsElement.innerHTML = '';
    
    quizData[currentQuestion].options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'w-full text-left py-3 px-4 rounded-lg bg-gray-100 hover:bg-green-100 quiz-option transition-all border border-gray-200';
        button.textContent = option.text;
        button.onclick = () => selectOption(index);
        optionsElement.appendChild(button);
    });
    
    document.getElementById('next-btn').classList.add('hidden');
}

function selectOption(index) {
    const options = document.querySelectorAll('#options button');
    const correct = quizData[currentQuestion].options[index].correct;
    
    // Disable all options
    options.forEach(option => {
        option.onclick = null;
        option.classList.remove('hover:bg-green-100');
    });
    
    // Mark selected option
    if (correct) {
        options[index].classList.add('bg-green-100', 'border-green-500');
        score++;
    } else {
        options[index].classList.add('bg-red-100', 'border-red-500');
        // Find and highlight correct answer
        const correctIndex = quizData[currentQuestion].options.findIndex(opt => opt.correct);
        options[correctIndex].classList.add('bg-green-100', 'border-green-500');
    }
    
    document.getElementById('next-btn').classList.remove('hidden');
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz-questions').classList.add('hidden');
    const resultElement = document.getElementById('quiz-result');
    const titleElement = document.getElementById('result-title');
    const descElement = document.getElementById('result-desc');
    const tipsElement = document.getElementById('result-tips');
    
    resultElement.classList.remove('hidden');
    
    const percentage = Math.round((score / quizData.length) * 100);
    titleElement.textContent = `Você acertou ${score} de ${quizData.length} perguntas (${percentage}%)`;
    
    if (percentage >= 80) {
        descElement.textContent = "Parabéns! Você tem um excelente conhecimento sobre sustentabilidade e está pronto para fazer a diferença!";
    } else if (percentage >= 50) {
        descElement.textContent = "Muito bom! Você já sabe bastante, mas ainda pode aprender mais para ter um impacto ainda maior.";
    } else {
        descElement.textContent = "Bom começo! Ainda há muito para aprender sobre sustentabilidade, mas cada pequeno passo faz diferença.";
    }
    
    // Add tips for improvement
    tipsElement.innerHTML = '<h4 class="font-semibold mt-6 mb-3">Dicas para melhorar:</h4><ul class="list-disc pl-5 space-y-2"></ul>';
    const tipsList = tipsElement.querySelector('ul');
    
    // Get explanations for questions that were answered incorrectly
    for (let i = 0; i < quizData.length; i++) {
        const li = document.createElement('li');
        li.textContent = quizData[i].explanation;
        tipsList.appendChild(li);
    }
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('quiz-result').classList.add('hidden');
    document.getElementById('quiz-intro').classList.remove('hidden');
}

// New functionality to show/hide sections
document.addEventListener('DOMContentLoaded', () => {
    const initialHeroSection = document.getElementById('initial-hero-section');
    const startNowButton = document.getElementById('start-now-button');
    const allOtherSections = document.getElementById('all-other-sections');

    // Initially hide all other sections
    allOtherSections.classList.add('hidden');

    // Add event listener to the "Comece agora" button
    startNowButton.addEventListener('click', () => {
        initialHeroSection.classList.add('hidden'); // Hide the initial hero section
        allOtherSections.classList.remove('hidden'); // Show all other sections
    });
});
