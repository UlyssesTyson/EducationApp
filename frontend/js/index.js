const API_BASE = 'http://localhost:3000';
//const API_BASE = "";


// Helpers

function showError(formId, message) {
    clearError(formId);
    const error = document.createElement('p');
    error.className = 'form-error';
    error.textContent = message;
    document.getElementById(formId).prepend(error);
}

function clearError(formId) {
    document.querySelector(`#${formId} .form-error`)?.remove();
}

function showSuccess(formId, message) {
    clearSuccess(formId);
    const success = document.createElement('p');
    success.className = 'form-success';
    success.textContent = message;
    document.getElementById(formId).prepend(success);
}

function clearSuccess(formId) {
    document.querySelector(`#${formId} .form-success`)?.remove();
}

// ─── Sign Up ──────────────────────────────────────────────────────────────────

async function handleSignup(event) {
    event.preventDefault();
    clearError('signupForm');

    const username = document.getElementById('firstName').value.trim();
    const password = document.getElementById('signupPassword').value;

    try {
        const response = await fetch(`${API_BASE}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Sign up failed.');

        document.getElementById('signupForm').reset();
        showSuccess('signupForm', 'Account created successfully! You can now log in.');

    } catch (err) {
        showError('signupForm', err.message);
    }
}

// ─── Log In ───────────────────────────────────────────────────────────────────

async function handleLogin(event) {
    event.preventDefault();
    clearError('loginForm');

    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    try {
        await loginUser(username, password);
    } catch (err) {
        showError('loginForm', err.message);
    }
}

async function loginUser(username, password) {
    const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.error || 'Login failed.');

    localStorage.setItem('token', result.token);
    localStorage.setItem('username', username);

    window.location.href = '/pages/home-page.html';
}

module.exports = { showError, clearError, showSuccess, clearSuccess, handleSignup, handleLogin, loginUser };