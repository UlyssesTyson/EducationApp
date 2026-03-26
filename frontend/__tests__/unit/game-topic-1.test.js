/**
 * @jest-environment jsdom
 */


//This is required to tell jest to ignore the confetti declaration in the js as it crashed the tests
global.JSConfetti = jest.fn().mockImplementation(() => ({
  addConfetti: jest.fn()
}));
// ---------------------------------------------------------------------------------------

// Mock the DOM that game-topic-1.js expects.
function setupDOM() {
    document.body.innerHTML = `
    <section>
      <div id="user-menu">
        <button id="user-btn"></button>
        <div id="user-dropdown"></div>
      </div>
    </section>
    <section id="main-sect" class="main-sect">
      <div id="content" class="content">
        <p id="question">Intro text</p>
        <div id="answer-options"></div>
      </div>
      <button id="nextQBtn" class="enterq">Next</button>
    </section>
  `;
}

//Mocking the real questions and answers
function makeMockQuestions() {
    return [
        {
            question_text: "Q1: Henry VIII had a habit of divorcing his wives. Which powerful institution refused to allow the divorce to his first wife Catherine of Aragon?",
            answers: [
                { option_text: "The House of Commons" },
                { option_text: "The Catholic Church" },   // correct (answer2, index 1)
                { option_text: "The Royal Navy" },
            ],
        },
        {
            question_text: "Q2: As Henry's queen, you would live in the royal palace. Which of these was Henry VIII's favourite and most grand palace?",
            answers: [
                { option_text: "Hampton Court Palace" },  // correct (answer4, index 0)
                { option_text: "Buckingham Palace" },
                { option_text: "Windsor Castle" },
            ],
        },
        {
            question_text: "Q3: You learnt quickly that Henry VIII had a terrible temper. How many of his previous wives were executed on his orders?",
            answers: [
                { option_text: "1" },
                { option_text: "2" },                     // correct (answer8, index 1)
                { option_text: "3" },
            ],
        },
        {
            question_text: "Q4: Henry VIII made himself the Supreme Head of a new church. What was this church called?",
            answers: [
                { option_text: "The Methodist Church" },
                { option_text: "The Lutheran Church" },
                { option_text: "The Church of England" }, // correct (answer12, index 2)
            ],
        },
        {
            question_text: "Q5: To clear his debts he closed down monasteries across England. What is this event known as?",
            answers: [
                { option_text: "The Great Fire" },
                { option_text: "The Dissolution of the Monasteries" }, // correct (answer14, index 1)
                { option_text: "The Black Death" },
            ],
        },
    ];
}

let mockQuestions;
//resetting the mock questions for each test
beforeEach(() => {
    mockQuestions = makeMockQuestions();
    //mocking the fetch request and the response
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(mockQuestions),
        }),
    );
    //sets up the fake DOM
    setupDOM();
    jest.resetModules();
});

afterEach(() => {
    jest.clearAllMocks();
});

//load the js file to be testested. await the promises to resolve from the real JS file.
async function loadModule() {
    require("../../js/game-topic-1");
    await Promise.resolve();
    await Promise.resolve();
}


describe("Game page loads correctly", () => {
    it("fetch is called with the correct URL on load", async () => {
        await loadModule();
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(
            "/home/Tudor England",
        );
    });

    it("answer-options div is empty before the first click", async () => {
        await loadModule();
        const options = document.getElementById("answer-options");
        expect(options.innerHTML.trim()).toBe("");
    });
});


//make sure the questions are loading correctly
describe("nextQuestion()", () => {
    it("clicking Next shows question 1 text", async () => {
        //because the dom has been reset on each test the fetch will be remade so the promises need to be resolved each test
        await loadModule();
        document.getElementById("nextQBtn").click();
        expect(document.getElementById("question").innerHTML).toBe(
            mockQuestions[0].question_text,
        );
    });

    it("clicking Next shows three answer options for question 1", async () => {
        await loadModule();
        document.getElementById("nextQBtn").click();
        const options = document.querySelectorAll(".question");
        expect(options).toHaveLength(3);
    });

    it("answer options for question 1 match the mock data", async () => {
        await loadModule();
        document.getElementById("nextQBtn").click();
        const texts = [...document.querySelectorAll(".question")].map(
            (element) => element.textContent,
        );
        expect(texts).toEqual([
            mockQuestions[0].answers[0].option_text,
            mockQuestions[0].answers[1].option_text,
            mockQuestions[0].answers[2].option_text,
        ]);
    });

    it("Next button is hidden after clicking it", async () => {
        await loadModule();
        document.getElementById("nextQBtn").click();
        expect(document.getElementById("nextQBtn").style.display).toBe("none");
    });

    it("answer-options div is cleared before rendering a new question", async () => {
        await loadModule();
        document.getElementById("nextQBtn").click();

        // Select the correct answer for Q1 (index 1)
        const correctEl = document.querySelectorAll(".question")[1];
        correctEl.click();

        // Should now show Q2's three options only, not six
        expect(document.querySelectorAll(".question")).toHaveLength(3);
    });
});

//make sure that on each correct question answer it progreses to the next question
describe("checkAnswer()", () => {
    //let jest know what answers are correct so it can test both correct and wrong answers
    const correctIndices = [1, 0, 1, 2, 1];

    //function to mock progressing through the game 
    async function moveToNextQuestion(targetQuestion) {
        await loadModule();
        document.getElementById("nextQBtn").click();
        for (let i = 0; i < targetQuestion - 1; i++) {
            const options = document.querySelectorAll(".question");
            options[correctIndices[i]].click();
        }
    }

    it("correct answer on Q1 advances to Q2", async () => {
        await moveToNextQuestion(2);
        expect(document.getElementById("question").innerHTML).toBe(
            mockQuestions[1].question_text,
        );
    });

    it("correct answer on Q2 advances to Q3", async () => {
        await moveToNextQuestion(3);
        expect(document.getElementById("question").innerHTML).toBe(
            mockQuestions[2].question_text,
        );
    });

    it("correct answer on Q3 advances to Q4", async () => {
        await moveToNextQuestion(4);
        expect(document.getElementById("question").innerHTML).toBe(
            mockQuestions[3].question_text,
        );
    });

    it("correct answer on Q4 advances to Q5", async () => {
        await moveToNextQuestion(5);
        expect(document.getElementById("question").innerHTML).toBe(
            mockQuestions[4].question_text,
        );
    });

    it("answering all 5 questions correctly shows the win message", async () => {
        await moveToNextQuestion(5);
        // Select the correct answer for Q5
        document.querySelectorAll(".question")[correctIndices[4]].click();
        expect(document.getElementById("content").innerHTML).toContain(
            "Congratulations",
        );
    });

    it("Home button appears after reaching win screen", async () => {
        await playUpTo(5);
        document.querySelectorAll(".question")[correctIndices[4]].click();
        expect(document.querySelector(".returnHome")).not.toBeNull();
    });
});

//check the correct behaviour for a wrong answer
describe("checkAnswer() wrong answer", () => {
    it("wrong answer on Q1 shows the lose message", async () => {
        await loadModule();
        document.getElementById("nextQBtn").click();
        // Index 0 is wrong for Q1
        document.querySelectorAll(".question")[0].click();
        expect(document.getElementById("content").innerHTML).toContain(
            "wrong answer",
        );
    });

    it("Home button appears on the lose screen", async () => {
        await loadModule();
        document.getElementById("nextQBtn").click();
        document.querySelectorAll(".question")[0].click();
        expect(document.querySelector(".returnHome")).not.toBeNull();
    });

    it("wrong answer on Q3 shows the lose message", async () => {
        await loadModule();
        document.getElementById("nextQBtn").click();

        // Answer Q1 correctly
        document.querySelectorAll(".question")[1].click();
        // Answer Q2 correctly
        document.querySelectorAll(".question")[0].click();
        // Pick a wrong answer on Q3
        document.querySelectorAll(".question")[0].click();

        expect(document.getElementById("content").innerHTML).toContain(
            "wrong answer",
        );
    });
});