import React from 'react';
import Header from '../components/common/Header';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
	return (
		<>
			<div className="py-4 px-8 flex flex-col min-h-screen max-w-4xl mx-auto">
				<Header />
				<Outlet />
			</div>
		</>
	);
};

export default PublicLayout;
