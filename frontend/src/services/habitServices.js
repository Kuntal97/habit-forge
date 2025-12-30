import axios from "axios";

const API_URL = "http://localhost:3000/api/habits";

const getAuthHeader = () => {
	const token = localStorage.getItem("token");
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
};

export const getHabits = () => {
	return axios.get(API_URL, getAuthHeader());
};

export const createHabit = (data) => {
	return axios.post(API_URL, data, getAuthHeader());
};

export const deleteHabit = (id) => {
	return axios.delete(`${API_URL}/${id}`, getAuthHeader());
};

export const markHabitComplete = (id) => {
	return axios.post(`${API_URL}/${id}/complete`, {}, getAuthHeader());
};
