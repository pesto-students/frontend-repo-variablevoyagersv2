// PublicLayout.jsx
import React from 'react';
import Navbar from '../components/navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/common/Footer';

const PublicLayout = () => {
	return (
		<div className="flex flex-col justify-between">
			<Navbar />
			<div className="mx-auto w-full max-w-5xl px-4 pb-28 pt-32">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

export default PublicLayout;
