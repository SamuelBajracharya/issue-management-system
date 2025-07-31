import * as authAPI from '../api/authAPI.js';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {useAuthStore} from "../store/authStore.js";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";

const useLogin = () => {
  return useMutation({
    mutationFn: authAPI.loginAPI
  })
}

const useSignUp = () => {
  return useMutation({
    mutationFn: authAPI.signUpAPI,
    
  })
}

const getToken = () => document.cookie.match(/(^| )token=([^;]+)/)?.[2];


const useGetMe = () => {
  const token = getToken();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [hasSet, setHasSet] = useState(false); // track Zustand update

  const query = useQuery({
    queryKey: ["get-me"],
    queryFn: authAPI.getMeAPI,
    staleTime: 0,
    cacheTime: 0,
    refetchOnMount: true,
    enabled: !!token,
  });

  useEffect(() => {
    if (query.data && !hasSet) {
      setAuth(query.data);
      setHasSet(true);
    }
  }, [query.data, hasSet, setAuth]);

  const isLoading = query.isLoading || (token && !hasSet);

  return {...query, isLoading};
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