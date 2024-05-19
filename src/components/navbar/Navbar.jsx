import React, { useState, useRef, useEffect } from 'react';
import Container from '../Container';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';
import PrivateNav from './PrivateNav';
import venue from '/venue2.png';
import { useLocation } from 'react-router-dom';

export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const location = useLocation();

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.pageYOffset;
			setIsScrolled(scrollTop > 0);
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const showImage = location.pathname === '/';

	return (
		<>
			{showImage &&
				<>
					<div classNameName=" w-full">
						<img src={venue} alt="venue" className='w-full h-[450px] opacity-80  object-cover object-center' />
					</div>

					<div className="flex max-w-lg mx-auto w-[100%] relative bottom-[250px]">
						<button id="dropdown-button" data-dropdown-toggle="dropdown" className="flex-shrink-0 z-10 inline-flex items-center py-5 px-10 text-sm font-medium text-center bg-white border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100" type="button">All categories <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
						</svg></button>
						<div className="relative w-full">
							<input type="search" id="search-dropdown" className="block py-5 px-3 w-full z-20 text-sm bg-white rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search ." required />
							<button type="submit" className="absolute top-0 end-0 px-6 p-2.5 text-sm font-medium h-full text-white bg-theame rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
								<svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
									<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
								</svg>
								<span className="sr-only">Search</span>
							</button>
						</div>
					</div>

				</>
			}
			<nav className={`fixed w-full z-10 shadow-lg border-b-[1px]transition-colors duration-500 
			${isScrolled ? 'bg-white' : showImage ? ' bg-transparent' : 'bg-white'}
			`}>
				<div className="mx-auto max-w-8xl  px-2 sm:px-9 lg:px-20 ">
					<div className="relative flex h-16 items-center justify-between">
						<Logo />
						<div className='flex gap-2 justify-between sm:w-full '>
							<PrivateNav />
							<div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-0 sm:pr-0">
								<UserMenu />
							</div>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
}
