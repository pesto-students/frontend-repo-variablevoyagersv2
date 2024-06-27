import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/public/HomePage';
import PrivateRoute from './PrivateRoute';
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
import EditPropertyPage from '../pages/owner/EditPropertyPage';
import SessionExpiredPage from '../pages/public/SessionExpiredPage';
import PaymentSuccessPage from '../pages/payment/PaymentSuccessPage';
import PaymentPage from '../pages/payment/PaymentPage';
import TermsOfService from '../pages/public/TermsOfService';
import PrivacyPolicy from '../pages/public/PrivacyPolicy';
import CancelAndRefund from '../pages/public/CancelAndRefund';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <PublicLayout />,
		children: [
			{ path: '', element: <HomePage /> },
			{ path: 'property-detail/:id', element: <PropertyDetailPage /> },
			{ path: 'terms-of-service', element: <TermsOfService /> },
			{ path: 'privacy-policy', element: <PrivacyPolicy /> },
			{ path: 'cancel-refund-policy', element: <CancelAndRefund /> },
			{
				path: 'payment',
				element: (
					<PrivateRoute allowedRoles={ROLES.CUSTOMER}>
						<PaymentPage />
					</PrivateRoute>
				),
			},
			{
				path: 'payment-success',
				element: (
					<PrivateRoute allowedRoles={ROLES.CUSTOMER}>
						<PaymentSuccessPage />
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
	{
		path: '/session-expired',
		element: <SessionExpiredPage />,
	},
]);
