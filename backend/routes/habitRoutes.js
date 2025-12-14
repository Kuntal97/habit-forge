const express = require("express");
const {
	createHabits,
	getHabits,
	updateHabit,
	deleteHabit,
	markHabitComplete,
} = require("../controllers/habitController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.use(authMiddleware);

router.post("/", createHabits);

router.get("/", getHabits);

router.put("/:id", updateHabit);

router.delete("/:id", deleteHabit);

router.post("/:id/complete", markHabitComplete);

module.exports = router;
