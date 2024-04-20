import React from 'react';
import { NavLink } from 'react-router-dom';

const MenuLink = ({ to, onClick, children }) => {
	return (
		<NavLink
			to={to}
			className={({ isActive }) =>
				isActive ? 'block px-6 md:px-3 py-2  bg-primary text-white md:rounded-md' : 'block px-6 md:px-3 py-2 text-primary hover:bg-gray-200 sm:rounded-md'
			}
			onClick={onClick}
		>
			{children}
		</NavLink>
	);
};

export default MenuLink;
