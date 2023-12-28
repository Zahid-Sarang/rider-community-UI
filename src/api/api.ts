import { Credentials } from "../types";
import { api } from "./client";

export const loginApi = (credentials: Credentials) => api.post("/auth/login", credentials);
