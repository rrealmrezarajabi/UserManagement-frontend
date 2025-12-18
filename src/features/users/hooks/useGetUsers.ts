import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../../api/userApi";
import type { User } from "../../../types/user";
import type { PaginatedResponse } from "../../../types/pagination";

export const useGetUsers = (page: number, limit: number, q?: string) =>
  useQuery<PaginatedResponse<User>>({
    queryKey: ["users", page, limit, q],
    queryFn: () => getUsers(page, limit, q),
    // keepPreviousData: true,
  });
