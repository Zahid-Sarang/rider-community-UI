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
