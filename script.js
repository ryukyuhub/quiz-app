let currentQuiz = 0;
let score = 0;
let selectedQuestions = [];
let currentQuestion = null;
const TOTAL_QUESTIONS = 10;

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const questionEl = document.getElementById('question');
const answerBtns = document.querySelectorAll('.answer-btn');
const scoreEl = document.getElementById('score');
const questionNumberEl = document.getElementById('question-number');
const finalScoreEl = document.getElementById('final-score');
const resultMessageEl = document.getElementById('result-message');
const feedbackEl = document.getElementById('feedback');

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function selectRandomQuestions() {
    const shuffled = shuffleArray(quizData);
    return shuffled.slice(0, TOTAL_QUESTIONS);
}

function startQuiz() {
    currentQuiz = 0;
    score = 0;
    selectedQuestions = selectRandomQuestions();
    
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    resultScreen.classList.add('hidden');
    
    loadQuiz();
}

function loadQuiz() {
    feedbackEl.classList.add('hidden');
    
    if (currentQuiz < TOTAL_QUESTIONS) {
        currentQuestion = selectedQuestions[currentQuiz];
        questionEl.textContent = currentQuestion.question;
        questionNumberEl.textContent = currentQuiz + 1;
        scoreEl.textContent = score;
        
        answerBtns.forEach((btn, index) => {
            btn.classList.remove('correct', 'wrong');
            btn.disabled = false;
            const answerText = btn.querySelector('.answer-text');
            answerText.textContent = currentQuestion.answers[index];
        });
    } else {
        showResult();
    }
}

function selectAnswer(answerIndex) {
    answerBtns.forEach(btn => btn.disabled = true);
    
    const selectedBtn = answerBtns[answerIndex];
    const correct = answerIndex === currentQuestion.correct;
    
    if (correct) {
        selectedBtn.classList.add('correct');
        score += 10;
        scoreEl.textContent = score;
        showFeedback(true);
    } else {
        selectedBtn.classList.add('wrong');
        answerBtns[currentQuestion.correct].classList.add('correct');
        showFeedback(false);
    }
    
    setTimeout(() => {
        currentQuiz++;
        loadQuiz();
    }, 2000);
}

function showFeedback(isCorrect) {
    feedbackEl.classList.remove('hidden');
    if (isCorrect) {
        feedbackEl.textContent = 'せいかい！すごいね！';
        feedbackEl.className = 'feedback correct';
    } else {
        feedbackEl.textContent = 'ざんねん！つぎはがんばろう！';
        feedbackEl.className = 'feedback wrong';
    }
}

function showResult() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    
    finalScoreEl.textContent = score;
    
    const percentage = (score / (TOTAL_QUESTIONS * 10)) * 100;
    
    if (percentage === 100) {
        resultMessageEl.textContent = 'かんぺき！てんさいだね！';
    } else if (percentage >= 80) {
        resultMessageEl.textContent = 'すばらしい！よくできました！';
    } else if (percentage >= 60) {
        resultMessageEl.textContent = 'がんばったね！';
    } else if (percentage >= 40) {
        resultMessageEl.textContent = 'もうすこし！';
    } else {
        resultMessageEl.textContent = 'つぎはもっとがんばろう！';
    }
}

startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', startQuiz);

answerBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => selectAnswer(index));
});