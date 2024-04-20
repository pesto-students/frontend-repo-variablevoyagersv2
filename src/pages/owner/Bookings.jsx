import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '@maptiler/leaflet-maptilersdk';
import mappin from '../../../public/mappin.png';
import axios from 'axios';

const icon = L.icon({
	iconUrl: mappin,
	iconSize: [38, 38], // size
});

// const map = L.map('map', {
// 	center: L.latLng(49.2125578, 16.62662018),
// 	zoom: 14,
// });

// const mtLayer = new L.MaptilerLayer({
// 	// Get your free API key at https://cloud.maptiler.com
// 	apiKey: "cAmD7YTjS0s4a0eyZVqx",
// }).addTo(map);

const position = [51.505, -0.09];

const Bookings = () => {
	const [search, setSearch] = useState('');
	const [listPlace, setListPlace] = useState([]);
	const [marker1, setMarker1] = useState([18.5970253, 73.7315771]);

	function ResetCenterView(props) {
		const map = useMap();

		useEffect(() => {
			if (marker1) {
				map.setView(L.latLng(marker1[0], marker1[1]), map.getZoom(), {
					animate: true,
					duration: 0.5,
					easeLinearity: 0.5,
					// noMoveStart?:
				});
			}
		}, [marker1]);

		return null;
	}

	const handlePlaceSearch = async () => {
		console.log(search);
		if (search) {
			getLatLan(search);
		}
	};

	const getLatLan = async (searchText) => {
		const options = {
			method: 'GET',
			url: 'https://map-geocoding.p.rapidapi.com/json',
			params: {
				address: searchText,
			},
			headers: {
				'X-RapidAPI-Key': 'dcd9e3b3bfmshc893051d0ebf3fcp1b0eedjsn423999f05abc',
				'X-RapidAPI-Host': 'map-geocoding.p.rapidapi.com',
			},
		};

		try {
			const response = await axios.request(options);
			console.log(response.data.results);
			const latlan = response.data.results[0].geometry.location;
			await getAllAddress(latlan);
			// setListPlace(response.data);
		} catch (error) {
			console.error(error);
		}
	};
	const getAllAddress = async (latlan) => {
		console.log(latlan);
		console.log(`${latlan.lat},${latlan.lng}`);
		const options = {
			method: 'GET',
			url: 'https://map-geocoding.p.rapidapi.com/json',
			params: {
				// address: search

				// latlng: '18.5912716,73.73890899999999'
				latlng: `${latlan.lat},${latlan.lng}`,
			},
			headers: {
				'X-RapidAPI-Key': 'dcd9e3b3bfmshc893051d0ebf3fcp1b0eedjsn423999f05abc',
				'X-RapidAPI-Host': 'map-geocoding.p.rapidapi.com',
			},
		};

		try {
			const response = await axios.request(options);
			console.log(response.data.results);
			setListPlace(response.data.results);
		} catch (error) {
			console.error(error);
		}
	};
	const setMarker = (address) => {
		let arr = [];
		const latlan = address.geometry.location;
		arr.push(latlan.lat);
		arr.push(latlan.lng);
		console.log(arr);
		setMarker1(arr);
	};
	return (
		<>
			<div className="md:flex md:items-center md:justify-between mb-8">
				<div className="min-w-0 flex-1">
					<h2 className="text-2xl font-bold leading-7 text-gray-50 sm:truncate sm:text-3xl sm:tracking-tight">Bookings</h2>
					<p className="mt-1 text-sm text-gray-50">A list of all the bookings of your properties.</p>
				</div>
			</div>

			{[1, 2, 3, 4, 5].map((ele, idx) => (
				<div key={idx} className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border mt-8">
					<h3 className="sr-only">
						Order placed on <time datetime="2021-07-06">Jul 6, 2021</time>
					</h3>

					<div className="flex flex-1 justify-between items-center border-b border-gray-200 p-4 w-full">
						<div>
							<dt className="font-medium text-gray-900">Order number</dt>
							<dd className="mt-1 text-gray-500">WU88191111</dd>
						</div>

						<div className="">
							<dt className="font-medium text-gray-900">Date placed</dt>
							<dd className="mt-1 text-gray-500">
								<time datetime="2021-07-06">Jul 6, 2021</time>
							</dd>
						</div>
					</div>

					<ul role="list" className="divide-y divide-gray-200">
						<li className="p-4 sm:p-6">
							<div className="flex flex-1 ">
								<div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
									<img
										src="https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-01.jpg"
										alt="Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps."
										className="h-full w-full object-cover object-center"
									/>
								</div>
								<div className="ml-6 w-full flex flex-col">
									<div className="text-sm">
										<div className="font-medium text-gray-900 sm:flex sm:justify-between">
											<h5>Banquet Hall</h5>
											<p className="mt-2 sm:mt-0">
												Rs.5000
												<span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
													Confirmed
												</span>
											</p>
										</div>
									</div>
									<div className="flex flex-col text-sm">
										<h2>Customer Information</h2>
										<h5>Mehul Bhai</h5>
										<p className="mt-2 sm:mt-0">mehul@gmail.com</p>
										<p className="mt-2 sm:mt-0">+91 932325236236</p>
										<p className="mt-2 sm:mt-0">15 Apr 2024 - 16 Apr 2024 </p>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
			))}
		</>
	);
};

export default Bookings;
