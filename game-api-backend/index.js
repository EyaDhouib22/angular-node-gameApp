const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db.config");
const gameRoutes = require("./routes/game.routes");

const app = express();
app.use(cors());
app.use(express.json());

connectDB(); 
app.use("/api/games", gameRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
