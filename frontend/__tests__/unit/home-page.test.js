/**
 * @jest-environment jsdom
 */
const { homePageListeners } = require('../../js/home-page');

describe('homePageListeners', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="game-1"></div>
            <div id="game-2"></div>
            <div id="game-3"></div>
        `;

        delete window.location;
        window.location = { href: '' };

        jest.spyOn(window, 'alert').mockImplementation(() => {});

        homePageListeners();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('game-1 click navigates to game-topic-1.html', () => {
        document.getElementById('game-1').click();
        expect(window.location.href).toBe('../pages/game-topic-1.html');
    });

    test('game-2 click navigates to game-topic-2.html', () => {
        document.getElementById('game-2').click();
        expect(window.location.href).toBe('../pages/game-topic-2.html');
    });

    test('game-3 click triggers a "coming soon" alert', () => {
        document.getElementById('game-3').click();
        expect(window.alert).toHaveBeenCalledWith('Game coming soon!');
    });

    test('game-3 click does not change the page location', () => {
        document.getElementById('game-3').click();
        expect(window.location.href).toBe('');
    });
});