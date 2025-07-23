import {userInstance} from "./axiosInstance.js";

const createAdminUser = async (adminData) => {
  const response = await userInstance.post('/create-admin', adminData);
  return response.data;
}

export {createAdminUser}