document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = document.querySelector("#loginForm .auth-btn");
    btn.textContent = "Signing in...";
    btn.disabled = true;

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: form.get("username"),
            password: form.get("password")
        })
    };

    const response = await fetch("http://localhost:3000/users/login", options);
    const data = await response.json();

    if (response.status === 200) {
        localStorage.setItem("token", data.token);
        window.location.assign("home-page.html");
    } else {
        alert(data.error);
        btn.textContent = "Log In";
        btn.disabled = false;
    }
});

document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = document.querySelector("#signupForm .auth-btn");
    btn.textContent = "Creating account...";
    btn.disabled = true;

    const form = new FormData(e.target);

    const password = form.get("password");
    const confirmPassword = form.get("confirmPassword");

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        btn.textContent = "Sign Up";
        btn.disabled = false;
        return;
    }

    const options = {
        method: "POST",
       
        body: JSON.stringify({
            username: form.get("username"),
            password
        })
    };

    const response = await fetch("http://localhost:3000/users/register", options);
    const data = await response.json();

    if (response.status === 201) {
        alert("Account created! Please log in.");
        document.getElementById("signupForm").reset();
        btn.textContent = "Sign Up";
        btn.disabled = false;
    } else {
        alert(data.error);
        btn.textContent = "Sign Up";
        btn.disabled = false;
    }
});