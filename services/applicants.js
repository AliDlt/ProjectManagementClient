import http from "./http";

// Add Category
export const addCategory = async (categoryData) => {
  const res = await http.post("/category", categoryData);
  return res.data;
};

// Get All Categories
export const getAllCategories = async (search, count, page) => {
  const res = await http.get(
    `/category?search=${search}&count=${count}&page=${page}`,
  );
  return res.data;
};

// Get Category by ID
export const getCategoryById = async (id) => {
  const res = await http.get(`/category/${id}`);
  return res.data;
};

// Update Category
export const updateCategory = async ({ id, categoryData }) => {
  const res = await http.put(`/category/${id}`, categoryData);
  return res.data;
};

// Delete Category
export const deleteCategory = async (id) => {
  const res = await http.delete(`/category/${id}`);
  return res.data;
};

// Add Applicant
export const addApplicant = async (applicantData) => {
  const res = await http.post("/applicant", applicantData);
  return res.data;
};

// Get All Applicants
export const getAllApplicants = async () => {
  const res = await http.get("/applicant");
  return res.data;
};

// Get Applicant by ID
export const getApplicantById = async (id) => {
  const res = await http.get(`/applicant/${id}`);
  return res.data;
};

// Update Applicant
export const updateApplicant = async (id, applicantData) => {
  const res = await http.put(`/applicant/${id}`, applicantData);
  return res.data;
};

// Delete Applicant
export const deleteApplicant = async (id) => {
  const res = await http.delete(`/applicant/${id}`);
  return res.data;
};
