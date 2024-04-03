import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import TopNav from '../components/common/TopNav';
import Navbar from '../components/navbar/Navbar';
import Container from '../components/Container';
import Footer from '../components/common/Footer';
import useRedirect from '../hooks/useRedirect';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUser } from '../redux/slices/authSlice';

const OwnerLayout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className="flex flex-col bg-gradient">
			<Navbar />

			<div className="mx-auto w-full max-w-5xl px-4 pb-28 pt-32">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

export default OwnerLayout;
