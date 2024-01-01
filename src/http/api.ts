import { Credentials } from "../types";
import { api } from "./client";

export const loginApi = (credentials: Credentials) => api.post("/auth/login", credentials);
export const selfApi = () => api.get("/auth/self");
export const logoutApi = () => api.post("/auth/logout", {});
