import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../services/authService";

export default function Login() {
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoggedIn()) {
			navigate("/dashboard");
		}
	}, []);

	const [data, setData] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(
				"http://localhost:3000/api/auth/signin",
				data
			);
			// Store JWT in localStorage
			localStorage.setItem("token", res.data.token);

			alert(res.data.message);

			navigate("/dashboard");

			setData({ email: "", password: "" });
		} catch (err) {
			console.error("Login error:", err);
			alert("Invalid credentials.");
		}
	};

	return (
		<div style={{ maxWidth: "400px", margin: "40px auto" }}>
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="email"
					name="email"
					placeholder="Email"
					value={data.email}
					onChange={handleChange}
					required
				/>
				<br />
				<input
					type="password"
					name="password"
					placeholder="Password"
					value={data.password}
					onChange={handleChange}
					required
				/>
				<br />
				<button type="submit">Login</button>
			</form>
		</div>
	);
}
