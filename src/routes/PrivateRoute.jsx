import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../redux/slices/authSlice';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const isAuthorized = isAuthenticated && allowedRoles === JSON.parse(localStorage.getItem('role'));

	return isAuthorized ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
