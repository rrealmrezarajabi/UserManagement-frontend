import { axiosClient } from "./axiosClient";

import type { User, CreateUserDto, UpdateUserDto } from "../types/user";

import type { PaginatedResponse } from "../types/pagination";

export const getUsers = async (
  page = 1,
  limit = 10,
  q?: string
): Promise<PaginatedResponse<User>> => {
  const res = await axiosClient.get<PaginatedResponse<User>>("/users", {
    params: { page, limit, q },
  });

  return res.data;
};

export const createUser = async (user: CreateUserDto): Promise<User> => {
  const res = await axiosClient.post<User>("/users", user);
  return res.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  const res = await axiosClient.delete(`/users/${id}`);
  return res.data;
};

export const updateUser = async (
  id: number,
  user: UpdateUserDto
): Promise<User> => {
  const res = await axiosClient.put<User>(`/users/${id}`, user);
  return res.data;
};

export const getUser = async (id: number): Promise<User> => {
  const res = await axiosClient.get<User>(`/users/${id}`);
  return res.data;
};
