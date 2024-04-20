import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import "leaflet/dist/leaflet.css"
import "@maptiler/leaflet-maptilersdk";
import mappin from "../../../public/mappin.png"
import axios from 'axios';

const icon = L.icon({
	iconUrl: mappin,
	iconSize: [38, 38], // size
})
const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const params = {
	q: "",
	format: "json",
	addressdetails: "addressdetails",
};

const position = [18.521428, 73.8544541];

const center = {
	lat: 51.505,
	lng: -0.09,
}


const Bookings = () => {
	const [search, setSearch] = useState("");
	const [listPlace, setListPlace] = useState([]);
	const [marker1, setMarker1] = useState([18.521428, 73.8544541]);
	// console.log(marker1.lat,marker1.lon);
	// console.log("marker",marker1);



	function ResetCenterView(props) {
		const map = useMap();

		useEffect(() => {
			if (marker1) {
				map.setView(
					L.latLng(marker1[0], marker1[1]),
					map.getZoom(),
					{
						animate: true,
						duration: .5,
						easeLinearity: .5,
						// noMoveStart?: 
					}
				)
			}
		}, [marker1]);

		return null;
	}



	const handlePlaceSearch = async () => {

		const params = {
			q: search,
			format: "json",
			addressdetails: 1,
			polygon_geojson: 0,
		};
		const queryString = new URLSearchParams(params).toString();
		const requestOptions = {
			method: "GET",
			redirect: "follow",
		};
		fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
			.then((response) => response.text())
			.then((result) => {
				console.log(JSON.parse(result));
				setListPlace(JSON.parse(result));
			})
			.catch((err) => console.log("err: ", err));
	}

	return (
		<div className="flex w-full gap-3">
			<div>
				<MapContainer center={position} zoom={13} className='w-[400px] h-[400px]'>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						// url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=cAmD7YTjS0s4a0eyZVqx"
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					(<Marker position={marker1}>
						<Popup>
							A pretty CSS3 popup. <br /> Easily customizable.
						</Popup>
					</Marker>)
					<ResetCenterView selectPosition={marker1} />
				</MapContainer>
			</div>
			<div className="mb-1 w-full flex flex-col h-12 gap-1">
				<div className="w-full flex h-12 items-center gap-2">
					{/* <label for="default-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Default input</label> */}
					<input type="text" value={search} onChange={(e) => { setSearch(e.target.value) }} id="default-input" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
					<button className=' rounded-md h-10 px-2'
						onClick={handlePlaceSearch}
					>Search</button>
				</div>
				{listPlace.length > 0 &&
					(
						<div className='w-full'>
							<ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
								{listPlace.map((item) => {
									return <li
										type="button"
										key={item?.place_id}
										className="w-full px-4 py-2 cursor-pointer border-b border-gray-200 rounded-t-lg dark:border-gray-600"
										onClick={() => {
											setMarker1([item.lat, item.lon])
										}}
									>
										{item?.
											display_name
										}
									</li>
								})
								}
							</ul>

						</div>
					)}
			</div>
		</div>
	)
};

export default Bookings;
