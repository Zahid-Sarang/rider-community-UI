export type RegisterData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userName: string;
    profilePhoto?: string | null;
    coverPhoto?: string | null;
    bio?: string | null;
    location?: string | null;
    bikeDetails?: string | null;
};

export type Credentials = {
    email: string;
    password: string;
};

export type UpdateUserData = {
    id?: number;
    firstName?: string;
    lastName?: string;
    password?: string;
    userName?: string;
    profilePhoto?: FileList | string;
    coverPhoto?: FileList | string;
    bio?: string;
    location?: string;
    bikeDetails?: string;
};

export type ItineraryData = {
    tripTitle: string;
    tripDescription: string;
    tripDuration: string;
    startDateTime: string;
    endDateTime: string;
    startPoint: string;
    endingPoint: string;
    destinationImage: FileList | string;
    userId?: number;
};

export type MemoryData = {
    title: string;
    description: string;
    image: FileList | string;
    userId?: number;
};

export type addLike = {
    userId: number;
    memoryId: number;
};

export type follow = {
    followerId: number;
    followedId: number;
};

export type comments = {
    text: string;
    userId: number;
    memoryId: number;
};

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    profilePhoto: string;
    coverPhoto: string;
    bio: string;
    location: string;
    bikeDetails: string;
}

export interface JoinItinerary {
    userId: number;
    itineraryId: number;
}
