import { User } from "src/model/user.schema";

export const initialState: User | null = null;

export const reducerPath = "userApi";

export const CACHE_KEY = "User";

export const endpoints = {
  update: (id: number) => `user/${id}`,
  get: (id: number) => `user/${id}`,
  getAll: "user",
  delete: (id: number) => `user/${id}`,
  updatePassword: (id: number) => `user/password-update`,
  updateEmail: (id: number) => `user/email-update`,
};
