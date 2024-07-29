import http from "./http";

// Sign Up
export const signup = async (userData) => {
  const res = await http.post("/auth/register", userData, {
    withCredentials: false,
  });
  return res.data;
};

export const login = async (data) => {
  const response = await http.post("/auth/login", data);
  return response.data
};


export const otpVerify = async (data) => {
  const res = await http.post("/otp/verify", data, {
    withCredentials: false,
  });
  return res.data;
};

// Resend OTP Code
export const resendOtpCode = async (phoneNumber) => {
  console.log(phoneNumber)
  const res = await http.post(
    "/otp/send",
    { phoneNumber },
    {
      withCredentials: false,
    },
  );
  return res.data;}