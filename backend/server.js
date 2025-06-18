const express = require("express")
const { json } = express
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(json())
app.use(cors())

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
