import {createAdminUser} from "../api/superAdminAPI.js";
import {useMutation} from "@tanstack/react-query";

const useSuperAdmin = () => {
  return useMutation({
    mutationFn: createAdminUser,
  })
}

export {useSuperAdmin}