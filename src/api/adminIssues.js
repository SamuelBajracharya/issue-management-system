import {issueInstance} from "./axiosInstance.js";


const fetchAllIssues = async ({limit, page}) => {
  const response = await issueInstance.get(`/all-issues`, {
    params: {limit, page}
  });
  return response.data;
}

const fetchAdminIssues = async () => {
  const response = await issueInstance.get('/get-issue');
  return response.data;
}

const fetchAdminIssueById = async (id) => {
  const response = await issueInstance.get(`/get-issue/${id}`);
  return response.data
}

const assignIssue = async ({issueId}) => {
  const response = await issueInstance.post(`/assign-issue/${issueId}`);
  return response.data;
}

const resolveIssue = async ({id, resolveValue}) => {
  const response = await issueInstance.patch(`/resolve-issue/${id}`, resolveValue);
  return response.data;
}

const updatePriority = async ({id, data}) => {
  const response = await issueInstance.patch(`/update-issue-priority-impact/${id}`, data);
  return response.data;
}
const createSubtask = async ({issueId, subtaskData}) => {
  const response = await issueInstance.post(`/create-subtask/${issueId}`, subtaskData);
  return response.data;
}

const completeSubtask = async ({issueId, subtaskId}) => {
  const response = await issueInstance.patch(`/complete-subtask/${issueId}/${subtaskId}`);
  return response.data;
}

export {
  fetchAllIssues,
  fetchAdminIssues,
  fetchAdminIssueById,
  assignIssue,
  resolveIssue,
  updatePriority,
  createSubtask,
  completeSubtask
}
