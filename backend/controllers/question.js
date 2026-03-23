const Question = require('../models/Question');

const index = async (req, res) => {
  try {
    const questionData = await Question.getAll()
    res.status(200).send({ data: questionData })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

const show = async (req, res) => {
  try {
    const QN = parseInt(req.params.QN)
    const selectedQuestion = await Question.getQuestionByQN(QN)
    res.status(200).send({ data: selectedQuestion })
  } catch (error) {
    res.status(404).send({ error: error.message })
  }
}

module.exports = { index, show }