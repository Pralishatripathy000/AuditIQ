import axios from "axios";

const API = axios.create({
  baseURL: "https://auditiq-p2l7.onrender.com",
});

export default API;