import api from "@/lib/api";
import { User } from "@/types";

// Get current user (already exists in auth API)
export const getMe = async (): Promise<User> => {
  const res = await api.get("/auth/me");
  return res.data;
};

// Get user by ID
export const getUserById = async (id: string): Promise<User> => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};

// Update user (supports multipart for image)
export const updateUser = async (id: string, data: FormData): Promise<User> => {
  const res = await api.patch(`/users/${id}`, data);
  return res.data;
};
