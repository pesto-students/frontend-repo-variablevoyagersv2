import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const d = JSON.parse(localStorage.getItem('user'));
		console.log('d', d);
		if (d) {
			setUser(d);
		}
	}, []);
	return (
		<header className="flex justify-between">
			<Link to={'/'} className="flex items-center gap-1">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-8 h-8 -rotate-90"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
					/>
				</svg>
				<span className="font-bold text-xl">airbnb</span>
			</Link>
			<div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
				<div>Anywhere</div>
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
			{!user ? (
				<div className="flex gap-2">
					<Link
						to={'/register'}
						className="bg-primary border border-primary cursor-pointer disabled:bg-gray-200 disabled:border-gray-200 focus:outline-none focus:ring-4 focus:ring-primary-50 font-semibold hover:bg-primary-600 hover:border-primary-600 leading-6 px-6 py-2 rounded-md shadow-xs text-sm text-white transition-colors"
					>
						Signup
					</Link>
					<Link
						to={'/login'}
						className="bg-primary border border-primary cursor-pointer disabled:bg-gray-200 disabled:border-gray-200 focus:outline-none focus:ring-4 focus:ring-primary-50 font-semibold hover:bg-primary-600 hover:border-primary-600 leading-6 px-6 py-2 rounded-md shadow-xs text-sm text-white transition-colors"
					>
						Login
					</Link>
				</div>
			) : (
				<>
					{user.role === 'OWNER' && <h1>List your property</h1>}
					<h1>Hello, {user.firstName}</h1>
				</>
			)}
		</header>
	);
}
