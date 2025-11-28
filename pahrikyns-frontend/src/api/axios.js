import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000"
  // <---- IMPORTANT
});

export default API;
