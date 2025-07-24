import * as authAPI from '../api/authAPI.js';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: authAPI.loginAPI,
    onSuccess: (data) => {
      Cookies.set('token', data.token, {
        expires: 1,
        secure: true,
        sameSite: 'strict',
      });
      navigate("/");
    }
  })
}

const useSignUp = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: authAPI.signUpAPI,
    onSuccess: (data) => {
      Cookies.set('token', data.token, {
        expires: 1,
        secure: true,
      })
      navigate("/");
    }
  })
}

const useLogOut = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return () => {
    authAPI.logoutAPI();
    queryClient.clear();
    navigate("/");
  }
}

export {useLogin, useSignUp, useLogOut}