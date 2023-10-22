const questions = [
    {
        question: 'What is the result of 19 + 44?',
        answers: ['53', '63', '73', '83'],
        correctAnswer: '63'
    },
    {
        question: 'What is the square root of 49??',
        answers: ['5', '6', '7', '8'],
        correctAnswer: '7'
    },
    {
        question: '60 Times of 8 Equals to?',
        answers: ['4.8', '48', '480', '4800'],
        correctAnswer: '480'
    },
    {
        question: 'What is the Next Prime Number after 7?',
        answers: ['9', '11', '13', '17'],
        correctAnswer: '11'
    },
    {
        question: 'What is 6% Equals to',
        answers: ['0.6', '0.06', '0.006', '0.006'],
        correctAnswer: '0.06'
    },
    {
        question: 'How Many Months Make a Century?',
        answers: ['12', '120', '1200', '12000'],
        correctAnswer: '1200'
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
