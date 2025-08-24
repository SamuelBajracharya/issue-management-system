import * as adminIssues from '../api/adminIssues';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

// Fetch all issues with optional limit
const useAllIssues = (limit = 0, page = 1) => {
  return useQuery({
    queryKey: ["allIssues", limit],
    queryFn: () => adminIssues.fetchAllIssues({limit, page}),
  });
};

// Fetch all issues assigned to admin
const useAdminIssues = () => {
  return useQuery({
    queryKey: ["adminIssues"],
    queryFn: adminIssues.fetchAdminIssues,
  });
};

// Fetch single admin issue by ID
const useAdminIssueById = (id) => {
  return useQuery({
    queryKey: ["adminIssues", id],
    queryFn: ({queryKey}) => adminIssues.fetchAdminIssueById(id),
    enabled: !!id,
  });
};

// Assign an issue
const useAssignIssue = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({issueId}) => adminIssues.assignIssue({issueId}),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["adminIssues"]);
      queryClient.invalidateQueries(["adminIssues", variables.issueId]);
    },
  });
};

// Resolve an issue
const useResolveIssue = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminIssues.resolveIssue,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["adminIssues"]);
      queryClient.invalidateQueries(["adminIssues", variables.id]);
    },
  });
};

// Create a subtask for an issue
const useCreateSubtask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminIssues.createSubtask,
    onSuccess: () => {
      queryClient.invalidateQueries(['subtasks']);
    },
  });
};

// Mark a subtask as complete
const useCompleteSubtask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminIssues.completeSubtask,
    onSuccess: () => {
      queryClient.invalidateQueries(['subtasks']);
    },
  });
};

export {
  useAllIssues,
  useAdminIssues,
  useAdminIssueById,
  useAssignIssue,
  useResolveIssue,
  useCreateSubtask,
  useCompleteSubtask
};
