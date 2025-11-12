import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/LibraryManagement/api",
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      !error.config.url.includes("login") &&
      !error.config.url.includes("register")
    ) {
      alert("Session expired! Please log in again.");
      localStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default API;
