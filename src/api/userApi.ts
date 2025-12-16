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