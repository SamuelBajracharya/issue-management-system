import * as adminIssues from '../api/adminIssues';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

const useAllIssues = () => {
  return useQuery({
    queryKey: ["allIssues"], queryFn: adminIssues.fetchAllIssues, retry: 1,
  })
};

const useAdminIssues = () => {
  return useQuery({
    queryKey: ["adminIssues"], queryFn: adminIssues.fetchAdminIssues,
  })
}

const useAdminIssueById = (id) => {
  return useQuery({
    queryKey: ["adminIssues", id], queryFn: adminIssues.fetchAdminIssueById,
  })
}

const useAsignIssue = () => {
  const queryClient = useQueryClient();
  return useMutation(adminIssues.assignIssue, {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["adminIssues", variables.id]);
    }
  })
}

const useResolveIssue = () => {
  const queryClient = useQueryClient();
  return useMutation(adminIssues.resolveIssue, {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["adminIssues", variables.id]);
    }
  })
}

const useSubtaskIssue = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminIssues.createSubtask, onSuccess: () => {
      // Example: invalidate a query or update cache
      queryClient.invalidateQueries('subtasks');
    },
  })
}

const useCompleteSubtask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminIssues.completeSubtask,
    onSuccess: () => {
      queryClient.invalidateQueries('subtasks');
    }
  })
}

export {
  useAllIssues,
  useAdminIssues,
  useAdminIssueById,
  useAsignIssue,
  useResolveIssue,
  useSubtaskIssue,
  useCompleteSubtask
}