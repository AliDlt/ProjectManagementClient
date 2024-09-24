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

const httpCode = [403, 401, 404, 400];

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const expectedError =
      error.response && !httpCode.includes(error.response.status);

    if (expectedError) {
      toast.error("خطایی در ارتباط با سرور به وجود آمد.", {
        position: "left-bottom",
      });
    } else {
      if (error.response.data.errors?.length > 0) {
        toast.error(error?.response?.data?.errors[0], {
          position: "left-bottom",
        });
        return Promise.reject(error);
      }
      if (error.response.data.message) {
        toast.error(error?.response?.data?.message, {
          position: "left-bottom",
        });
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
