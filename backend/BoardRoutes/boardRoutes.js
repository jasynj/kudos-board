const express = require('express')
const { Router } = express
const { PrismaClient } = require("@prisma/client")
const { validateCreateBoard, validateId } = require("../Validation/validation.js")

const router = Router()
const prisma = new PrismaClient()

// create a board
router.post("/api/board/create", validateCreateBoard, async (req, res) => {
    const { body : { title, category, author} } = req
    const image = "https://picsum.photos/200/300"

    const board = await prisma.board.create({
        data : {
            title : title,
            category : category,
            author : author ? author : "",
            image : image,
            cards : []
        }
    })
i
})

// view a board
router.get("/api/board/view", validateId, async (req, res) => {
    const { body : { id } } = req
    const board = await prisma.board.findFirst({
        where : {
            id : id
        },
        include : {
            cards : true
        }
    })
    res.json(board)
})

// view all boards
router.get("/api/board/all", async (req, res) => {
    const boards = await prisma.board.findMany({
        include : {
            cards : true
        }
    })
    res.json(boards)
})

// delete a board
router.delete("/api/board/delete", validateId, async (req, res) => {
    const { body : { id } } = req
    const board = await prisma.board.delete({
        where : {
            id : id
        }
    })
    res.json(board)
})
