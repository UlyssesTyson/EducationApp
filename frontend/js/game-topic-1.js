const nextQBtn = document.getElementById("nextQBtn");
const question = document.getElementById("question");
const answerOptions = document.getElementById("answer-options");

const content = document.getElementById("content");

//test api url base will need to change for the real hosted url
const API_BASE = "http://localhost:3000";

//get all the questions from the db
let allQuestions;
let correctAnswer;

let answer1;
let answer2;
let answer3;
let answer4;
let answer5;
let answer6;
let answer7;
let answer8;
let answer9;
let answer10;
let answer11;
let answer12;
let answer13;
let answer14;
let answer15;

async function getQuestions() {
    const response = await fetch(`${API_BASE}/questions/home/Tudor England`);
    allQuestions = await response.json();
    //console.log(questions);

    answer1 = allQuestions[0].answers[0];
    answer2 = allQuestions[0].answers[1];
    answer3 = allQuestions[0].answers[2];

    answer4 = allQuestions[1].answers[0];
    answer5 = allQuestions[1].answers[1];
    answer6 = allQuestions[1].answers[2];

    answer7 = allQuestions[2].answers[0];
    answer8 = allQuestions[2].answers[1];
    answer9 = allQuestions[2].answers[2];

    answer10 = allQuestions[3].answers[0];
    answer11 = allQuestions[3].answers[1];
    answer12 = allQuestions[3].answers[2];

    answer13 = allQuestions[4].answers[0];
    answer14 = allQuestions[4].answers[1];
    answer15 = allQuestions[4].answers[2];
}

getQuestions();

//set current question number
let questionNum = 1;
//button will be hidden when the game starts
let hideBtn = true;

//event listener on the button to start quizz
nextQBtn.addEventListener("click", nextQuestion);

//event listener on the created quiz answers to allow for correct answer checking
answerOptions.addEventListener("click", checkAnswer);

//called when the button is pressed or an answer to the question is selected
function nextQuestion(e) {
    if (hideBtn) {
        e.preventDefault();
        hideBtn = false;
    }
    //clear the html ready for next question
    answerOptions.innerHTML = "";
    //question one and answer options
    if (questionNum === 1) {
        question.innerHTML = allQuestions[0].question_text;
        //defining what the correct answer should be
        correctAnswer = answer2.option_text;
        answerOptions.insertAdjacentHTML(
            "beforeend",
            `<p class="question">${answer1.option_text}</p>`,
        );
        answerOptions.insertAdjacentHTML(
            "beforeend",
            `<p class="question">${answer2.option_text}</p>`,
        );
        answerOptions.insertAdjacentHTML(
            "beforeend",
            `<p class="question">${answer3.option_text}</p>`,
        );
    } 
    //question two and answer options
    else if (questionNum === 2) {
        question.innerHTML = allQuestions[1].question_text;
        correctAnswer = answer4.option_text;
        answerOptions.insertAdjacentHTML(
            "beforeend",
            `<p class="question">${answer4.option_text}</p>`,
        );
        answerOptions.insertAdjacentHTML(
            "beforeend",
            `<p class="question">${answer5.option_text}</p>`,
        );
        answerOptions.insertAdjacentHTML(
            "beforeend",
            `<p class="question">${answer6.option_text}</p>`,
        );
    } 
    //question three and answer options
    else if (questionNum === 3) {
        question.innerHTML = allQuestions[2].question_text;
        correctAnswer = answer8.option_text;
        answerOptions.insertAdjacentHTML(
            "beforeend",
            `<p class="question">${answer7.option_text}</p>`,
        );
        answerOptions.insertAdjacentHTML(
            "beforeend",
            `<p class="question">${answer8.option_text}</p>`,
        );
        answerOptions.insertAdjacentHTML(
            "beforeend",
            `<p class="question">${answer9.option_text}</p>`,
        );
    } 
    //question four and answer options
    else if (questionNum === 4) {
        question.innerHTML = allQuestions[3].question_text;
        correctAnswer = answer12.option_text;
        answerOptions.insertAdjacentHTML(
            "beforeend",
            `<p class="question">${answer10.option_text}</p>`,
        );
        answerOptions.insertAdjacentHTML(
            "beforeend",
            `<p class="question">${answer11.option_text}</p>`,
        );
        answerOptions.insertAdjacentHTML(
            "beforeend",
            `<p class="question">${answer12.option_text}</p>`,
        );
    } 
    //question five and answer options
    else if (questionNum === 5) {
        question.innerHTML = allQuestions[4].question_text;
        correctAnswer = answer14.option_text;
        answerOptions.insertAdjacentHTML(
            "beforeend",
            `<p class="question">${answer13.option_text}</p>`,
        );
        answerOptions.insertAdjacentHTML(
            "beforeend",
            `<p class="question">${answer14.option_text}</p>`,
        );
        answerOptions.insertAdjacentHTML(
            "beforeend",
            `<p class="question">${answer15.option_text}</p>`,
        );
    }

    //hide the next button so the user has to select an answer to get to the next question
    nextQBtn.style.display = "none";
}

//what happens when a wrong answer is selected. the user will be taken back to the home page
function wrongAnswer() {
    content.innerHTML = "";
    content.innerHTML =
        "<p>That was the wrong answer. You did not survuve being married to Henry VIII</p>";
    content.insertAdjacentHTML(
        "beforeend",
        `<button class="returnHome" onclick="window.location.href='../pages/home-page.html'">Home</button>`,
    );
}

//what happens if the player get all questions correct
function allCorrect() {
    content.innerHTML = "";
    content.innerHTML =
        "<p>Congratulations, You managed to outlast Henry VIII!</p>";
    content.insertAdjacentHTML(
        "beforeend",
        `<button class="returnHome" onclick="window.location.href='../pages/home-page.html'">Home</button>`,
    );
}

//checks if the answer is correct
function checkAnswer(e) {
    if (e.target.classList.contains("question")) {
        //check for correct answer and if last question was answered correctly
        if (e.target.classList.contains("question") && questionNum === 5) {
            allCorrect();
        }
        //check for correct answer
        if (e.target.textContent === correctAnswer) {
            //console.log("Correct answer!!");
            questionNum += 1;
            nextQuestion();
        }
        //check for wrong answer
        else {
            //console.log("Wrong answer!");
            wrongAnswer();
        }
    }
}
