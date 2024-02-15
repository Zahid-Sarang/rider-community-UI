import {
    addLike,
    comments,
    Credentials,
    follow,
    ItineraryData,
    JoinItinerary,
    MemoryData,
    RegisterData,
    UpdateUserData,
} from "../types";
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

export const unFollowedUser = (userId: number) => api.get(`users/${userId}/unfollowedUsers`);
export const usersMemories = (userId: number) => api.get(`memory/${userId}/userCanSee`);
export const getUserInfo = (userId: number) => api.get(`/users/${userId}`);
export const getMemoryAPi = (memoryId: number) => api.get(`/memory/${memoryId}`);
export const getItineraryAPi = (itineraryId: number) => api.get(`/itinerary/${itineraryId}`);
export const addLikes = (data: addLike) => api.put("memory/addlikes", data);
export const followUsers = (followData: follow) => api.post("/users/follow", followData);
export const unFollowUsers = (unFollowData: follow) => api.post("/users/unfollow", unFollowData);
export const addCommentsApi = (commentData: comments) => api.put("memory/addComment", commentData);
export const deleteCommentsApi = (commentId: number) =>
    api.delete(`memory/removeComment/${commentId}`);
export const getUsers = (queryString: string) => api.get(`/users?${queryString}`);
export const getMemories = (queryString?: string) => api.get(`/memory?${queryString}`);
export const getItineraries = (queryString: string) => api.get(`/itinerary?${queryString}`);
export const joinItinerary = (data: JoinItinerary) => api.post("/itinerary/joinItinerary", data);
export const leaveItinerary = (data: JoinItinerary) => api.post("/itinerary/leaveItinerary", data);
