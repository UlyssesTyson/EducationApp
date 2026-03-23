const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const historyRoutes = require('./routers/histories');

const app = express();

app.use(express.json());
if (process.env.NODE_ENV !== "test") app.use(logger('dev'));
app.use(cors());

app.use('/histories', historyRoutes);

app.get('/', (req, res) => {
  res.send({
    message: "welcome",
    description: "History Quiz API",
    endpoints: [
      "GET    /                  200",
      "GET    /histories         200",
      "GET    /histories/:id     200",
      "POST   /histories         201",
      "GET    /quiz/:category    200"
    ]
  });
});

app.post('/', (req, res) => {
  res.status(405).send('Not allowed!');
});

module.exports = app;