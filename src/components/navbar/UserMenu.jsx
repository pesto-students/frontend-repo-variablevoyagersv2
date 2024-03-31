import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, selectIsAuthenticated, selectUser } from '../../redux/slices/authSlice';
import { axiosPrivate } from '../../services/axios.service';

export default function UserMenu() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const user = useSelector(selectUser);
	const [showDropdown, setShowDropdown] = useState(false);

	const handleLogout = async () => {
		try {
			const { data } = await axiosPrivate.post('/auth/logout', {});
			console.log(data);
			dispatch(clearUser());
			navigate('/');
		} catch (err) {
			console.log(err);
		}
	};

	const getInitials = (user) => {
		const firstInitial = user.firstName.charAt(0).toUpperCase();
		const lastInitial = user.lastName.charAt(0).toUpperCase();
		return `${firstInitial}${lastInitial}`;
	};

	return (
		<>
			{user ? (
				<div className="relative group " onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
					{isAuthenticated &&
						(user.avatar ? (
							<img src={user.avatar} alt="Profile photo" className="inline-block h-10 w-10 rounded-full object-cover" />
						) : (
							<div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-gray-200 font-semibold uppercase text-gray-700">
								{getInitials(user)}
							</div>
						))}

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
