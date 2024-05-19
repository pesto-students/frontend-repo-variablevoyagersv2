import React from 'react';
import logo from '/logo.png';
import { Link } from 'react-router-dom';

export default function Logo() {
	return (
		<Link to="/" className="hidden md:block cursor-pointer rounded-3xl px-2">
			<img src={logo}  height="180" width="180" alt="Logo" />
		</Link>
	);
}
