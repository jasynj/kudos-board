const validateCreateBoard = (req, res, next) => {
    const { body : { title, category, author } } = req
    if (!title || !category) return res.status(400).json({ error: 'Title and Category are required fields' })
    next()
}

const validateId = (req, res, next) => {
    const { body : { id } } = req
    const parsedId = parseInt(id)
    if (!isNaN(parsedId)) return next()
    return res.status(400).json({ error: 'Id must be a number' })
}

const validateCreateCard = (req, res, next) => {
    const { body : { title, description, gifUrl, boardId}} = req
    if (!title || !description || !gifUrl || isNaN(parseFloat(boardId)) ) return res.status(400).json({ error: 'Title, Description and GifUrl are required fields' })
    next()
}

module.exports = {
    validateCreateBoard,
    validateId,
    validateCreateCard
}
