const Question = require('../models/Question');

const index = async (req, res) => {
  try {
    const questionData = await Question.getAll()
    res.status(200).json(questionData)
  } catch (error) {
    res.status(500).json({error: err.message})
  }
}

const show = async (req, res) => {
  try {
    const QN = parseInt(req.params.QN)
    const selectedQuestion = await Question.getQuestionByQN(QN)
    res.status(200).json(selectedQuestion)
  } catch (error) {
    res.status(404).json({error: err.message})
  }
}

module.exports = { index, show }