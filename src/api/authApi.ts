import { axiosClient } from "./axiosClient";

import type { LoginResponse, AuthUser } from "../types/auth";

export type LoginData = {
  email: string;
  password: string;
};

export const authApi = {
  async login(data: LoginData): Promise<LoginResponse> {
    const res = await axiosClient.post<LoginResponse>("/auth/login", data);
    return res.data;
  },

  async me(): Promise<AuthUser> {
    const res = await axiosClient.get<AuthUser>("/auth/me");
    return res.data;
  },
};
