import React, { useState, useRef, useEffect } from 'react';
import Container from '../Container';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';
import PrivateNav from './PrivateNav';

export default function Navbar() {

	return (
		<nav className="fixed w-full bg-white z-10 shadow-sm border-b-[1px]">
			<div className="mx-auto max-w-8xl  px-2 sm:px-9 lg:px-9 ">
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
	);
}
