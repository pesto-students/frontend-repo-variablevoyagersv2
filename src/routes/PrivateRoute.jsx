import React from 'react';

import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUser } from '../redux/slices/authSlice';
import { Navigate, Outlet } from 'react-router-dom';
import LoginPage from '../pages/public/LoginPage';

const PrivateRoute = ({ allowedRoles }) => {
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const user = useSelector(selectUser);
	console.log({ user, allowedRoles });

	const isAuthorized = isAuthenticated && allowedRoles === user?.role;
	console.log(isAuthorized);
	return isAuthorized ? <Outlet /> : <LoginPage />;
};

export default PrivateRoute;
