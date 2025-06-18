const express = require("express")
const { Router } = express
const { PrismaClient } = require("@prisma/client")
const { validateCreateCard} = require("../Validation/validation.js")

const prisma = new PrismaClient()
const router = Router()

// create a card
router.post("/api/board/card/create", validateCreateCard, async (req, res) => {
    const { body : { title, description, gifUrl, boardId } } = req
    
})
