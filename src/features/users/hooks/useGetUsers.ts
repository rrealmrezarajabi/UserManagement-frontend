import { getUsers } from "../../../api/userApi";
import { useQuery } from "@tanstack/react-query"
import type { User } from "../../../types/user";
export const useGetUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });
