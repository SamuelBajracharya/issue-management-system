import {issueInstance} from "./axiosInstance.js";

const fetchUserIssues = async () => {
  const response = await issueInstance.get('/get-issue');
  return response.data;
}

const fetchIssueById = async ({queryKey}) => {
  const [, id] = queryKey;
  const response = await issueInstance.get(`/get-issue/${id}`);
  return response.data;
}

const createIssue = async (issueData) => {
  const response = await issueInstance.post('/create', issueData);
  return response.data;
}

const updateIssue = async ({id, issueData}) => {
  const response = await issueInstance.patch(`/get-issue/${id}`, issueData);
  return response.data;
}

const deleteIssue = async (id) => {
  const response = await issueInstance.delete(`/delete-issue/${id}`);
  return response.data;
}

export {
  fetchUserIssues,
  fetchIssueById,
  createIssue,
  updateIssue,
  deleteIssue
}