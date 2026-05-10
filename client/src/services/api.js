import axios from "axios";

const API = axios.create({
  baseURL: "https://vipengineer.onrender.com",
});

export default API;
