import http from "./http";

// Add Category
export const addCategory = async (categoryData) => {
    const res = await http.post("/api/category", categoryData, {
        withCredentials: false,
    });
    return res.data;
};

// Get All Categories
export const getAllCategories = async () => {
    const res = await http.get("/api/category", {
        withCredentials: false,
    });
    return res.data;
};

// Get Category by ID
export const getCategoryById = async (id) => {
    const res = await http.get(`/api/category/${id}`, {
        withCredentials: false,
    });
    return res.data;
};

// Update Category
export const updateCategory = async (id, categoryData) => {
    const res = await http.put(`/api/category/${id}`, categoryData, {
        withCredentials: false,
    });
    return res.data;
};

// Delete Category
export const deleteCategory = async (id) => {
    const res = await http.delete(`/api/category/${id}`, {
        withCredentials: false,
    });
    return res.data;
};

// Add Applicant
export const addApplicant = async (applicantData) => {
    const res = await http.post("/api/applicant", applicantData, {
        withCredentials: false,
    });
    return res.data;
};

// Get All Applicants
export const getAllApplicants = async () => {
    const res = await http.get("/api/applicant", {
        withCredentials: false,
    });
    return res.data;
};

// Get Applicant by ID
export const getApplicantById = async (id) => {
    const res = await http.get(`/api/applicant/${id}`, {
        withCredentials: false,
    });
    return res.data;
};

// Update Applicant
export const updateApplicant = async (id, applicantData) => {
    const res = await http.put(`/api/applicant/${id}`, applicantData, {
        withCredentials: false,
    });
    return res.data;
};

// Delete Applicant
export const deleteApplicant = async (id) => {
    const res = await http.delete(`/api/applicant/${id}`, {
        withCredentials: false,
    });
    return res.data;
};
