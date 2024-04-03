import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../hooks/UserContext';

export default function Header() {
	const { user } = useContext(UserContext);
	const [showDropdown, setShowDropdown] = useState(false);

	const handleLogout = () => {
		localStorage.setItem('user', '');
		window.location.reload();
	};

	return (
		<header className="flex justify-between m-0">
			<Link to={'/'} className="flex items-center gap-1">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-8 h-8 -rotate-90 text-primary"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
					/>
				</svg>
				<span className="font-bold text-xl text-primary">airbnb</span>
			</Link>
			<div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
				<div>Any Where</div>
				<div className="border-l border-gray-300"></div>
				<div>Any week</div>
				<div className="border-l border-gray-300"></div>
				<div>Add guests</div>
				<button className="bg-primary text-white p-1 rounded-full">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
						<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
					</svg>
				</button>
			</div>
			{user ? (
				<div className="relative group " onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
					<div className="flex items-center gap-2 border border-gray-300 rounded-full px-3 py-2 cursor-pointer">
						<div className="bg-white-500 text-primary rounded-full border border-gray-500 overflow-hidden">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
								<path
									fillRule="evenodd"
									d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						{!!user && <div>{user?.firstName}</div>}
					</div>

					{showDropdown && (
						<div className="flex-col justify-center absolute right-0 p-2 bg-white shadow-md rounded-md border border-gray-100 w-40 z-10">
							<Link
								to="/my-booking"
								className="block text-sm text-center py-1 px-2 my-1 hover:bg-gray-100 dark:hover:bg-gray-200 border rounded-md dark:hover:text-black"
							>
								Booking
							</Link>
							<Link
								to="/my-profile"
								className="block text-sm text-center py-1 px-2 my-1 hover:bg-gray-100 dark:hover:bg-gray-200 border rounded-md dark:hover:text-black"
							>
								Profile
							</Link>
							{user?.role == 'OWNER' ? (
								<Link
									to="/logout"
									className="block my-1 text-sm text-center py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-200 border rounded-md dark:hover:text-black"
								>
									Property
								</Link>
							) : (
								<></>
							)}
							<button onClick={handleLogout} className="right-5 text-sm text-center py-1 px-11 my-1 w-max bg-white dark:hover:text-black">
								Log Out
							</button>
						</div>
					)}
				</div>
			) : (
				<div className="flex items-center gap-2">
					<Link to={'/register'} className="text-primary border border-gray-500 rounded-full px-3 py-2 hover:text-white hover:bg-primary">
						Sign-up
					</Link>
					<Link to={'/login'} className="text-primary border border-gray-500 rounded-full px-3 py-2 hover:text-white hover:bg-primary">
						Log-In
					</Link>
				</div>
			)}
		</header>
	);
}
