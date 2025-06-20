const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const boardRoutes = require("./BoardRoutes/boardRoutes"); // 👈 add this
const cardRoutes = require("./CardRoutes/cardRoutes");     // 👈 and this if needed

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// ✅ Register routes
app.use(boardRoutes);
app.use(cardRoutes);  // only if you're using card endpoints too

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
