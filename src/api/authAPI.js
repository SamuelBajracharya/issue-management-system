import {userInstance} from "./axiosInstance.js";
import Cookies from "js-cookie";

const loginAPI = async (loginData) => {
  const response = await userInstance.post('/login', loginData);
  Cookies.set('token', response.data.token, {secure: true, sameSite: 'strict'});

  return response.data;

}

const signUpAPI = async (signUpData) => {
  const response = await userInstance.post('/signup', signUpData);
  Cookies.set('token', response.data.token, {secure: true, sameSite: 'strict'});
  return response.data;
}

const logoutAPI = () => {
  Cookies.remove('token');
}
export {loginAPI, signUpAPI, logoutAPI}