const { Router } = require('express');
const hisotryController = require('../controllers/countries')

const historyRouter = Router();

historyRouter.get("/", historyController.index);
historyRouter.get("/home", historyController.show);
historyRouter.get("/home/:name", historyController.show);

//// For Future Additions
// historyRouter.post("/", historyController.create);
// historyRouter.patch("/:name", historyController.update);
// historyRouter.delete("/:name", historyController.destroy);

module.exports = countryRouter;