import {profileInstance, userInstance} from "./axiosInstance.js";
import Cookies from "js-cookie";

const loginAPI = async (loginData) => {
  const response = await userInstance.post('/login', loginData);
  Cookies.set('accessToken', response.data.token?.accessToken, {secure: true, sameSite: 'strict'});
  Cookies.set('refreshToken', response.data.token?.refreshToken, {secure: true, sameSite: 'strict'});
  return response.data;

}

const signUpAPI = async (signUpData) => {
  const response = await userInstance.post('/register', signUpData);
  Cookies.set('accessToken', response.data.token?.accessToken, {secure: true, sameSite: 'strict'});
  Cookies.set('refreshToken', response.data.token?.refreshToken, {secure: true, sameSite: 'strict'});
  return response.data;
}

const getMeAPI = async () => {
  const match = document.cookie.match(new RegExp('(^| )accessToken=([^;]+)'));
  const accessToken = match ? match[2] : null;
  if (!accessToken) {
    throw new Error("No token found");
  }
  const response = await profileInstance.get('/get-me',

    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  return response.data;

}

const logoutAPI = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  Cookies.remove('token');
  localStorage.setItem('isDarkMode', 'false');
}
export {loginAPI, signUpAPI, getMeAPI, logoutAPI}