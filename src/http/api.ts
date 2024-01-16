import { Credentials, ItineraryData, MemoryData, RegisterData, UpdateUserData } from "../types";
import { api } from "./client";

export const registerApi = (registerData: RegisterData) => api.post("/auth/register", registerData);
export const loginApi = (credentials: Credentials) => api.post("/auth/login", credentials);
export const selfApi = () => api.get("/auth/self");
export const logoutApi = () => api.post("/auth/logout", {});
export const updateUserApi = (userId: number | undefined, updateUserData: UpdateUserData) =>
    api.patch(`${import.meta.env.VITE_BACKEND_API_URL}/users/${userId}`, updateUserData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

export const itineraryApi = (data: ItineraryData) =>
    api.post("/itinerary", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    export const memoryApi = (data: MemoryData) =>
    api.post("/memory", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });