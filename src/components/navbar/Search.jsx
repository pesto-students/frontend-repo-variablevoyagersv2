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

	const indianCities = ['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Surat', 'Pune', 'Jaipur'];

	return (
		<div className="w-max-[600px] md:w-[600px] sm:w-[400px] w-[300px] grid grid-cols-8 md:grid-cols-12 gap-4">
			<div className="md:col-span-4 col-span-8">
				<select
					id="city"
					value={selectedCity}
					onChange={handleCityChange}
					className="border-none appearance-none w-full py-4 px-6 rounded-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				>
					<option value="">Select City</option>
					{indianCities.map((city) => (
						<option key={city} value={city}>
							{city}
						</option>
					))}
				</select>
			</div>
			<div className="md:col-span-8 col-span-8">
				<div className="relative">
					{/* <input type="search" id="search" className="shadow appearance-none w-full py-2 px-3 bg-white leading-tight focus:outline-none focus:shadow-outline rounded-none  " placeholder="Search venues..." /> */}
					<input
						type="text"
						value={searchQuery}
						onChange={handleSearchChange}
						className="block w-full !py-4 !px-6 bg-white leading-tight focus:outline-none focus:shadow-outline !rounded-full !border-none "
						placeholder="Search venues..."
					/>
					<div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none">
						<svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
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
