import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../../api/userApi";
import type { User } from "../../../types/user";

export const useGetUser = (id: number) =>
  useQuery<User>({
    queryKey: ["users", id],
    queryFn: () => getUser(id),
    enabled: !!id,
  });
