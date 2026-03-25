const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const path = require('path');

const { questionRouter, leaderboardRouter, authRouter } = require('./routers/histories');

const app = express();

app.use(express.json());
if (process.env.NODE_ENV !== "test") app.use(logger('dev'));
app.use(cors());

// Serve static frontend files FIRST
app.use(express.static(path.join(__dirname, '../frontend')));

// existing routes
app.use('/', authRouter);
app.use('/questions', questionRouter);
app.use('/leaderboard', leaderboardRouter);

// Serve index.html on root

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/index.html'));
});

//Optional: block POST to root

app.post('/', (req, res) => {
  res.status(405).send('Not allowed!');
});

module.exports = app;