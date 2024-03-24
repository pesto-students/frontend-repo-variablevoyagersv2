// PublicLayout.jsx
import React from 'react';
import Navbar from '../components/navbar/Navbar';
import { Outlet } from 'react-router';

const PublicLayout = () => {
	return (
		<div className="flex flex-col justify-between h-screen">
			<Navbar />
			<Outlet />
		</div>
	);
};

export default PublicLayout;
