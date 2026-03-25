const db = require('../db/connect');

class Question {
    constructor({ id, question_number, question_text, category, points, answers }) {
        this.id = id;
        this.question_number = question_number;
        this.question_text = question_text;
        this.category = category;
        this.points = points;
        this.answers = answers || [];
    }

    static async getAll() {
    const response = await db.query("SELECT * FROM question");
    if (response.rows.length === 0) {
      throw new Error("No questions available.")
    }
    return response.rows.map(q => new Question(q));
    }

    static async getByCategoryWithAnswers(category) {
        const result = await db.query(`
            SELECT 
                q.id,
                q.question_number,
                q.question_text,
                q.category,
                q.points,
                a.id AS answer_id,
                a.option_text,
                a.correct
            FROM question q
            LEFT JOIN answer a
            ON q.question_number = a.question_number
            WHERE q.category = $1
            ORDER BY q.question_number;
        `, [category]);

        const questionsMap = {};

        result.rows.forEach(row => {
            if (!questionsMap[row.id]) {
                questionsMap[row.id] = new Question({
                    id: row.id,
                    question_number: row.question_number,
                    question_text: row.question_text,
                    category: row.category,
                    points: row.points,
                    answers: []
                });
            }
            if (row.answer_id) {
                questionsMap[row.id].answers.push({
                    id: row.answer_id,
                    option_text: row.option_text,
                    correct: row.correct
                });
            }
        });

        return Object.values(questionsMap);
    }
}

module.exports = Question;