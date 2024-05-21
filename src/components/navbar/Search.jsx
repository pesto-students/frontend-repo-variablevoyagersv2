import React, { useState } from 'react';

const VenueSearch = ({ onCitySelect, onSearchVenues }) => {
	const [selectedCity, setSelectedCity] = useState('');
	const [searchQuery, setSearchQuery] = useState('');

	const handleCityChange = (event) => {
		setSelectedCity(event.target.value);
		onCitySelect(event.target.value);
	};
	console.log(selectedCity);

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
		onSearchVenues(event.target.value);
	};
	console.log(searchQuery);

	const indianCities = [
		'Mumbai',
		'Delhi',
		'Bengaluru',
		'Hyderabad',
		'Ahmedabad',
		'Chennai',
		'Kolkata',
		'Surat',
		'Pune',
		'Jaipur',
	];

	return (
		<div className="flex flex-col md:flex-row items-center justify-center md:space-x-4 p-4">
			<div className="mb-4 md:mb-0">
				<select
					id="city"
					value={selectedCity}
					onChange={handleCityChange}
					className="shadow appearance-none w-full py-4 px-6 rounded-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				>
					<option value="">Select City</option>
					{indianCities.map((city) => (
						<option key={city} value={city}>
							{city}
						</option>
					))}
				</select>
			</div>
			<div>
				<div className="relative">
					{/* <input type="search" id="search" className="shadow appearance-none w-full py-2 px-3 bg-white leading-tight focus:outline-none focus:shadow-outline rounded-none  " placeholder="Search venues..." /> */}
					<input
						type="text"
						id="search"
						value={searchQuery}
						onChange={handleSearchChange}
						style={{
							width: "100%",
							borderWidth: "0px",
							padding: "1rem 1.5rem",
							lineHeight: "1.25",
							borderRadius: "9999px",
							
						}}
						// className="shadow appearance-none w-full py-2 px-3 bg-white leading-tight focus:outline-none focus:shadow-outline rounded-none "
						placeholder="Search venues..."

					/>
					<div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none">
						<svg
							className="h-5 w-5 text-gray-400"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VenueSearch;