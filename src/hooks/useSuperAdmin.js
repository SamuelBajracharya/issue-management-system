import * as superAdminAPI from "../api/superAdminAPI.js";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

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

export {useSuperAdmin, useGetAllAdmin, useEditAdmin, useDeleteAdmin, useGetAuditLog}