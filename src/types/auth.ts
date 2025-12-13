export type AuthUser = {
  name: string;
  email: string;
  role: "ADMIN";
};

export type LoginResponse = {
  user: AuthUser;
  token: string;
};
