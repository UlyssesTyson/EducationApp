/**
 * @jest-environment jsdom
 */

function setupDOM() {
    document.body.innerHTML = `
        <div id="user-menu"></div>
        <button id="user-btn"></button>
        <p id="question"></p>
        <div id="answer-options"></div>
        <button id="nextQBtn">Start</button>
        <audio id="victory-trumpet"></audio>
        <audio id="lose-trumpet"></audio>
        <canvas id="confetti"></canvas>
    `;
}

beforeEach(() => {
    setupDOM();

    global.JSConfetti = jest.fn().mockImplementation(() => ({
        addConfetti: jest.fn(),
    }));

    global.alert = jest.fn();

    HTMLMediaElement.prototype.play = jest.fn().mockResolvedValue(undefined);

    delete window.location;
    window.location = { href: '' };

    jest.resetModules();
    require('../../js/game-topic-2');
});

describe('Quiz: Ancient Egypt', () => {

    test('start button shows first question and hides itself', () => {
        document.getElementById('nextQBtn').click();
        expect(document.getElementById('question').textContent)
            .toBe('Which river was central to Ancient Egyptian civilization?');
        expect(document.getElementById('nextQBtn').style.display).toBe('none');
    });

    test('answer options are rendered for the first question', () => {
        document.getElementById('nextQBtn').click();
        const options = document.querySelectorAll('#answer-options .question');
        expect(options).toHaveLength(4);
    });

    test('correct answer advances to the next question', () => {
        document.getElementById('nextQBtn').click();
        Array.from(document.querySelectorAll('#answer-options .question'))
            .find(o => o.textContent === 'Nile').click();
        expect(document.getElementById('question').textContent)
            .toBe('Who was the boy king of Egypt famous for his tomb?');
    });

    test('correct answer triggers confetti', () => {
        document.getElementById('nextQBtn').click();
        const instance = global.JSConfetti.mock.results[0].value;
        Array.from(document.querySelectorAll('#answer-options .question'))
            .find(o => o.textContent === 'Nile').click();
        expect(instance.addConfetti).toHaveBeenCalled();
    });

    test('wrong answer shows alert and resets to question 1', () => {
        document.getElementById('nextQBtn').click();
        Array.from(document.querySelectorAll('#answer-options .question'))
            .find(o => o.textContent === 'Amazon').click();
        expect(global.alert).toHaveBeenCalledWith('Incorrect answer! Start again.');
        expect(document.getElementById('question').textContent)
            .toBe('Which river was central to Ancient Egyptian civilization?');
    });

    test('wrong answer plays lose trumpet', () => {
        document.getElementById('nextQBtn').click();
        Array.from(document.querySelectorAll('#answer-options .question'))
            .find(o => o.textContent === 'Amazon').click();
        expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
    });

    test('completing all questions shows win message and plays victory audio', () => {
        document.getElementById('nextQBtn').click();
        ['Nile', 'Tutankhamun', 'Pyramids'].forEach(answer => {
            Array.from(document.querySelectorAll('#answer-options .question'))
                .find(o => o.textContent === answer).click();
        });
        expect(document.getElementById('question').textContent)
            .toBe("You’ve completed the Ancient Egypt adventure!");
        expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
    });

    test('win screen contains a return home button', () => {
        document.getElementById('nextQBtn').click();
        ['Nile', 'Tutankhamun', 'Pyramids'].forEach(answer => {
            Array.from(document.querySelectorAll('#answer-options .question'))
                .find(o => o.textContent === answer).click();
        });
        expect(document.querySelector('.returnHome')).not.toBeNull();
    });

    test('user menu toggles open class on button click', () => {
        document.getElementById('user-btn').click();
        expect(document.getElementById('user-menu').classList.contains('open')).toBe(true);
        document.getElementById('user-btn').click();
        expect(document.getElementById('user-menu').classList.contains('open')).toBe(false);
    });

});