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


export async function sendCode({phonenumber}) {
  try {
    const response = await sendOtpCode({ phonenumber: phonenumber });
    return response
  } catch (error) {
    console.log(error);
  }
}
