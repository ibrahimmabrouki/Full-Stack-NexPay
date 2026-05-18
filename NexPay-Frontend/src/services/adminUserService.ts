import api from "@/lib/api";
import {
  AdminUsersResponse,
  UpdateAdminUserPayload,
  UpdateAdminUserResponse,
  UpdateAdminCredentialsPayload,
  UpdateAdminCredentialsResponse,
  AdminUserDetailsResponse,
} from "@/types";

// Get all users
export const getAdminUsers = async (): Promise<AdminUsersResponse> => {
  const res = await api.get("/admin/users");

  return res.data;
};

// Update user
export const updateAdminUser = async (
  id: string,
  payload: UpdateAdminUserPayload,
): Promise<UpdateAdminUserResponse> => {
  const res = await api.patch(`/admin/users/${id}`, payload);

  return res.data;
};

export const updateAdminUserCredentials = async (
  payload: UpdateAdminCredentialsPayload,
): Promise<UpdateAdminCredentialsResponse> => {
  const res = await api.put("/admin/credentials", payload);

  return res.data;
};

// Get user by ID
export const getAdminUserById = async (
  id: string,
): Promise<AdminUserDetailsResponse> => {
  const res = await api.get(`/admin/users/${id}`);
  return res.data;
};
