import { Credentials, RegisterData } from "../types";
import { api } from "./client";

export const registerApi = (registerData: RegisterData) => api.post("/auth/register", registerData);
export const loginApi = (credentials: Credentials) => api.post("/auth/login", credentials);
export const selfApi = () => api.get("/auth/self");
export const logoutApi = () => api.post("/auth/logout", {});
