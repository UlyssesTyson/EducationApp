# Questry — Frontend

A history-themed educational quiz game for children. Players choose from a selection of interactive story-based games and answer questions to progress through historical scenarios.

---

## Installation & Usage

### Installation

- Clone or download the repository.
- Ensure the backend server is running (see backend README).

### Usage

- Open `index.html` in your browser, or navigate to the hosted URL.
- Sign up for an account or log in with existing credentials.
- From the home page, choose a game to play.
- Answer questions correctly to progress — one wrong answer and you start again!

---

## Process

- Started by building the sign-up and login forms with client-side validation and error handling.
- Connected the auth forms to the backend API using `fetch`, storing the token and username in `localStorage` on successful login.
- Built the home page to display available games, pulling the username from `localStorage` to show a personalised welcome message.
- Developed the first game (Henry VIII) using a fetch-based question loader that pulls questions and answers from the backend API.

```js
async function getQuestions() {
    const response = await fetch(`${API_BASE}/questions/home/Tudor England`);
    allQuestions = await response.json();
}
```

- Built the second game (Ancient Egypt) with a locally defined questions array, `showQuestion()` to render options dynamically, and `checkAnswer()` to handle correct/incorrect responses.

```js
function checkAnswer(selected) {
    const correct = questions[currentQ].answer;
    if (selected === correct) {
        currentQ++;
        jsConfetti.addConfetti();
        if (currentQ < questions.length) {
            showQuestion();
        } else {
            questionText.textContent = "You've completed the Ancient Egypt adventure!";
            victoryAudio.play();
        }
    } else {
        alert("Incorrect answer! Start again.");
        loseTrumpet.play();
        currentQ = 0;
        showQuestion();
    }
}
```

- Added win/lose audio effects and a confetti animation on correct answers.
- Wrote unit and integration tests using Jest and jsdom to cover auth flows, question rendering, answer checking, and UI interactions.

---

## Screenshots

| Login Page | Home Page | Game Page |
|---|---|---|
| Sign up & log in forms | Game selection with hover effects | Question & answer interface |

---

## Wins & Challenges

### Wins

- Clean, consistent styling across all pages using CSS variables defined in `global.css`.
- Fully tested auth flow covering success, failure, and edge cases.
- Engaging hover animations on the home page game cards.

### Challenges

- Mocking `JSConfetti` in Jest — it is loaded via a CDN script tag in the browser, so it needed to be mocked on `global` before the module was required in tests.
- Managing async `fetch` calls in tests required careful use of `await Promise.resolve()` to let the module's top-level async functions settle before assertions ran.

---

## Bugs

- No error handling if the backend is unreachable — the game will silently fail to load questions.
- Game 3 (WWII) is not yet implemented and shows an alert placeholder.

---

## Future Features

- Add Game 3 (WWII themed quiz).
- Leaderboard displaying top scores per game.
- Timer mechanic to add difficulty.
