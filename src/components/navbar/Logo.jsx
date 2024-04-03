import React from 'react';
import logo from '/Logo2.png';
import { Link } from 'react-router-dom';

export default function Logo() {
	return (
		<Link to="/">
			<img src={logo} className="hidden sm:block cursor-pointer" height="180" width="180" alt="Logo" />
		</Link>
	);
}
