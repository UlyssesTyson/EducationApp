function homePageListeners() {
    const username = localStorage.getItem('username');
document.getElementById('welcome-text').textContent = `Welcome back ${username}`;
    const game1 = document.getElementById("game-1");
    const game2 = document.getElementById("game-2");
    const game3 = document.getElementById("game-3");

    game1.addEventListener("click", () => {
        window.location.href = "../pages/game-topic-1.html";
    });

    game2.addEventListener("click", () => {
        window.location.href = "../pages/game-topic-2.html";
    });

    game3.addEventListener("click", () => {
        alert("Game coming soon!");
    });
}

document.addEventListener("DOMContentLoaded", homePageListeners);

const userBtn = document.getElementById('user-btn');
userBtn.addEventListener('click', () => {
    document.getElementById('user-menu').classList.toggle('open');
});

document.addEventListener('click', (e) => {
    if (!document.getElementById('user-menu').contains(e.target)) {
        document.getElementById('user-menu').classList.remove('open');
    }
});

module.exports = { homePageListeners };