import axios from "axios";

export const userInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1/",
  withCredentials: true,
});

export const issueInstance = axios.create({
  baseURL: "http://localhost:3001/api/v1/",
  withCredentials: true,
})

