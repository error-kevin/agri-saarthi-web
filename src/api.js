import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // Change this for production
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

export default api;
