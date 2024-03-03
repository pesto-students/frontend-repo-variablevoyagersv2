import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import TopNav from '../components/common/TopNav';

const OwnerLayout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className="flex h-screen bg-gray-100">
			<Sidebar isOpen={isSidebarOpen} />
			<div className="flex flex-col flex-1 overflow-y-auto">
				<TopNav toggleSidebar={toggleSidebar} />
				<Outlet />
			</div>
		</div>
	);
};

export default OwnerLayout;
