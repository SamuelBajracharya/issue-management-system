import axios from "axios";

export const userInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1/auth/",
});

export const issueInstance = axios.create({
  baseURL: "http://localhost:3001/api/v1/issue",
})

issueInstance.interceptors.request.use(
  (config) => {
    const match = document.cookie.match(new RegExp('(^| )accessToken=([^;]+)'));
    const accessToken = match ? match[2] : null;

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

