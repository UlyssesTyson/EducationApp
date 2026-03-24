const db = require('../db/connect');

class Leaderboard {
    constructor({ id, username, score }) {
        this.id = id;
        this.username = username;
        this.score = score;
    }

    // Get all leaderboard entries
    static async getAll() {
        const response = await db.query(
            "SELECT * FROM leaderboard ORDER BY score DESC"
        );
        return response.rows.map(l => new Leaderboard(l));
    }

    // Get a single entry by ID
    static async getOneById(id) {
        const response = await db.query(
            "SELECT * FROM leaderboard WHERE id = $1",
            [id]
        );
        if (response.rows.length !== 1) {
            throw new Error("Unable to locate leaderboard entry.");
        }
        return new Leaderboard(response.rows[0]);
    }

    // Add a new leaderboard entry
    static async add(username, score) {
        const response = await db.query(
            "INSERT INTO leaderboard (username, score) VALUES ($1, $2) RETURNING *",
            [username, score]
        );
        return new Leaderboard(response.rows[0]);
    }

    // Update an existing leaderboard entry
    static async update(id, { username, score }) {
        // First, get existing entry
        const entry = await Leaderboard.getOneById(id);

        // Merge updates
        const newUsername = username || entry.username;
        const newScore = score !== undefined ? score : entry.score;

        // Update in database
        const response = await db.query(
            "UPDATE leaderboard SET username = $1, score = $2 WHERE id = $3 RETURNING *",
            [newUsername, newScore, id]
        );

        return new Leaderboard(response.rows[0]);
    }
}

module.exports = Leaderboard;