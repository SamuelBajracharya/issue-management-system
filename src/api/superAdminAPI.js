import {generalInstance, profileInstance} from "./axiosInstance.js";

const createAdminUser = async (adminData) => {
  const response = await profileInstance.post('/create-admin', adminData);
  return response.data;
}

const getAllAdmin = async () => {
  const response = await profileInstance.get('/get-all-admins');
  return response.data;
}

const editAdmin = async (adminData) => {
  const response = await profileInstance.post('/change-admin-password', adminData);
  return response.data;
}

const deleteAdmin = async (id) => {
  const response = await profileInstance.delete(`/delete-admin/${id}`);
  return response.data;
}

const getAuditLog = async () => {
  const response = await generalInstance.get('/logs/getAll');
  return response.data;
}
export {createAdminUser, getAllAdmin, editAdmin, deleteAdmin, getAuditLog}