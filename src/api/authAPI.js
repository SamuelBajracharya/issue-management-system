import {userInstance} from "./axiosInstance.js";
import Cookies from "js-cookie";

const loginAPI = async (loginData) => {
  const response = await userInstance.post('/login', loginData);
  Cookies.set('token', response.data.token, {secure: true, sameSite: 'strict'});

  return response.data;

}

const signUpAPI = async (signUpData) => {
  const response = await userInstance.post('/register', signUpData);
  Cookies.set('token', response.data.token, {secure: true, sameSite: 'strict'});
  return response.data;
}

const getMeAPI = async () => {
  const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
  const token = match ? match[2] : null;
  if (!token) {
    throw new Error("No token found");
  }
  const response = await userInstance.get('/get-me',

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  return response.data;

}

const logoutAPI = () => {
  Cookies.remove('token');
}
export {loginAPI, signUpAPI, getMeAPI, logoutAPI}