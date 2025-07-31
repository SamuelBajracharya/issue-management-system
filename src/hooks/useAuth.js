import * as authAPI from '../api/authAPI.js';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {useAuthStore} from "../store/authStore.js";
import {useEffect} from "react";

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

const useGetMe = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  const query = useQuery({
    queryKey: ["get-me"],
    queryFn: authAPI.getMeAPI,
    staleTime: 0,
    cacheTime: 0,
    refetchOnMount: true,
  });
  useEffect(() => {
    if (query.data) {
      setAuth(query.data);
    }
  }, [query.data, setAuth]);

  return query;
};

const useLogOut = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return () => {
    authAPI.logoutAPI();
    queryClient.clear();
    navigate("/login");
  }
}

export {useLogin, useSignUp, useGetMe, useLogOut}