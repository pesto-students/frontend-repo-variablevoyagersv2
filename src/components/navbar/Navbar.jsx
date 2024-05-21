import React, { useState, useRef, useEffect } from 'react';
import Container from '../Container';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';
import PrivateNav from './PrivateNav';
import venue from '/venue2.png';
import { useLocation } from 'react-router-dom';
import VenueSearch from './Search';

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
