const questions = [
    {
        question: 'In what year did World War II begin?',
        answers: ['1918', '1939', '1945', '1924'],
        correctAnswer: '1939'
    },
    {
        question: 'What is the period of great cultural and intellectual revival in Europe in the 14th and 15th centuries called?',
        answers: ['The Industrial Revolution', 'The Renaissance', 'The French Revolution', 'Pearl Harbor'],
        correctAnswer: 'The Renaissance'
    },
    {
        question: 'What year did the North American Free Trade Agreement (NAFTA) go into effect?',
        answers: ['1992', '1993', '1994', '1995'],
        correctAnswer: '1994'
    },
    {
        question: 'Who was the first American to win a Nobel Peace Prize?',
        answers: ['Theodore Roosevelt', 'Melvin Calvin', 'John Bardeen', 'Frederick Sanger'],
        correctAnswer: 'Theodore Roosevelt'
    },
    {
        question: "In what year was the Concorde's first flight?",
        answers: ['1968', '1969', '1970', '1971'],
        correctAnswer: '1969'
    },
    {
        question: 'Which country did Germany invade to kickstart World War II?',
        answers: ['France', 'The Netherlands', 'Poland', 'Serbia'],
        correctAnswer: 'Poland'
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
    summarySection.classList.add('hide');
    finishButton.classList.remove('hide');
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
