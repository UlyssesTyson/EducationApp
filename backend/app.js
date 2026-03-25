const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const { questionRouter, leaderboardRouter, authRouter } = require('./routers/histories');

const app = express();

app.use(express.json());
if (process.env.NODE_ENV !== "test") app.use(logger('dev'));
app.use(cors());

app.use('/', authRouter);
app.use('/questions', questionRouter);
app.use('/leaderboard', leaderboardRouter);

app.get('/', (req, res) => {
  res.send({
    message: "welcome",
    description: "History Quiz API",
    endpoints: [
      "GET    /                200",
      "GET    /home            200",
      "GET    /home/:name      200",
      "POST   /register        201",
      "POST   /login           200"
    ]
  });
});

app.post('/', (req, res) => {
  res.status(405).send('Not allowed!');
});

module.exports = app;