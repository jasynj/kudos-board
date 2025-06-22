const express = require('express');
const { Router } = express;
const { PrismaClient } = require("@prisma/client");
const { validateCreateBoard, validateId } = require("../Validation/validation.js");

const router = Router();
const prisma = new PrismaClient();

// Create a board
router.post("/api/board/create", validateCreateBoard, async (req, res) => {
    try {
        const { title, category, author } = req.body;
        const image = "https://picsum.photos/200/300";

        const board = await prisma.board.create({
            data: {
                title,
                category,
                author : author ?? "",
                image,
            },
        });

        res.status(201).json(board);
    } catch (err) {
        console.error("Error creating board:", err);
        res.status(500).json({ error: "Failed to create board." });
    }
});

// View a board by ID
router.get("/api/board/view", async (req, res) => {
    try {
        const id = parseInt(req.query.id);

        if (!id || isNaN(id)) {
            return res.status(400).json({ error: "Valid board ID is required" });
        }

        const board = await prisma.board.findFirst({
            where: { id },
            include: { cards: true },
        });

        if (!board) {
            return res.status(404).json({ error: "Board not found" });
        }

        res.json(board);
    } catch (err) {
        console.error("Error viewing board:", err);
        res.status(500).json({ error: "Failed to retrieve board." });
    }
});

// View all boards
router.get("/api/board/all", async (req, res) => {
    try {
        const boards = await prisma.board.findMany({
            include: { cards: true },
        });

        res.json(boards);
    } catch (err) {
        console.error("Error fetching boards:", err);
        res.status(500).json({ error: "Failed to retrieve boards." });
    }
});

// Delete a board
router.delete("/api/board/delete", validateId, async (req, res) => {
    try {
        const { id } = req.body;

        await prisma.card.deleteMany({
            where: { boardId: id },
        });

        const deletedBoard = await prisma.board.delete({
            where: { id },
        });

        res.json(deletedBoard);
    } catch (err) {
        console.error("Error deleting board:", err);
        res.status(500).json({ error: "Failed to delete board." });
    }
});

module.exports = router;
