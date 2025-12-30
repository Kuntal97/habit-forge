import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Signup() {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		try {
			await axios.post("http://localhost:3000/api/auth/signup", {
				name,
				email,
				password,
			});

			navigate("/login");
		} catch (err) {
			setError(err.response?.data?.message || "Signup failed");
		}
	};

	return (
		<div style={styles.container}>
			<form onSubmit={handleSubmit} style={styles.card}>
				<h2 style={styles.title}>Create Account 🚀</h2>
				<p style={styles.subtitle}>Start building better habits</p>

				{error && <p style={styles.error}>{error}</p>}

				<input
					type="text"
					placeholder="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					style={styles.input}
					required
				/>

				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					style={styles.input}
					required
				/>

				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					style={styles.input}
					required
				/>

				<button type="submit" style={styles.button}>
					Sign Up
				</button>

				<p style={styles.footerText}>
					Already have an account?{" "}
					<Link to="/login" style={styles.link}>
						Login
					</Link>
				</p>
			</form>
		</div>
	);
}

const styles = {
	container: {
		minHeight: "100vh",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		background: "#f5f7fb",
	},
	card: {
		width: "100%",
		maxWidth: "400px",
		background: "#fff",
		padding: "30px",
		borderRadius: "10px",
		boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
	},
	title: {
		marginBottom: "5px",
		textAlign: "center",
	},
	subtitle: {
		marginBottom: "20px",
		textAlign: "center",
		color: "#666",
	},
	input: {
		width: "100%",
		padding: "12px",
		marginBottom: "15px",
		borderRadius: "6px",
		border: "1px solid #ddd",
		fontSize: "14px",
	},
	button: {
		width: "100%",
		padding: "12px",
		background: "#4f46e5",
		color: "#fff",
		border: "none",
		borderRadius: "6px",
		fontSize: "16px",
		cursor: "pointer",
	},
	error: {
		color: "red",
		fontSize: "14px",
		marginBottom: "10px",
		textAlign: "center",
	},
	footerText: {
		marginTop: "15px",
		textAlign: "center",
		fontSize: "14px",
	},
	link: {
		color: "#4f46e5",
		textDecoration: "none",
		fontWeight: "500",
	},
};
