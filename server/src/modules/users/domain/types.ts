export enum AuthProvider {
    Firebase = "firebase",
}

export type UserAuth = {
    provider: AuthProvider;
    providerId: string;
};

export type User = {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    auth: UserAuth;
};
