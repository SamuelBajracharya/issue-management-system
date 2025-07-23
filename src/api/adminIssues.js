import {issueInstance} from "./axiosInstance.js";


const fetchAllIssues = async () => {
  const response = await issueInstance.get('/all-issue');
}

const fetchAdminIssues = async () => {
  const response = await issueInstance.get('/get-issue');
  return response.data;
}

const fetchAdminIssueById = async (id) => {
  const response = await issueInstance.get(`/get-issue/${id}`);
  return response.data
}

const assignIssue = async (id, assignValue) => {
  const response = await issueInstance.patch(`/assign-issue/${id}`, assignValue);
  return response.data;
}

const resolveIssue = async (id, resolveValue) => {
  const response = await issueInstance.patch(`/resolve-issue/${id}`, resolveValue);
  return response.data;
}

const createSubtask = async (issueId, subtaskData) => {
  const response = await issueInstance.post(`/create-subtask/${issueId}`, subtaskData);
  return response.data;
}

const completeSubtask = async (subtaskId, subtaskData) => {
  const response = await issueInstance.patch(`/complete-subtask/${subtaskId}`, subtaskData);
  return response.data;
}
