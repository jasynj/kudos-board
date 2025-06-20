const express = require("express");
const { Router } = express;
const { PrismaClient } = require("@prisma/client");
const { validateCreateCard } = require("../Validation/validation.js");

const prisma = new PrismaClient();
const router = Router();

// Create a card
router.post("/api/board/card/create", validateCreateCard, async (req, res) => {
  const { title, description, gifUrl, boardId } = req.body;

  try {
    const card = await prisma.card.create({
      data: {
        title,
        description,
        gifUrl,
        boardId,
      },
    });

    res.status(201).json(card);
  } catch (error) {
    console.error("Error creating card:", error);
    res.status(500).json({ error: "Failed to create card" });
  }
});

// Delete a card
router.delete("/api/board/card/delete", async (req, res) => {
  const { id } = req.body;

  try {
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ error: "Valid card ID is required" });
    }

    const deletedCard = await prisma.card.delete({
      where: { id: parseInt(id) },
    });

    res.json(deletedCard);
  } catch (error) {
    console.error("Error deleting card:", error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: "Card not found" });
    }
    res.status(500).json({ error: "Failed to delete card" });
  }
});

// Upvote a card
router.patch("/api/board/card/upvote", async (req, res) => {
  const { id } = req.body;

  try {
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ error: "Valid card ID is required" });
    }

    const updatedCard = await prisma.card.update({
      where: { id: parseInt(id) },
      data: {
        upvote: {
          increment: 1,
        },
      },
    });

    res.json(updatedCard);
  } catch (error) {
    console.error("Error upvoting card:", error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: "Card not found" });
    }
    res.status(500).json({ error: "Failed to upvote card" });
  }
});

module.exports = router;
