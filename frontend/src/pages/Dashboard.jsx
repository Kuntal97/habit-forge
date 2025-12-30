import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	createHabit,
	deleteHabit,
	getHabits,
	markHabitComplete,
} from "../services/habitServices";
import "../styles/dashboard.css";

export default function Dashboard() {
	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [habits, setHabits] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		if (!localStorage.getItem("token")) {
			navigate("/login");
		}
		fetchHabits();
	}, []);

	const fetchHabits = async () => {
		try {
			const res = await getHabits();
			setHabits(res.data.habits);
		} catch (err) {
			console.error(err);
		}
	};

	const handleCreate = async (e) => {
		e.preventDefault();
		if (!title.trim()) return;

		await createHabit({ title });
		setTitle("");
		fetchHabits();
	};

	const handleComplete = async (id) => {
		try {
			await markHabitComplete(id);
			fetchHabits();
		} catch (err) {
			setError(err.response?.data?.message || "Error");
		}
	};

	const isCompletedToday = (habit) => {
		const today = new Date().toDateString();
		return habit.progress.some(
			(p) => new Date(p.date).toDateString() === today
		);
	};

	const handleDelete = async (id) => {
		await deleteHabit(id);
		fetchHabits();
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<div className="dashboard">
			<header className="dashboard-header">
				<h1>HabitForge</h1>
				<button className="logout-btn" onClick={handleLogout}>
					Logout
				</button>
			</header>

			<form className="habit-form" onSubmit={handleCreate}>
				<input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Add a new habit..."
				/>
				<button>Add</button>
			</form>

			{error && <p className="error">{error}</p>}

			<div className="habit-list">
				{habits.map((habit) => (
					<div className="habit-card" key={habit._id}>
						<span>{habit.title}</span>
						<div className="actions">
							<button
								disabled={isCompletedToday(habit)}
								onClick={() => handleComplete(habit._id)}>
								{" "}
								✔{" "}
							</button>
							<button onClick={() => handleDelete(habit._id)}>🗑</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
