import { axiosClient } from "./axiosClient";

import type {User , CreateUserDto} from "../types/user"


export const getUsers = async ():Promise<User[]> => {
    const res = await axiosClient.get<User[]>("/users")
    return res.data
}

export const createUser = async (user: CreateUserDto): Promise<User> => {
    const res = await axiosClient.post<User>("/users" , user);
    return res.data
};

export const deleteUser = async (id:number):Promise<void> => {
    const res = await axiosClient.delete(`/users/${id}`)
    return res.data
}


export async function updateUser(id: string, user: User): Promise<User> {
  const res = await axiosClient.put<User>(`/users/${id}`, user);
  return res.data;
}
