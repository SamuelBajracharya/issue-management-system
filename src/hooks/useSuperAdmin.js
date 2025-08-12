import * as superAdminAPI from "../api/superAdminAPI.js";
import {useMutation, useQuery} from "@tanstack/react-query";

const useSuperAdmin = () => {
  return useMutation({
    mutationFn: superAdminAPI.createAdminUser,
  })
}

const useGetAllAdmin = () => {
  return useQuery({
    queryKey: ["getAllAdmin"],
    queryFn: superAdminAPI.getAllAdmin,
  })
}

const useEditAdmin = () => {
  return useMutation({
    mutationFn: superAdminAPI.editAdmin,
  })
}

const useDeleteAdmin = () => {
  return useMutation({
    mutationFn: (id) => superAdminAPI.deleteAdmin(id),
  });
};

const useGetAuditLog = () => {
  return useQuery({
    queryKey: ["getAuditLog"],
    queryFn: superAdminAPI.getAuditLog,
  })
}

export {useSuperAdmin, useGetAllAdmin, useEditAdmin, useDeleteAdmin, useGetAuditLog}