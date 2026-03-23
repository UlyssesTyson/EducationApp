const {
    showError,
    clearError,
    handleSignup,
    handleLogin,
    loginUser,
} = require('../../js/index');

beforeEach(() => {
    document.body.innerHTML = `
        <form id="signupForm">
            <input id="firstName"       value="TestUser" />
            <input id="signupEmail"     value="parent@test.com" />
            <input id="signupPassword"  value="password123" />
            <button class="auth-btn">Sign Up</button>
        </form>

        <form id="loginForm">
            <input id="loginUsername" value="TestUser" />
            <input id="loginPassword" value="password123" />
            <a class="forgot-password" href="#">forgot password?</a>
            <button class="auth-btn">Log In</button>
        </form>
    `;

    localStorage.clear();
    jest.clearAllMocks();

    delete window.location;
    window.location = { href: '' };
});

describe('showError', () => {
    test('inserts an error message into the form', () => {
        showError('signupForm', 'Something went wrong');
        expect(document.querySelector('#signupForm .form-error').textContent)
            .toBe('Something went wrong');
    });

    test('replaces an existing error rather than adding a second one', () => {
        showError('signupForm', 'First error');
        showError('signupForm', 'Second error');
        expect(document.querySelectorAll('#signupForm .form-error')).toHaveLength(1);
        expect(document.querySelector('#signupForm .form-error').textContent).toBe('Second error');
    });
});

describe('clearError', () => {
    test('removes an existing error', () => {
        showError('signupForm', 'An error');
        clearError('signupForm');
        expect(document.querySelector('#signupForm .form-error')).toBeNull();
    });

    test('does nothing if there is no error to remove', () => {
        expect(() => clearError('signupForm')).not.toThrow();
    });
});

describe('loginUser', () => {
    test('stores token + username and redirects on success', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ success: true, token: 'abc123' }),
        });

        await loginUser('TestUser', 'password123');

        expect(localStorage.getItem('token')).toBe('abc123');
        expect(localStorage.getItem('username')).toBe('TestUser');
        expect(window.location.href).toBe('home-page.html');
    });

    test('throws if the response is not ok', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            json: async () => ({ error: 'Invalid credentials' }),
        });

        await expect(loginUser('TestUser', 'wrongpass'))
            .rejects.toThrow('Invalid credentials');
    });

    test('throws if success is false even with a 200', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ success: false }),
        });

        await expect(loginUser('TestUser', 'wrongpass'))
            .rejects.toThrow('Login failed.');
    });
});

describe('handleLogin', () => {
    const fakeEvent = { preventDefault: jest.fn() };

    test('redirects to home-page on valid credentials', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ success: true, token: 'tok123' }),
        });

        await handleLogin(fakeEvent);

        expect(window.location.href).toBe('home-page.html');
    });

    test('shows an error on failed login', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            json: async () => ({ error: 'Wrong password' }),
        });

        await handleLogin(fakeEvent);

        expect(document.querySelector('#loginForm .form-error').textContent)
            .toBe('Wrong password');
    });
});

describe('handleSignup', () => {
    const fakeEvent = { preventDefault: jest.fn() };

    test('registers then auto-logs in and redirects', async () => {
        global.fetch = jest.fn()
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({ id: 1, username: 'TestUser' }),
            })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({ success: true, token: 'newtoken' }),
            });

        await handleSignup(fakeEvent);

        expect(window.location.href).toBe('home-page.html');
        expect(localStorage.getItem('token')).toBe('newtoken');
    });

    test('shows an error if registration fails', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            json: async () => ({ error: 'Username already taken' }),
        });

        await handleSignup(fakeEvent);

        expect(document.querySelector('#signupForm .form-error').textContent)
            .toBe('Username already taken');
    });
});

