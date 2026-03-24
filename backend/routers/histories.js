const { Router } = require('express');

// All the controllers required
const questionController = require('../controllers/question')
const answerController = require('../controllers/answer')
const leaderboardController = require('../controllers/leaderboard')
const accountController = require('../controllers/user');

const questionRouter = Router();
const answerRouter = Router();
const leaderboardRouter = Router();
const authRouter = Router();

leaderboardRouter.get("/home", leaderboardController.index) // this is to show the user the leaderboard info
leaderboardRouter.patch("/home/:id", leaderboardController.update) // this is to  update the score
leaderboardRouter.post("/home", leaderboardController.create) // this is to create a new entry into the leaderboard

// questionRouter.get("/home", questionController.index); // get all questions
questionRouter.get("/home/:category", questionController.show); // get questions by question number

// answerRouter.get("/home/:QN", answerController.index) // placeholder
// answerRouter.get("/home/:QN", answerController.show) // placeholder

authRouter.post("/register", accountController.register); // Sign up route (create new account)
authRouter.post("/login", accountController.login); // Login route (check username/password)

module.exports = {questionRouter, leaderboardRouter, answerRouter, authRouter}