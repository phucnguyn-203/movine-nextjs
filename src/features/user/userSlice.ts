import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    currentUser: {
        displayName: string | null;
        photoURL: string | null;
        uid: string | null;
    } | null;
    isAuthenticated: boolean;
}

const initialState: UserState = {
    currentUser: null,
    isAuthenticated: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loggedIn: (
            state,
            action: PayloadAction<{
                displayName: string | null;
                photoURL: string | null;
                uid: string;
            }>
        ) => {
            state.currentUser = action.payload;
            state.isAuthenticated = true;
        },
        loggedOut: (state) => {
            state.currentUser = null;
            state.isAuthenticated = false;
        },
    },
});

export const { loggedIn, loggedOut } = userSlice.actions;
export default userSlice.reducer;
