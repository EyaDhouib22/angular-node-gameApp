const express = require("express");
const router = express.Router();
const Game = require("../models/game.model"); 

router.get("/", async (req, res) => {
  try {
    const { search, type } = req.query; 
    let query = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    if (type) {
      query.type = type; 
    }
    const games = await Game.find(query);
    res.json(games);
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).json({ message: "Error fetching games", error: error.message });
  }
});

// Add a game
router.post("/", async (req, res) => {
  try {
    const game = new Game(req.body);
    const saved = await game.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error adding game:", error);
    res.status(400).json({ message: "Error adding game", error: error.message });
  }
});

// Get a specific game by ID
router.get("/:id", async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.json(game);
  } catch (error) {
    console.error("Error fetching game by ID:", error);
    if (error.kind === 'ObjectId') {
        return res.status(400).json({ message: "Invalid game ID format" });
    }
    res.status(500).json({ message: "Error fetching game", error: error.message });
  }
});


// Update a game
router.put("/:id", async (req, res) => {
  try {
    const updated = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) {
      return res.status(404).json({ message: "Game not found for update" });
    }
    res.json(updated);
  } catch (error) {
    console.error("Error updating game:", error);
    res.status(400).json({ message: "Error updating game", error: error.message });
  }
});

// Delete a game
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Game.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Game not found for deletion" });
    }
    res.sendStatus(204); 
  } catch (error) {
    console.error("Error deleting game:", error);
    res.status(500).json({ message: "Error deleting game", error: error.message });
  }
});

module.exports = router;