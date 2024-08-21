import http from "./http";

// Check Sign Up
export const checkSignup = async (userData) => {
  const res = await http.post("/auth/checkRegister", userData, {
    withCredentials: false,
  });
  return res.data;
};

// Sign Up
export const signup = async (userData) => {
  const res = await http.post("/auth/register", userData, {
    withCredentials: false,
  });
  return res.data;
};

export const login = async (data) => {
  const response = await http.post("/auth/login", data);

  return response.data;
};

export const otpVerify = async (data) => {
  const res = await http.post("/otp/verify", data, {
    withCredentials: false,
  });
  return res.data;
};

// Send OTP Code
export const sendOtpCode = async (phoneNumber) => {
  const res = await http.post(
    "/otp/send",
    { phoneNumber },
    {
      withCredentials: false,
    },
  );
  return res.data;
};

export const resetPassword = async (data) => {
  const res = await http.post(`/auth/changePassword`, data, {
    withCredentials: false,
  });
  return res;
};

// Get User
export const getUser = async () => {
  const res = await http.get("/user/getUserByToken");
  return res.data.data;
};

export async function logoutAccount() {
  const res = await http.post("auth/logout");
  return res.data;
}
