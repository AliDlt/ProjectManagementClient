import http from "./http";

export const uploadFile = async (data) => {
  console.log(data);
  const resp = await http.post("/files/uploadFile", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(resp)
  return resp;
};
