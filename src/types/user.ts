export type UserRole = "ADMIN" | "USER";

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin: string | null;
};

export type CreateUserDto = {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role?: UserRole;
  isActive?: boolean;
};

export type UpdateUserDto = Partial<CreateUserDto> & {
  lastLogin?: string | null;
};
