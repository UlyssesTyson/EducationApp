const Leaderboard = require("../models/Leaderboard");

// GET get all leaderboard entries
async function index(req, res) {
  try {
    const leaderboard = await Leaderboard.getAll();
    res.status(200).json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET  get a single leaderboard entry
async function show(req, res) {
  try {
    const id = parseInt(req.params.id);
    const entry = await Leaderboard.getOneById(id);
    res.status(200).json(entry);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

// POST create a new leaderboard entry
async function create(req, res) {
  try {
    const { username, score } = req.body;

    if (!username || score === undefined) {
      return res.status(400).json({ error: "Username and score are required" });
    }

    const newEntry = await Leaderboard.add(username, score);
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// PATCH update leaderboard entry
async function update(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { username, score } = req.body;

    if (!username && score === undefined) {
      return res.status(400).json({ error: "Provide a username or score to update" });
    }

    // Use the model's static update method
    const updated = await Leaderboard.update(id, { username, score });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  index,
  show,
  create,
  update
};