const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const boardRoutes = require("./BoardRoutes/boardRoutes");
const cardRoutes = require("./CardRoutes/cardRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(boardRoutes);
app.use(cardRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
