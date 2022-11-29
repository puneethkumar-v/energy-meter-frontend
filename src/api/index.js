import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_API });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const logIn = (formData) => API.post("/auth/login", formData);
export const adminRegister = (formData) =>
  API.post("/auth/register-admin", formData);
export const customerRegister = (formData) =>
  API.post("auth/register-customer", formData);
