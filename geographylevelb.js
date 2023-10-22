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
        { question: 'What country is known as "Land of a Thousand Lakes"?', answer: 'Finland' },
        { question: 'What is the largest island in the Mediterranean Sea?', answer: 'Sicily' },
        { question: 'Which river forms part of the border between the United States and Mexico?', answer: 'Rio Grande' },
        { question: "Which European country is known for its fjords and is the homeland of the Vikings?", answer: "Norway"},
        { question: "In which country would you find the Great Barrier Reef?", answer: "Australia"},
        { question: "Which river is often called the 'Father of Waters' and is the longest river in North America?", answer: "Mississippi River"}
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
