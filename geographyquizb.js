const questions = [
    {
        question: 'What country is known as "Land of a Thousand Lakes"?',
        answers: ['Sweden', 'Finland', 'Iceland', 'Canada'],
        correctAnswer: 'Finland'
    },
    {
        question: 'What is the largest island in the Mediterranean Sea?',
        answers: ['Malta', 'Cyprus', 'Sardinia', 'Sicily'],
        correctAnswer: 'Sicily'
    },
    {
        question: "Which river forms part of the border between the United States and Mexico?",
        answers: ['Rio Grande', 'Nile', 'Yellow River', 'Yangtze'],
        correctAnswer: 'Rio Grande'
    },
    {
        question: 'Which European country is known for its fjords and is the homeland of the Vikings?',
        answers: ['Denmark', 'Sweden', 'Norway', 'Finland'],
        correctAnswer: 'Norway'
    },
    {
        question: 'In which country would you find the Great Barrier Reef?',
        answers: ['United Stated Of America', 'Brazil', 'Spain', 'Australia'],
        correctAnswer: 'Australia'
    },
    {
        question: 'Which river is often called the "Father of Waters" and is the longest river in North America?',
        answers: ['Nile', 'Amazon', 'Mississippi River', 'Amur River'],
        correctAnswer: 'Mississippi River'
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
