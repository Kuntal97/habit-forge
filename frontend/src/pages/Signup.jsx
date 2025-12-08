import { useState } from "react";
import axios from "axios";

export default function Signup() {
	const [data, setData] = useState({
		name: "",
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
				"http://localhost:3000/api/auth/signup",
				data
			);
			alert(res.data.message);
			setData({ name: "", email: "", password: "" });
		} catch (error) {
			alert(error.response?.data?.message || "Signup failed");
		}
	};

	return (
		<div>
			<h2>Signup</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="name"
					placeholder="Name"
					value={data.name}
					onChange={handleChange}
					required
				/>
				<br />
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
				<button type="submit">Signup</button>
			</form>
		</div>
	);
}
