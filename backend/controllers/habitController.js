const Habit = require("../models/Habit");

exports.createHabits = async (req, res) => {
	try {
		const { title, description } = req.body;

		if (!title) {
			return res.status(400).json({
				message: "Title is required",
			});
		}

		const newHabit = await Habit.create({
			title,
			description: description || "",
			user: req.user.id,
		});

		res.status(201).json({
			message: "Habit created successfully",
			habit: newHabit,
		});
	} catch (error) {
		console.error("Create Habit error:", error);
		res.status(500).json({
			message: "Server error",
		});
	}
};

exports.getHabits = async (req, res) => {
	try {
		const habits = await Habit.find({ user: req.user.id });

		res.status(200).json({
			success: true,
			habits,
		});
	} catch (error) {
		console.error("Error displaying habits:", error);
		res.status(500).json({
			success: false,
			message: "Server error",
		});
	}
};

exports.updateHabit = async (req, res) => {
	try {
		const habitId = req.params.id;
		const userId = req.user.id;

		const { title, description, frequency } = req.body;

		const habit = await Habit.findOne({ _id: habitId, user: userId });

		if (!habit) {
			return res.status(404).json({ message: "Habit not found" });
		}

		if (title) habit.title = title;
		if (description) habit.description = description;
		if (frequency) habit.frequency = frequency;

		await habit.save();

		res.status(200).json({
			message: "Habit updated successfully",
			habit,
		});
	} catch (error) {
		console.error("Error updating habit:", error);
		res.status(500).json({
			message: "Server error",
		});
	}
};

exports.deleteHabit = async (req, res) => {
	try {
		const userId = req.user.id;
		const habitId = req.params.id;

		const habit = await Habit.findOne({ _id: habitId, user: userId });

		if (!habit) {
			return res.status(404).json({
				message: "Habit not found",
			});
		}

		if (habit.user.toString() !== userId) {
			return res.status(403).json({
				message: "Not authorized",
			});
		}

		await Habit.findByIdAndDelete(habitId);

		res.status(200).json({
			message: "Habit deleted successfully",
		});
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}
};

exports.markHabitComplete = async (req, res) => {
	try {
		const habitId = req.params.id;
		const userId = req.user.id;

		// 1. Find the habit
		const habit = await Habit.findById(habitId);

		if (!habit) {
			return res.status(404).json({ message: "Habit not found" });
		}

		// 2. Check if the logged-in user owns this habit
		if (habit.user.toString() !== userId) {
			return res.status(403).json({ message: "Not authorized" });
		}

		// 3. Today's date without time (to avoid duplicate)
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		// 4. Check if already marked
		const alreadyMarked = habit.progress.find(
			(p) => p.date.toDateString() === today.toDateString()
		);

		if (alreadyMarked) {
			return res
				.status(400)
				.json({ message: "Habit already marked for today" });
		}

		// 5. Push today’s completion
		habit.progress.push({
			date: today,
			completed: true,
		});

		await habit.save();

		res.status(200).json({ message: "Habit marked completed", habit });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Server error", error: error.message || error });
	}
};
