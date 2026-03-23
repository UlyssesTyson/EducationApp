const db = require('../db/connect');

class Answer {
    constructor({ id, question_number, option_text, correct }) {
        this.id = id;
        this.question_number = question_number;
        this.option_text = option_text;
        this.correct = correct;
    }
}

module.exports = Answer;