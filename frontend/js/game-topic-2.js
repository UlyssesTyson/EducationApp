const nextQBtn = document.getElementById("nextQBtn");
const question = document.getElementById("question");
const answerOptions = document.getElementById("answer-options");
const content = document.getElementById("content");

const API_BASE = "http://localhost:3000";

// store questions
let questions;
let correctAnswer;

// store answers (same pattern as your original)
let answer1, answer2, answer3;
let answer4, answer5, answer6;
let answer7, answer8, answer9;
let answer10, answer11, answer12;
let answer13, answer14, answer15;


async function getQuestions() {
    const response = await fetch(`${API_BASE}/questions/home/Ancient Egypt`);
    questions = await response.json();

    // Question 1
    answer1 = questions[0].answers[0];
    answer2 = questions[0].answers[1];
    answer3 = questions[0].answers[2];

    // Question 2
    answer4 = questions[1].answers[0];
    answer5 = questions[1].answers[1];
    answer6 = questions[1].answers[2];

    // Question 3
    answer7 = questions[2].answers[0];
    answer8 = questions[2].answers[1];
    answer9 = questions[2].answers[2];

    // Question 4
    answer10 = questions[3].answers[0];
    answer11 = questions[3].answers[1];
    answer12 = questions[3].answers[2];

    // Question 5
    answer13 = questions[4].answers[0];
    answer14 = questions[4].answers[1];
    answer15 = questions[4].answers[2];
}

getQuestions();


let questionNum = 1;
let hideBtn = true;

// EVENTS
nextQBtn.addEventListener("click", nextQuestion);
answerOptions.addEventListener("click", checkAnswer);


function nextQuestion(e) {
    if (hideBtn) {
        e.preventDefault();
        hideBtn = false;
    }

    answerOptions.innerHTML = "";

    // Q1
    if (questionNum === 1) {
        question.innerHTML = questions[0].question_text;

        // correct answer = Nile River (index 0)
        correctAnswer = answer1.option_text;

        answerOptions.insertAdjacentHTML("beforeend", `<p class="question">${answer1.option_text}</p>`);
        answerOptions.insertAdjacentHTML("beforeend", `<p class="question">${answer2.option_text}</p>`);
        answerOptions.insertAdjacentHTML("beforeend", `<p class="question">${answer3.option_text}</p>`);
    }

    // Q2
    else if (questionNum === 2) {
        question.innerHTML = questions[1].question_text;

        correctAnswer = answer4.option_text;

        answerOptions.insertAdjacentHTML("beforeend", `<p class="question">${answer4.option_text}</p>`);
        answerOptions.insertAdjacentHTML("beforeend", `<p class="question">${answer5.option_text}</p>`);
        answerOptions.insertAdjacentHTML("beforeend", `<p class="question">${answer6.option_text}</p>`);
    }

    // Q3
    else if (questionNum === 3) {
        question.innerHTML = questions[2].question_text;

        correctAnswer = answer7.option_text;

        answerOptions.insertAdjacentHTML("beforeend", `<p class="question">${answer7.option_text}</p>`);
        answerOptions.insertAdjacentHTML("beforeend", `<p class="question">${answer8.option_text}</p>`);
        answerOptions.insertAdjacentHTML("beforeend", `<p class="question">${answer9.option_text}</p>`);
    }

    // Q4
    else if (questionNum === 4) {
        question.innerHTML = questions[3].question_text;

        correctAnswer = answer10.option_text;

        answerOptions.insertAdjacentHTML("beforeend", `<p class="question">${answer10.option_text}</p>`);
        answerOptions.insertAdjacentHTML("beforeend", `<p class="question">${answer11.option_text}</p>`);
        answerOptions.insertAdjacentHTML("beforeend", `<p class="question">${answer12.option_text}</p>`);
    }

    // Q5
    else if (questionNum === 5) {
        question.innerHTML = questions[4].question_text;

        correctAnswer = answer13.option_text;

        answerOptions.insertAdjacentHTML("beforeend", `<p class="question">${answer13.option_text}</p>`);
        answerOptions.insertAdjacentHTML("beforeend", `<p class="question">${answer14.option_text}</p>`);
        answerOptions.insertAdjacentHTML("beforeend", `<p class="question">${answer15.option_text}</p>`);
    }

    nextQBtn.style.display = "none";
}


function wrongAnswer() {
    content.innerHTML = `
        <p>You chose incorrectly... The ancient gods were not pleased. Your journey ends here.</p>
        <button class="returnHome" onclick="window.location.href='../pages/home-page.html'">Home</button>
    `;
}



function allCorrect() {
    content.innerHTML = `
        <p>Congratulations! You mastered the secrets of Ancient Egypt!</p>
        <button class="returnHome" onclick="window.location.href='../pages/home-page.html'">Home</button>
    `;
}


function checkAnswer(e) {
    if (e.target.classList.contains("question")) {

        // last question correct
        if (e.target.textContent === correctAnswer && questionNum === 5) {
            allCorrect();
            return;
        }

        // correct
        if (e.target.textContent === correctAnswer) {
            questionNum += 1;
            nextQuestion();
        } 
        // wrong
        else {
            wrongAnswer();
        }
    }
}