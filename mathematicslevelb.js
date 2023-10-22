document.addEventListener("DOMContentLoaded", function() {
    const mathematicsContent = document.getElementById('mathematics-content');

    const mathematicsQuestions = [
        { question: '121 Divided by 11 is', answer: '11' },
        { question: 'Find the Missing Term in Multiples of 6 : 6, 12, 18, 24, _, 36, 42, _ 54, 60.', answer: '30 , 48' },
        { question: 'The Product of 131 × 0 × 300 × 4', answer: '0' },
        { question: 'Solve 3 + 6 × ( 5 + 4) ÷ 3 - 7', answer: '14' },
        { question: 'What is the product of 121 x 0 x 20 x 2.5', answer: '0' },
        { question: 'What is the year 1982 in Roman Numerals?', answer: 'MCMLXXXII' },
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
