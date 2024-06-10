import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/public/HomePage';
import LoginPage from '../pages/public/LoginPage';
import RegisterPage from '../pages/public/RegisterPage';
import PrivateRoute from './PrivateRoute';
import DashboardPage from '../pages/owner/DashboardPage';
import AddPropertyPage from '../pages/owner/AddPropertyPage';
import Profile from '../pages/common/Profile';
import NotFoundPage from '../pages/public/NotFoundPage';
import { ROLES } from '../constants/roles';
import MyBookings from '../pages/customer/MyBookings';
import Bookings from '../pages/owner/Bookings';
import PropertyDetailPage from '../pages/public/PropertyDetailPage';
import PropertyPage from '../pages/owner/PropertyPage';
import PublicLayout from '../layouts/PublicLayout';
import OwnerLayout from '../layouts/OwnerLayout';
import CustomerLayout from '../layouts/CustomerLayout';
import Payment from '../pages/payment/Payment';
import EditPropertyPage from '../pages/owner/EditPropertyPage';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <PublicLayout />,
		children: [
			{ path: '', element: <HomePage /> },
			{ path: 'property-detail/:id', element: <PropertyDetailPage /> },
			{
				path: 'payment',
				element: (
					<PrivateRoute allowedRoles={ROLES.CUSTOMER}>
						<Payment />
					</PrivateRoute>
				),
			},
		],
	},

	{
		path: '/owner/',
		element: <OwnerLayout />,
		children: [
			{
				path: 'dashboard',
				element: (
					<PrivateRoute allowedRoles={ROLES.OWNER}>
						<DashboardPage />
					</PrivateRoute>
				),
			},
			{
				path: 'property',
				element: (
					<PrivateRoute allowedRoles={ROLES.OWNER}>
						<PropertyPage />
					</PrivateRoute>
				),
			},
			{
				path: 'add-property',
				element: (
					<PrivateRoute allowedRoles={ROLES.OWNER}>
						<AddPropertyPage />
					</PrivateRoute>
				),
			},
			{
				path: 'edit-property/:id',
				element: (
					<PrivateRoute allowedRoles={ROLES.OWNER}>
						<EditPropertyPage />
					</PrivateRoute>
				),
			},
			{
				path: 'bookings',
				element: (
					<PrivateRoute allowedRoles={ROLES.OWNER}>
						<Bookings />
					</PrivateRoute>
				),
			},
			{
				path: 'profile',
				element: (
					<PrivateRoute allowedRoles={ROLES.OWNER}>
						<Profile />
					</PrivateRoute>
				),
			},
			{
				path: 'property-detail/:id',
				element: (
					<PrivateRoute allowedRoles={ROLES.OWNER}>
						<PropertyDetailPage />
					</PrivateRoute>
				),
			},
		],
	},

	{
		path: '/customer/',
		element: <CustomerLayout />,

		children: [
			{
				path: 'profile',
				element: (
					<PrivateRoute allowedRoles={ROLES.CUSTOMER}>
						<Profile />
					</PrivateRoute>
				),
			},
			{
				path: 'my-bookings',
				element: (
					<PrivateRoute allowedRoles={ROLES.CUSTOMER}>
						<MyBookings />
					</PrivateRoute>
				),
			},
			{
				path: 'property-detail/:id',
				element: (
					<PrivateRoute allowedRoles={ROLES.CUSTOMER}>
						<PropertyDetailPage />
					</PrivateRoute>
				),
			},
		],
	},
	{
		path: '*',
		element: <NotFoundPage />,
	},
]);
