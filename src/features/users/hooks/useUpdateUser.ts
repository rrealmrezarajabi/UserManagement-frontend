import { updateUser } from "../../../api/userApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User, UpdateUserDto } from "../../../types/user";

type UpdateUserVariables = {
  id: number;
  data: UpdateUserDto;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, UpdateUserVariables>({
    mutationFn: ({ id, data }) => updateUser(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
