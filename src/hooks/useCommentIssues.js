import * as commentIssuesAPI from '../api/commentIssues';
import {useMutation, useQueryClient} from "@tanstack/react-query";

const useAddCommentIssues = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: commentIssuesAPI.addIssueComments,
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    }
  });
}

export default useAddCommentIssues;