const flashcards = document.querySelectorAll('.flashcard');

flashcards.forEach(flashcard => {
    flashcard.addEventListener('click', () => {
        const answer = flashcard.querySelector('.answer');
        if (answer.style.display === 'block') {
            answer.style.display = 'none';
        } else {
            answer.style.display = 'block';
        }
    });

    flashcard.addEventListener('mouseleave', () => {
        const answer = flashcard.querySelector('.answer');
        answer.style.display = 'none';
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const subjectOptions = document.querySelectorAll(".subject-option");

    subjectOptions.forEach(option => {
        option.addEventListener("click", function(event) {
            const selectedSubject = event.target.dataset.subject;
            loadSubjectContent(selectedSubject);
        });
    });

    function loadSubjectContent(subject) {
        const contentContainer = document.querySelector(".content");
        const xhr = new XMLHttpRequest();

        xhr.onload = function() {
            contentContainer.innerHTML = xhr.responseText;
        };

        xhr.open("GET", `${subject}.html`, true);
        xhr.send();
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const geographyContent = document.getElementById('geography-content');

    const geographyQuestions = [
        { question: 'What country has the most inhabitants in the world?', answer: 'China' },
        { question: 'What is the name of the largest archipelago in the world?', answer: 'Indonesia' },
        { question: "Which African country is famous for being home to the Great Pyramid of Giza and the Sphinx?", answer: "Egypt"},
        { question: "Which country is known as the Land of Fire and Ice due to its volcanoes and glaciers?", answer: "Iceland"},
        { question: "What ocean is the largest and deepest?", answer: "The Pacific Ocean"},
        { question: "What is the largest desert in the world?", answer: "Sahara Desert"},
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

    geographyQuestions.forEach(({ question, answer }) => {
        createFlashcard(question, answer, geographyContent);
    });


    console.log(geographyQuestions);


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
        geographyQuestions.push({ question, answer });

        createFlashcard(question, answer, geographyContent);

        questionInput.value = '';
        answerInput.value = '';

        questionForm.classList.add('hidden');
    } else {
        alert("Please write you question and it's answer");
    }
});

});

