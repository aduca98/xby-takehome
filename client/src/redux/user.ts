import {
    createAction,
    createAsyncThunk,
    createReducer,
} from "@reduxjs/toolkit";
import { client, FETCH_ME } from "src/api/graphql";

type AuthStatus = "NOT_LOADED" | "LOADING" | "LOGGED_IN" | "NOT_LOGGED_IN";

type UserState = {
    user: any | null;
    authStatus: AuthStatus;
};

// initial state
const initialState: UserState = {
    user: null,
    authStatus: "NOT_LOADED",
};

// actions
export const setUser = createAction<any>("SET_USER");

export const logoutUser = createAction<void>("REMOVE_USER");

export const setUserAuthStatus = createAction<AuthStatus>(
    "SET_USER_AUTH_STATUS"
);

// thunks
export const fetchMe = createAsyncThunk(
    "user/fetchMe",
    async (_, { rejectWithValue }) => {
        try {
            const response = await client.query({
                query: FETCH_ME,
            });

            return response.data?.me;
        } catch (err) {
            return rejectWithValue((err as any).message);
        }
    }
);

// reducer
export const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setUser, (state, action) => {
            state.user = action.payload;
        })
        .addCase(logoutUser, (state) => {
            state.user = null;
        })
        .addCase(setUserAuthStatus, (state, action) => {
            state.authStatus = action.payload;
        })
        .addCase(fetchMe.fulfilled, (state, action) => {
            state.user = action.payload;
        });
});

// selectors
export const getUser = (state: any): any => state.user.user;

export const getUserAuthStatus = (state: any): AuthStatus =>
    state.user.authStatus;

export const getUserIsLoggedIn = (state: any): boolean =>
    state.user.authStatus === "LOGGED_IN";
