// store.js

import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/slices/user.slice';
import authReducer from '../redux/slices/authSlice';
const store = configureStore({
	reducer: {
		user: userReducer,
		auth: authReducer,
	},
});

export default store;
