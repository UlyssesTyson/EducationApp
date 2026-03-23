/**
 * @jest-environment jsdom
 */

global.fetch = jest.fn();

describe("Auth flow", () => {

  let assignMock;

  beforeEach(() => {
    jest.resetModules();

    document.body.innerHTML = `
      <form id="loginForm">
        <input name="username" value="testuser" />
        <input name="password" value="password123" />
        <button class="auth-btn">Log In</button>
      </form>

      <form id="signupForm">
        <input name="username" value="newuser" />
        <input name="password" value="pass123" />
        <input name="confirmPassword" value="pass123" />
        <button class="auth-btn">Sign Up</button>
      </form>
    `;

    window.alert = jest.fn();
    fetch.mockClear();
    localStorage.clear();

    assignMock = jest.fn();
    delete window.location; 
    window.location = { assign: assignMock };

    require("../../../frontend/js/index.js");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ---------- LOGIN ----------

  test("login success → stores token + redirects", async () => {
    fetch.mockResolvedValueOnce({
      status: 200,
      json: async () => ({ token: "abc123" })
    });

    const form = document.getElementById("loginForm");

    form.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true })
    );

    await new Promise(r => setTimeout(r, 0));

    expect(localStorage.getItem("token")).toBe("abc123");
    expect(assignMock).toHaveBeenCalledWith("home-page.html");
  });

  test("login failure → shows alert", async () => {
    fetch.mockResolvedValueOnce({
      status: 401,
      json: async () => ({ error: "Invalid login" })
    });

    const form = document.getElementById("loginForm");

    form.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true })
    );

    await new Promise(r => setTimeout(r, 0));

    expect(window.alert).toHaveBeenCalledWith("Invalid login");
  });

  // ---------- SIGNUP ----------

  test("signup success → shows alert", async () => {
    fetch.mockResolvedValueOnce({
      status: 201,
      json: async () => ({})
    });

    const form = document.getElementById("signupForm");

    form.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true })
    );

    await new Promise(r => setTimeout(r, 0));

    expect(window.alert).toHaveBeenCalledWith(
      "Account created! Please log in."
    );
  });

  test("signup failure → shows error", async () => {
    fetch.mockResolvedValueOnce({
      status: 400,
      json: async () => ({ error: "User exists" })
    });

    const form = document.getElementById("signupForm");

    form.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true })
    );

    await new Promise(r => setTimeout(r, 0));

    expect(window.alert).toHaveBeenCalledWith("User exists");
  });

  test("signup password mismatch → blocks request", async () => {
    jest.resetModules();

    document.body.innerHTML = `
      <form id="loginForm"></form>

      <form id="signupForm">
        <input name="username" value="newuser" />
        <input name="password" value="one" />
        <input name="confirmPassword" value="two" />
        <button class="auth-btn">Sign Up</button>
      </form>
    `;

    window.alert = jest.fn();
    fetch.mockClear();

    assignMock = jest.fn();
    delete window.location;
    window.location = { assign: assignMock };

    require("../../../frontend/js/index.js");

    const form = document.getElementById("signupForm");

    form.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true })
    );

    await new Promise(r => setTimeout(r, 0));

    expect(fetch).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith(
      "Passwords do not match."
    );
  });

});