const db = require('../db/connect');

class Answer {
  constructor(data) {
    this.QN = data.QN
    this.text = data.text
  }

  // get all answers
  static async getAll() {
    return [
      { QN: 1, text: 'Answer 1' },
      { QN: 2, text: 'Answer 2' }
    ]
  }

  // get answer by Question (QN)
  static async getAnswerByQN(QN) {
    const allAnswers = await this.getAll()
    const found = allAnswers.find(a => a.QN === Number(QN))
    if (!found) throw new Error('Not found')
    return found
  }
}

module.exports = Answer