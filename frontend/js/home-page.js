//put in function to allow for testing
function homePageListeners() {
    const game1 = document.getElementById("game-1");
    const game2 = document.getElementById("game-2");
    const game3 = document.getElementById("game-3");

    //Event listeners look for a click and then change the webpage to the correct game
    game1.addEventListener("click", () => {
        window.location.href = "../pages/game-topic-1.html";
    });

    game2.addEventListener("click", () => {
        window.location.href = "../pages/game-topic-2.html";
    });

    //game 3 doesn't exist yet so trigger an alert to tell the user it is coming soon
    game3.addEventListener("click", () => {
        alert("Game coming soon!");
    });
}
//call the function so it works when the page is loaded
homePageListeners();

module.exports = { homePageListeners };
