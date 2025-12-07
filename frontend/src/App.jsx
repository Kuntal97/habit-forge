import { useState, useEffect } from "react";

function App() {
	const [message, setMessage] = useState("");

	useEffect(() => {
		fetch("http://localhost:3000")
			.then((res) => res.text())
			.then((data) => setMessage(data));
	}, []);

	return (
		<>
			<div>
				<h1>HabitForge Client</h1>
				<p>Backend says: {message}</p>
			</div>
		</>
	);
}

export default App;
