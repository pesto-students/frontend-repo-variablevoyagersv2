import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: null,
	isAuthenticated: !!localStorage.getItem('token'),
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
			state.isAuthenticated = !!action.payload;
		},
		clearUser: (state) => {
			state.user = null;
			state.isAuthenticated = false;
			localStorage.removeItem('token');
			localStorage.removeItem('role');
		},
	},
});

export const { setUser, clearUser } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
