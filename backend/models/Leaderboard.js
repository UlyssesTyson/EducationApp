const db = require('../db/connect');

class Leaderboard {
    constructor({ id, username, score }) {
        this.id = id;
        this.username = username;
        this.score = score;
    }

    static async getAll() {
        const response = await db.query(
            "SELECT * FROM leaderboard ORDER BY score DESC");
        return response.rows.map(l => new Leaderboard(l));
    }

    static async getOneById(id) {
        const response = await db.query(
            "SELECT * FROM leaderboard WHERE id = $1",[id]);
        if (response.rows.length !== 1) {
            throw new Error("Unable to locate leaderboard entry.");
        }
        return new Leaderboard(response.rows[0]);
    }

    // Add a new score
    static async add(username, score) {
        const response = await db.query(
            "INSERT INTO leaderboard (username, score) VALUES ($1, $2) RETURNING *",[username, score]);
        return new Leaderboard(response.rows[0]);
    }
}

module.exports = Leaderboard;