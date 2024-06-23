import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
	const currentYear = new Date().getFullYear();
	return (
		<footer className="bg-white mt-10 shadow md:px-8 lg:px-20 border-t border-gray-50">
			<div className="w-full  p-4 md:p-0 md:py-8">
				<div className="sm:flex sm:items-center sm:justify-between">
					<span className="block text-sm text-gray-500 sm:text-center ">
						© {currentYear}{' '}
						<Link to="/" className="hover:underline">
							BookMyVenue
						</Link>
						. All Rights Reserved.
					</span>
					<ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 ">
						<li>
							<a href="#" className="hover:underline me-4 md:me-6">
								Privacy Policy
							</a>
						</li>
						<li>
							<a href="#" className="hover:underline me-4 md:me-6">
								Terms of Service
							</a>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
