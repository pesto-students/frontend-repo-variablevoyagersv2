import { Outlet, createBrowserRouter } from 'react-router-dom';
import { PublicLayout, OwnerLayout, CustomerLayout } from '@/layouts';
import HomePage from '../pages/public/HomePage';
import LoginPage from '../pages/public/LoginPage';
import RegisterPage from '../pages/public/RegisterPage';
import PrivateRoute from './PrivateRoute';
import DashboardPage from '../pages/owner/DashboardPage';
import AddPropertyPage from '../pages/owner/AddPropertyPage';
import MyProfile from '../pages/owner/MyProfile';
import NotFoundPage from '../pages/public/NotFoundPage';
import { ROLES } from '../constants/roles';
export const router = createBrowserRouter([
	{
		path: '/',
		element: <PublicLayout />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: 'login', element: <LoginPage /> },
			{ path: 'register', element: <RegisterPage /> },
			// Uncomment the following line if MyProfile is a public route
			// { path: 'my-profile', element: <MyProfile /> },
		],
	},
	{
		element: <PrivateRoute allowedRoles={ROLES.OWNER} />,
		children: [
			{
				element: <OwnerLayout />,
				children: [
					{ path: 'dashboard', element: <DashboardPage /> },
					{ path: 'add-property', element: <AddPropertyPage /> },
					{ path: 'my-profile', element: <MyProfile /> },
				],
			},
		],
	},
	{
		element: <PrivateRoute allowedRoles={ROLES.CUSTOMER} />,
		children: [
			{
				element: <CustomerLayout />,
				children: [
					{ index: true, element: <HomePage /> },
					{ path: 'my-profile', element: <MyProfile /> },
				],
			},
		],
	},
	{
		path: '*',
		element: <NotFoundPage />,
	},
]);
