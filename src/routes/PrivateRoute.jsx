import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUser } from '../redux/slices/authSlice';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import LoginPage from '../pages/public/LoginPage';

const PrivateRoute = ({ children, allowedRoles }) => {
	const navigate = useNavigate();
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const user = useSelector(selectUser);
	console.log(isAuthenticated, user);
	const isAuthorized = isAuthenticated && allowedRoles === JSON.parse(localStorage.getItem('role'));
	// useEffect(() => {
	// 	if (!isAuthorized) {
	// 		navigate('/login');
	// 	}
	// }, []);

	return isAuthorized ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
