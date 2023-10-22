const questions = [
    {
        question: 'What country has the most inhabitants in the world?',
        answers: ['China', 'Russia', 'United States Of America', 'India'],
        correctAnswer: 'China'
    },
    {
        question: 'What is the name of the largest archipelago in the world?',
        answers: ['Thailand', 'Costa Rica', 'Indonesia', 'Chile'],
        correctAnswer: 'Indonesia'
    },
    {
        question: "Which African country is famous for being home to the Great Pyramid of Giza and the Sphinx?",
        answers: ['Mexico', 'Egypt', 'Sudan', 'Morocco'],
        correctAnswer: 'Egypt'
    },
    {
        question: 'Which country is known as the Land of Fire and Ice due to its volcanoes and glaciers?',
        answers: ['Bangladesh', 'India', 'Italy', 'Iceland'],
        correctAnswer: 'Iceland'
    },
    {
        question: 'What ocean is the largest and deepest?',
        answers: ['The Atlantic Ocean', 'The Pacific Ocean', 'The Indian Ocean', 'The Arctic Ocean'],
        correctAnswer: 'The Pacific Ocean'
    },
    {
        question: 'What is the largest desert in the world?',
        answers: ['Kalahari Desert', 'Sahara Desert', 'Namib Desert', 'Arabian Desert'],
        correctAnswer: 'Sahara Desert'
    }
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
