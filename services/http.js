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
    const expectedError =
      error.response && error.response >= 400 && error.response < 500;

    if (!expectedError) {
      toast.error("خطایی در ارتباط با سرور به وجود آمد.", {
        position: "left-bottom",
      });
    }

    if (error.response && error.response.status === 500) {
      toast.error("مشکلی در سرور بوجود آمده", {
        position: "left-bottom",
      });
      // throw new Error()
    }

    return Promise.reject(error);
  },
);
