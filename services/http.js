import axios from "axios";
import toast from "react-hot-toast";

const http = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default http;

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 500)
      return toast.error("مشکلی در سرور بوجود آمده", {
        position: "left-bottom",
      });

    return Promise.reject(error);
  },
);
