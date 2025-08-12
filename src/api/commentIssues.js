import {generalInstance} from "./axiosInstance.js";

const addIssueComments = async (commentData) => {
  const response = await generalInstance.post('/comment/add-comment', commentData);
  return response.data;
}

export {addIssueComments};
