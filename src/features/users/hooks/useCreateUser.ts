import { createUser } from "../../../api/userApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User, CreateUserDto } from "../../../types/user";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, CreateUserDto>({
    mutationFn: (user: CreateUserDto) => createUser(user),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
