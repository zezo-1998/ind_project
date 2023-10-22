document.addEventListener("DOMContentLoaded", function() {
    const mathematicsContent = document.getElementById('mathematics-content');

    const mathematicsQuestions = [
        { question: 'What is the result of 19 + 44?', answer: '63' },
        { question: 'What is the square root of 49?', answer: '7' },
        { question: '60 Times of 8 Equals to?', answer: '480' },
        { question: 'What is the Next Prime Number after 7?', answer: '11' },
        { question: 'What is 6% Equals to', answer: '0.06' },
        { question: 'How Many Months Make a Century?', answer: '1200' },
    ];

    function createFlashcard(question, answer, container) {
        const flashcard = document.createElement('div');
        flashcard.classList.add('flashcard');
        flashcard.innerHTML = `
            <div class="question">${question}</div>
            <div class="answer">${answer}</div>
        `;
        flashcard.querySelector('.answer').style.display = 'none';
        container.appendChild(flashcard);

        flashcard.addEventListener('click', () => {
            const answerElement = flashcard.querySelector('.answer');
            answerElement.style.display = answerElement.style.display === 'none' ? 'block' : 'none';
        });
    }

    function loadQuestions(questions, contentContainer) {
        questions.forEach(({ question, answer }) => {
            createFlashcard(question, answer, contentContainer);
        });
    }

    loadQuestions(mathematicsQuestions, mathematicsContent);

    const addQuestionButton = document.getElementById('add-question-btn');
    const questionForm = document.getElementById('question-form');
    const questionInput = document.getElementById('question-input');
    const answerInput = document.getElementById('answer-input');
    const submitQuestionButton = document.getElementById('submit-question-btn');

    addQuestionButton.addEventListener('click', () => {
        questionForm.classList.toggle('hidden');
    });

    submitQuestionButton.addEventListener('click', () => {
        const question = questionInput.value;
        const answer = answerInput.value;

        if (question && answer) {
            const newQuestion = { question, answer };
            createFlashcard(question, answer, mathematicsContent);
            mathematicsQuestions.push(newQuestion);
            questionInput.value = '';
            answerInput.value = '';
            questionForm.classList.add('hidden');
        } else {
            alert("Please write both question and answer.");
        }
    });
});
