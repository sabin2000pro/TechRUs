export interface UserProfile {
    username: string;
    email: string;
    password: string;
    role: string;
}

export interface AuthState { // Authentication State
    isLoading: false | null
    user: UserProfile
    isError: string | null
    token: string | null;
}