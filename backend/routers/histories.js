const { Router } = require('express');
const questionController = require('../controllers/question')
const answerController = require('../controllers/answer')
const leaderboardController = require('../controllers/leaderboard')

const accountController = require('../controllers/user');

const historyRouter = Router();
const questionRouter = Router();
const answerRouter = Router();
const leaderboardRouter = Router();
const authRouter = Router();

questionRouter.get("/", questionController.index);
questionRouter.get("/home/:QN", questionController.show);

historyRouter.get("/:questionNumber", historyController.index);
historyRouter.get("/home", historyController.show);
historyRouter.get("/home/:name", historyController.show);

// Sign up route (create new account)
authRouter.post("/register", accountController.register);
// Login route (check username/password)
authRouter.post("/login", accountController.login);

//// For Future Additions
// historyRouter.post("/", historyController.create);
// historyRouter.patch("/:name", historyController.update);
// historyRouter.delete("/:name", historyController.destroy);

module.exports = countryRouter, authRouter;