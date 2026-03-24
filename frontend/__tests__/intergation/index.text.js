/**
 * @jest-environment jsdom
 */

const {
    handleSignup,
    handleLogin,
} = require('../../js/index');

describe('Integration: full login flow', () => {

    beforeEach(() => {
        document.body.innerHTML = `
            <form id="loginForm">
                <input id="loginUsername" value="TestUser" />
                <input id="loginPassword" value="password123" />
            </form>
            <form id="signupForm">
                <input id="firstName" value="TestUser" />
                <input id="signupPassword" value="password123" />
            </form>
        `;
        localStorage.clear();
        jest.clearAllMocks();
        delete window.location;
        window.location = { href: '' };
    });

    test('valid credentials → token + username saved → redirect to homepage', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ success: true, token: 'abc123' }),
        });

        document.getElementById('loginUsername').value = 'TestUser';
        document.getElementById('loginPassword').value = 'password123';

        await handleLogin({ preventDefault: jest.fn() });

        expect(localStorage.getItem('token')).toBe('abc123');
        expect(localStorage.getItem('username')).toBe('TestUser');
        expect(window.location.href).toBe('home-page.html');
    });

    test('invalid credentials → error shown → no redirect → nothing in localStorage', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            json: async () => ({ error: 'Invalid credentials' }),
        });

        await handleLogin({ preventDefault: jest.fn() });

        expect(document.querySelector('#loginForm .form-error').textContent)
            .toBe('Invalid credentials');
        expect(window.location.href).toBe('');
        expect(localStorage.getItem('token')).toBeNull();
    });

    test('signup then login with same credentials → token saved → redirect', async () => {
        global.fetch = jest.fn()
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({ id: 1, username: 'TestUser' }),
            })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({ success: true, token: 'abc123' }),
            });

        await handleSignup({ preventDefault: jest.fn() });
        expect(document.querySelector('#signupForm .form-success')).not.toBeNull();

        await handleLogin({ preventDefault: jest.fn() });
        expect(localStorage.getItem('token')).toBe('abc123');
        expect(window.location.href).toBe('home-page.html');
    });

    test('signup fails → error shown → login not attempted', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            json: async () => ({ error: 'Username already taken' }),
        });

        await handleSignup({ preventDefault: jest.fn() });

        expect(document.querySelector('#signupForm .form-error').textContent)
            .toBe('Username already taken');
        expect(localStorage.getItem('token')).toBeNull();
        expect(window.location.href).toBe('');
    });

});