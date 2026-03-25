// User menu toggle
const userMenu = document.getElementById("user-menu");
const userBtn = document.getElementById("user-btn");

userBtn.addEventListener("click", () => {
    userMenu.classList.toggle("open");
});

// Ancient Egypt questions (your original ones)
const questions = [
    {
        question: "Which river was central to Ancient Egyptian civilization?",
        options: ["Nile", "Amazon", "Mississippi", "Yangtze"],
        answer: "Nile"
    },
    {
        question: "Who was the boy king of Egypt famous for his tomb?",
        options: ["Tutankhamun", "Ramses II", "Cleopatra", "Akhenaten"],
        answer: "Tutankhamun"
    },
    {
        question: "What were the massive tombs built for pharaohs called?",
        options: ["Pyramids", "Ziggurats", "Temples", "Obelisks"],
        answer: "Pyramids"
    },
    // Add more questions as needed
];

let currentQ = 0;
const questionText = document.getElementById("question");
const answerOptions = document.getElementById("answer-options");
const nextQBtn = document.getElementById("nextQBtn");

function showQuestion() {
    const q = questions[currentQ];
    questionText.textContent = q.question;
    answerOptions.innerHTML = "";
    q.options.forEach(opt => {
        const div = document.createElement("div");
        div.className = "question";
        div.textContent = opt;
        div.addEventListener("click", () => checkAnswer(opt));
        answerOptions.appendChild(div);
    });
}

function checkAnswer(selected) {
    const correct = questions[currentQ].answer;
    if (selected === correct) {
        currentQ++;
        if (currentQ < questions.length) {
            showQuestion();
        } else {
            questionText.textContent = "You’ve completed the Ancient Egypt adventure!";
            answerOptions.innerHTML = `<button class="returnHome" onclick="window.location.href='../pages/home-page.html'">Return Home</button>`;
            nextQBtn.style.display = "none";
        }
    } else {
        alert("Incorrect answer! Start again.");
        // Reset the game
        currentQ = 0;
        showQuestion();
    }
}

// Start button shows first question
nextQBtn.addEventListener("click", () => {
    showQuestion();
    nextQBtn.style.display = "none";
});