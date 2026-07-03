import axios from "axios";

const API = axios.create({
  baseURL: "https://auditiq-p217.onrender.com",
});

export default API;