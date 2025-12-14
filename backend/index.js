const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const habitRoutes = require("./routes/habitRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);

app.get("/", (req, res) => {
	res.send("HabitForge Backend Running...");
});

app.listen(process.env.PORT, () => {
	console.log(`Server is running on PORT ${process.env.PORT}`);
});
