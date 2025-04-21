import axios from "axios";

const instance = axios.create({
  baseURL: "https://bookcelebrity-server.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
