const db = require('../db/connect');

class Answer {
    constructor({ id, question_number, option_text, correct }) {
        this.id = id;
        this.question_number = question_number;
        this.option_text = option_text;
        this.correct = correct;
    }

    static async getAll() {
    const response = await db.query("SELECT * FROM answer");
    if (response.rows.length === 0) {
      throw new Error("No questions available.")
    }
    return response.rows.map(q => new Question(q));
    }

    // Get all answers for a specific question
    static async getByQuestionNumber(question_number) {
        const response = await db.query("SELECT * FROM answer WHERE question_number = $1",[question_number]);
        return response.rows.map(a => new Answer(a));
    }
}

module.exports = Answer;