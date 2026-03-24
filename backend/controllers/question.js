const Question = require('../models/Question');

const index = async (req, res) => {
  try {
    const questionData = await Question.getAll()
    res.status(200).json(questionData)
  } catch (err) {
    res.status(500).json({error: err.message})
  }
}

const show = async (req, res) => {
  try {
    const category = req.params.category
    const selectedQuestion = await Question.getByCategoryWithAnswers(category)
    res.status(200).json(selectedQuestion)
  } catch (err) {
    res.status(404).json({error: err.message})
  }
}

module.exports = { index, show }