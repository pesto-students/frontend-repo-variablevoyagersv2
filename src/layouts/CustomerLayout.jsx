import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import TopNav from '../components/common/TopNav';
import Navbar from '../components/navbar/Navbar';

const CustomerLayout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className="flex flex-col h-screen ">
			<Navbar />
			<div className="mx-auto w-full max-w-5xl px-4 py-28">
				<Outlet />
			</div>
		</div>
	);
};

export default CustomerLayout;
