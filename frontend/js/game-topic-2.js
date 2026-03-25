const nextBtn = document.getElementById("nextQBtn");
const questionEl = document.getElementById("question");
const answerOptions = document.getElementById("answer-options");

// Example first question
const questions = [
    {
        question: "Which river was central to Ancient Egyptian civilization?",
        answers: ["Amazon", "Nile", "Yangtze", "Mississippi"],
        correct: "Nile"
    },
    {
        question: "Who was the sun god in Ancient Egypt?",
        answers: ["Ra", "Zeus", "Thor", "Osiris"],
        correct: "Ra"
    }
];

let currentQuestion = 0;

// Load a question
function loadQuestion() {
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;

    // Clear previous answers
    answerOptions.innerHTML = "";

    // Add answer buttons
    q.answers.forEach(ans => {
        const btn = document.createElement("button");
        btn.className = "question";
        btn.textContent = ans;
        btn.addEventListener("click", () => checkAnswer(ans));
        answerOptions.appendChild(btn);
    });
}

// Check the answer
function checkAnswer(selected) {
    const correct = questions[currentQuestion].correct;
    if (selected === correct) {
        alert("Correct!");
    } else {
        alert(`Wrong! The correct answer is ${correct}.`);
    }

    // Move to next question
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        questionEl.textContent = "You've completed the Ancient Egypt Adventure!";
        answerOptions.innerHTML = "";
        nextBtn.style.display = "none";
    }
}

// Start button loads the first question
nextBtn.addEventListener("click", () => {
    loadQuestion();
});