const Answer = require('../models/Answer');

const index = async (req, res) => {
  try {
    const questionData = await Answer.getAll()
    res.status(200).json(questionData)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const show = async (req, res) => {
  try {
    const QN = parseInt(req.params.QN)
    const selectedAnswer = await Answer.getAnswerByQN(QN)
    res.status(200).json(selectedAnswer)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

module.exports = { index, show }