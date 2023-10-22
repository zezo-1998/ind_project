const questionsb = [
    {
        question: 'What is the oldest capital in the world?',
        answers: ['Damascus', 'Jerusalem', 'Athens', 'Rome'],
        correctAnswer: 'Damascus'
    },
    {
        question: 'In which year was John F. Kennedy assassinated?',
        answers: ['1957', '1959', '1961', '1963'],
        correctAnswer: '1963'
    },
    {
        question: 'In what year did World War I begin?',
        answers: ['1914', '1915', '1916', '1917'],
        correctAnswer: '1914'
    },
    {
        question: 'Aztec civilization originated from which country?',
        answers: ['Portugal', 'Italy', 'Mexico', 'Greece'],
        correctAnswer: 'Mexico'
    },
    {
        question: 'Where is Babylon remain located?',
        answers: ['Iran', 'Iraq', 'Turkey', 'Egypt'],
        correctAnswer: 'Iraq'
    },
    {
        question: 'Who was the first man to walk on the moon?',
        answers: ['Buzz Aldrin', 'Edgar Mitchell', 'James Irwin', 'Neil Armstrong'],
        correctAnswer: 'Neil Armstrong'
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
    showQuestion(questionsb[currentQuestionIndex]);
}

restartButton.addEventListener('click', restartQuiz);

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion(questionsb[currentQuestionIndex]);
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
    const correct = selectedButton.innerText === questionsb[currentQuestionIndex].correctAnswer;
    if (correct) {
        selectedButton.classList.add('correct');
        score++;
        scoreElement.innerText = `Score: ${score}`;
    } else {
        selectedButton.classList.add('wrong');
        const correctButton = Array.from(answersElement.children).find(button => button.innerText === questionsb[currentQuestionIndex].correctAnswer);
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
    if (currentQuestionIndex < questionsb.length) {
        showQuestion(questionsb[currentQuestionIndex]);
        nextButton.classList.add('hide');
    } else {
        finishButton.click();
    }
});

startQuiz();

finishButton.addEventListener('click', () => {
    const percentageScore = (score / questionsb.length) * 100;
    userScoreElement.innerText = `${score} out of ${questionsb.length} (${percentageScore.toFixed(0)}%)`;
    
    answersElement.innerHTML = '';
    questionElement.innerText = '';
    summarySection.classList.remove('hide');
    finishButton.classList.add('hide');
});

resetButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    summarySection.classList.add('hide');
    startQuiz();
});

resetButton.addEventListener('click', () => {
    restartQuiz();
});
