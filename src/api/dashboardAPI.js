import {issueInstance} from "./axiosInstance.js";

const dashboardAPI = async () => {
  const response = await issueInstance.get('/dashboard-issues');
  return response.data;
}

export {dashboardAPI}