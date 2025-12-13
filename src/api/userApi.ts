import { axiosClient } from "./axiosClient";

import type {User} from "../types/user"


export const getUsers = async ():Promise<User[]> => {
    const res = await axiosClient.get<User[]>("/users")
    return res.data
}