import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Container';
const HomePage = () => {
	return (
		<Container >
			<div className="mt-32">
			<div className="grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{[0, 1, 2, 3, 4].map((ele, idx) => (
					<Link key={idx} to="/">
						<div className="bg-gray-500 mb-2 rounded-2xl flex">
							<img
								className="rounded-2xl object-cover aspect-square"
								src="https://ik.imagekit.io/venueBooking/Property/avatar-1709318908522-289822310_wpUxtfZfR?updatedAt=1709318913836"
								alt=""
							/>
						</div>
						<h2 className="font-bold">Debidanga, Siliguri</h2>
						<h3 className="text-sm text-gray-500">Banquet Hall</h3>
						<div className="mt-1">
							<span className="font-bold">Rs. 1000</span> per day
						</div>
					</Link>
				))}
			</div>	
			</div>
		</Container>
	);
};

export default HomePage;
