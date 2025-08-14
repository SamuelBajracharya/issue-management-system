import * as superAdminAPI from "../api/superAdminAPI.js";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

const useAddAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: superAdminAPI.createAdminUser,
    onSuccess: () => queryClient.invalidateQueries(["getAllAdmin"]),
    onError: (err) => {
      console.error("Failed to create admin:", err);
    },
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => superAdminAPI.deleteAdmin(id),
    onSuccess: () => queryClient.invalidateQueries(["getAllAdmin"]),
    onError: (err) => {
      console.error("Failed to delete admin:", err);
    },
  });

};

const useGetAuditLog = () => {
  return useQuery({
    queryKey: ["getAuditLog"],
    queryFn: superAdminAPI.getAuditLog,
  })
}

export {useAddAdmin, useGetAllAdmin, useEditAdmin, useDeleteAdmin, useGetAuditLog}