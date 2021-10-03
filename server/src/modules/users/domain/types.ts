export enum AuthProvider {
    Firebase = "firebase",
}

export type UserAuth = {
    provider: AuthProvider;
    id: string;
};

export type User = {
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    auth: UserAuth;
};
