const questions = [
    {
        question: '121 Divided by 11 is',
        answers: ['11', '12', '13', '14'],
        correctAnswer: '11'
    },
    {
        question: 'Find the Missing Term in Multiples of 6 : 6, 12, 18, 24, _, 36, 42, _ 54, 60.',
        answers: ['28 , 44 ', '28 , 46', '30 , 48', '30 , 48'],
        correctAnswer: '30 , 48'
    },
    {
        question: 'The Product of 131 × 0 × 300 × 4',
        answers: ['131', '0', '300', '4'],
        correctAnswer: '0'
    },
    {
        question: 'Solve 3 + 6 × ( 5 + 4) ÷ 3 - 7',
        answers: ['12', '14', '15', '16'],
        correctAnswer: '14'
    },
    {
        question: 'What is the product of 121 x 0 x 20 x 2.5',
        answers: ['121', '0', '20', '2.5'],
        correctAnswer: '0'
    },
    {
        question: 'What is the year 1982 in Roman Numerals?',
        answers: ['MCLXXXII', 'MCMLXXII', 'MCMLXXXI', 'MCMLXXXII'],
        correctAnswer: 'MCMLXXXII'
    },
];


const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const nextButton = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');
const finishButton = document.getElementById('finish-btn');
const summarySection = document.getElementById('summary');
const userScoreElement = document.getElementById('user-score');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    showQuestion(questions[currentQuestionIndex]);
}

restartButton.addEventListener('click', restartQuiz);
finishButton.addEventListener('click', finishQuiz);

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion(questions[currentQuestionIndex]);
    scoreElement.innerText = `Score: ${score}`;
    const buttons = Array.from(answersElement.children);
    buttons.forEach(button => {
        button.addEventListener('click', selectAnswer);
        button.classList.remove('correct', 'wrong');
        button.disabled = false;
    });
    restartButton.classList.add('hide');
    finishButton.classList.remove('hide');
    summarySection.classList.add('hide');
    nextButton.classList.add('hide');
}

function finishQuiz() {
    summarySection.classList.remove('hide');
    finishButton.classList.add('hide');
    nextButton.classList.add('hide');
    const percentageScore = (score / questions.length) * 100;
    userScoreElement.innerText = `${score} out of ${questions.length} (${percentageScore.toFixed(0)}%)`;
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answersElement.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('answer-btn');
        button.addEventListener('click', selectAnswer);
        answersElement.appendChild(button);
    });
}

function selectAnswer(event) {
    const selectedButton = event.target;
    const correct = selectedButton.innerText === questions[currentQuestionIndex].correctAnswer;
    if (correct) {
        selectedButton.classList.add('correct');
        score++;
        scoreElement.innerText = `Score: ${score}`;
    } else {
        selectedButton.classList.add('wrong');
        const correctButton = Array.from(answersElement.children).find(button => button.innerText === questions[currentQuestionIndex].correctAnswer);
        correctButton.classList.add('correct');
    }
    const buttons = Array.from(answersElement.children);
    buttons.forEach(button => {
        button.removeEventListener('click', selectAnswer);
        button.disabled = true;
    });
    nextButton.classList.remove('hide');

    
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        nextButton.classList.add('hide');
    } else {
        finishButton.click();
    }
});

startQuiz();

