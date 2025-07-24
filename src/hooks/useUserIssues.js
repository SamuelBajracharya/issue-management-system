import * as userIssues from '../api/userIssues.js';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

const useUserIssues = () => {
  return useQuery({
      queryKey: ["userIssues"],
      queryFn: userIssues.fetchUserIssues,
    }
  )
}

const useUserIssueById = (id) => {
  return useQuery({
    queryKey: ["userIssues", id],
    queryFn: userIssues.fetchIssueById,
  })
}

const useCreateIssue = () => {
  const queryClient = useQueryClient();
  return useMutation({
      mutationFn: userIssues.createIssue,
      onSuccess: () => {
        queryClient.invalidateQueries(["userIssues"]);
      }
    }
  )
}

const useUpdateIssue = () => {
  const queryClient = useQueryClient();
  return useMutation(userIssues.updateIssue, {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["userIssues", variables.id]);
    }
  })
}

const useDeleteIssue = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userIssues.deleteIssue,
    onSuccess: () => {
      queryClient.invalidateQueries(["userIssues"]);
    }
  })
}

export {useUserIssues, useUserIssueById, useCreateIssue, useUpdateIssue, useDeleteIssue}