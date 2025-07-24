import {dashboardAPI} from "../api/dashboardAPI.js";
import {useQuery} from "@tanstack/react-query";

const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: dashboardAPI,
  })
}

export default useDashboard;