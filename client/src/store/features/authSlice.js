import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    justLoggedOut: false,
    token: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        setToken: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
            state.loading = false;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            localStorage.removeItem('token');
            state.loading = false;
            state.error = null;
            state.justLoggedOut = true;
        },
        resetLogoutFlag: (state) => {
            state.justLoggedOut = false;
        }
    },
});

export const { loginStart, setToken, loginFailure, logout, resetLogoutFlag } = authSlice.actions;
export default authSlice.reducer;
