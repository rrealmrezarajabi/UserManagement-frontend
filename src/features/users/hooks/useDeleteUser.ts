import { deleteUser } from "../../../api/userApi";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
