const { Router } = require('express');
const hisotryController = require('../controllers/histories')
const accountController = require('../controllers/user');

const historyRouter = Router();
const authRouter = Router();

historyRouter.get("/", historyController.index);
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