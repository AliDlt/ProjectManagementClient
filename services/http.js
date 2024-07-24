import axios from "axios";

const http = axios.create({
  baseURL: "https://projectmanagment.liara.run/api",
  withCredentials: true,
});

export default http;
