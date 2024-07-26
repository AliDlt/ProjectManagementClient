import http from "./http";

export const verify = async (data) => {
  const response = await http.post("/otp/verify", data, {
    withCredentials: false,
  });
  return response;
};

export const sendOtpCode = async (data) => {
  const resp = await http.post("/otp/send", data, { withCredentials: false });
  return resp;
};
