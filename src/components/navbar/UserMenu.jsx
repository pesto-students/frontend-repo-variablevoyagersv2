import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, selectIsAuthenticated, selectUser } from '../../redux/slices/authSlice';

export default function UserMenu() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const user = useSelector(selectUser);
	const [showDropdown, setShowDropdown] = useState(false);

	const handleLogout = () => {
		dispatch(clearUser());
		navigate('/');
	};

	const getInitials = (user) => {
		const firstInitial = user.firstName.charAt(0).toUpperCase();
		const lastInitial = user.lastName.charAt(0).toUpperCase();

		// Concatenate the initials and return
		return `${firstInitial}${lastInitial}`;
	};

	return (
		<>
			{user ? (
				<div className="relative group " onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
					<div className="flex gap-2 border border-gray-300 rounded-full px-3 py-2 cursor-pointer">
						<div className="bg-white-500 text-primary rounded-full border border-gray-500 overflow-hidden">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
								<path
									fillRule="evenodd"
									d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						{isAuthenticated && <div>{getInitials(user)}</div>}
					</div>

					{showDropdown && (
						<div className="absolute right-0 p-2 bg-white shadow-md rounded-md border border-gray-100  z-10 w-60 overflow-hidden">
							<div className="px-2 py-2">
								<div>
									<p className="text-md font-semibold capitalize">
										{user.firstName} {user.lastName}
									</p>
									<p className="text-sm capitalize text-base-secondary-text">{user.role.toLowerCase()}</p>
								</div>
							</div>
							<div className="w-full border h-[1px]"></div>
							<button
								onClick={handleLogout}
								className="right-5 text-sm text-center py-1 px-11 my-1 w-max bg-white hover:bg-gray-100 dark:hover:bg-gray-200 rounded-md dark:hover:text-black"
							>
								Log Out
							</button>
						</div>
					)}
				</div>
			) : (
				<div className="flex flex-row items-center gap-3 overflow-hidden">
					<Link
						to="/register"
						className="hover:shadow-md   text-primary border border-gray-500 rounded-full px-3 py-2 hover:text-white hover:bg-primary"
					>
						Sign-up
					</Link>
					<Link to="/login" className="hover:shadow-md text-primary border border-gray-500 rounded-full px-3 py-2 hover:text-white hover:bg-primary">
						Log-In
					</Link>
				</div>
			)}
		</>
	);
}
