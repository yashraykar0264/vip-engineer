import axios from "axios";

const API = axios.create({
  baseURL: "https://vip-engineer.onrender.com",
});

export default API;
