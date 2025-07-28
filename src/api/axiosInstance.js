import axios from "axios";

export const userInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1/auth/",
});

export const issueInstance = axios.create({
  baseURL: "http://localhost:3001/api/v1/issue",
})

issueInstance.interceptors.request.use(
  (config) => {
    const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
    const token = match ? match[2] : null;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
