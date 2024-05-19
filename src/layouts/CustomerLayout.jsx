import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import TopNav from '../components/common/TopNav';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/common/Footer';

const CustomerLayout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className="flex flex-col bg-gradient">
			<Navbar />

			<div className="mx-auto w-full px-20 pb-28 mt-20">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

export default CustomerLayout;
