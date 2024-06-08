import React, { useEffect, useState } from 'react';
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
		<div className="flex w-full gap-3">
			<div>
				<MapContainer center={position} zoom={13} className="w-[400px] h-[400px]">
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						// url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=cAmD7YTjS0s4a0eyZVqx"
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					(
					<Marker position={marker1}>
						<Popup>
							A pretty CSS3 popup. <br /> Easily customizable.
						</Popup>
					</Marker>
					)
					<ResetCenterView selectPosition={marker1} />
				</MapContainer>
			</div>

			<div className="mb-1 w-full flex flex-col h-12 gap-1">
				<div className="w-full flex h-12 items-center gap-2">
					{/* <label for="default-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Default input</label> */}
					<input
						type="text"
						value={search}
						onChange={(e) => {
							setSearch(e.target.value);
						}}
						id="default-input"
						className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					/>
					<button className=" rounded-md h-10 px-2" onClick={handlePlaceSearch}>
						Search
					</button>
				</div>
				{listPlace.length > 0 && (
					<div className="w-full">
						<ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
							{listPlace.map((item) => {
								return (
									<li
										type="button"
										key={item?.place_id}
										className="w-full px-4 py-2 cursor-pointer border-b border-gray-200 rounded-t-lg dark:border-gray-600"
										onClick={() => {
											setMarker(item);
										}}
									>
										{item?.formatted_address}
									</li>
								);
							})}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default Bookings;
