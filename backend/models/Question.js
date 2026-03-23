const db = require('../db/connect');

class Question {
    constructor({ id, question_number, question_text, category, points }) {
        this.id = id;
        this.question_number = question_number;
        this.question_text = question_text;
        this.category = category;
        this.points = points;
    }
}

module.exports = Question;