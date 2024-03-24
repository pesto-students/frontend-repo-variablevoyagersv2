// authSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { Navigate } from 'react-router-dom';

const initialState = {
	user: null,
	isAuthenticated: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
			state.isAuthenticated = true;
			console.log(action);
		},
		clearUser: (state) => {
			state.user = null;
			state.isAuthenticated = false;
			localStorage.removeItem('token');
		},
	},
});

export const { setUser, clearUser } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
