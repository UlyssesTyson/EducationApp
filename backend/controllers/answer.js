const Answer = require('../models/Answer');

const index = async (req, res) => {
  try {
    const questionData = await Answer.getAll()
    res.status(200).send({ data: questionData })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

const show = async (req, res) => {
  try {
    const QN = parseInt(req.params.QN)
    const selectedAnswer = await Answer.getAnswerByQN(QN)
    res.status(200).send({ data: selectedAnswer })
  } catch (error) {
    res.status(404).send({ error: error.message })
  }
}

module.exports = { index, show }