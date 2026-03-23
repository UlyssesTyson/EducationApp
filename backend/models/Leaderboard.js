const db = require('../db/connect');

class Leaderboard {
    constructor({ id, username, score }) {
        this.id = id;
        this.username = username;
        this.score = score;
    }
}

module.exports = Leaderboard;