import http from "./http";

export const getReports = async (count = "") => {
  const res = await http.get(
    `/report/getAllReportsSearchByUserId?count=${count}`,
  );

  return res.data;
};
