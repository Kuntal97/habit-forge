import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (!token) {
			navigate("/login");
		}
	}, [navigate]);

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<div style={{ padding: "20px" }}>
			<h1>Welcome to your Dashboard</h1>
			<p>You are successfully logged in!</p>

			<button onClick={handleLogout}>Logout</button>
		</div>
	);
}
