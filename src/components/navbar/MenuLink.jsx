import React from 'react';
import { NavLink } from 'react-router-dom';

const MenuLink = ({ to, onClick, children }) => {
	return (
		<NavLink
			to={to}
			className={({ isActive }) =>
				isActive ? 'block px-6 md:px-3 py-2  bg-primary text-white md:rounded-md font-bold' : 'block px-6 md:px-3 py-2 text-primary font-bold hover:bg-primary hover:text-white sm:rounded-md'
			}
			onClick={onClick}
		>
			{children}
		</NavLink>
	);
};

export default MenuLink;
