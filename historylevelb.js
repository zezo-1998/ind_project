document.addEventListener("DOMContentLoaded", function() {
    const historyContentB = document.getElementById('history-content-b');

    const historyQuestionsB = [
        { question: "In which year was John F. Kennedy assassinated?", answer: "1963"},
        { question: 'In what year did World War I begin?', answer: '1914' },
        { question: 'Aztec civilization originated from which country?', answer: 'Mexico' },
        { question: 'Where is Babylon remain located?', answer: 'Iraq' },
        { question: "What is the oldest capital in the world?", answer: 'Damascus' },
        { question: 'Who was the first man to walk on the moon?', answer: 'Neil Armstrong' },
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

    function addQuestion(question, answer) {
        historyQuestionsB.push({ question, answer });
        createFlashcard(question, answer, historyContentB);
    }

    historyQuestionsB.forEach(({ question, answer }) => {
        createFlashcard(question, answer, historyContentB);
    });
    const addQuestionButton = document.getElementById('add-question-btn-history');
    const questionForm = document.getElementById('question-form-history');
    const questionInput = document.getElementById('question-input-history');
    const answerInput = document.getElementById('answer-input-history');
    const submitQuestionButton = document.getElementById('submit-question-btn-history');

    addQuestionButton.addEventListener('click', () => {
        questionForm.classList.toggle('hidden');
    });

    submitQuestionButton.addEventListener('click', () => {
        const question = questionInput.value;
        const answer = answerInput.value;

        if (question && answer) {
            addQuestion(question, answer);

            questionInput.value = '';
            answerInput.value = '';

            questionForm.classList.add('hidden');
        } else {
            alert("Please write your question and its answer");
        }
    });
});


