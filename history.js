document.addEventListener("DOMContentLoaded", function() {
    const historyContent = document.getElementById('history-content');

    const historyQuestions = [
        { question: 'In what year did World War II begin?', answer: '1939' },
        { question: 'What is the period of great cultural and intellectual revival in Europe in the 14th and 15th centuries called?', answer: 'The Renaissance' },
        { question: 'What year did the North American Free Trade Agreement (NAFTA) go into effect?', answer: '1994' },
        { question: 'Who was the first American to win a Noble Peace Prize?', answer: 'Theodore Roosevelt' },
        { question: "In what year was the Concorde's first flight?", answer: '1969' },
        { question: 'Which country did Germany invade to kickstart World War II?', answer: 'Poland' },
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
        historyQuestions.push({ question, answer });
        createFlashcard(question, answer, historyContent);
    }

    historyQuestions.forEach(({ question, answer }) => {
        createFlashcard(question, answer, historyContent);
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
