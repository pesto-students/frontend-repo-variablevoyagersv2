import React from 'react';
import placeholder from '../../../public/placeholder.jpg';
import Avatar from '../Avatar';
import { FaLocationDot } from 'react-icons/fa6';
// import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import mappin from '../../../public/mappin.png';
import { CATEGORIES } from '../../constants/categories';

const icon = L.icon({
	iconUrl: mappin,
	iconSize: [38, 38], // size
});

const position = [18.521428, 73.8544541];

const PropertyDescriptions = ({ ownerName, capacity, description, avatar, address, tags, amenities }) => {
	return (
		<>
			<div className="flex flex-col gap-5">
				<div className="flex flex-row">
					{tags?.map((tag) => (
						<span key={tag.id} className="w-fit bg-primary text-white text-xs me-2 px-2.5 py-1.5 rounded-full">
							{tag.title}
						</span>
					))}
				</div>
				{/* {console.log(tags)} */}
				<div className="flex">
					<div className="mr-4 mt-0.5">
						<Avatar src={avatar} h="40" w="45" />
					</div>
					<div>
						<div className="text-xl font-medium flex flex-row items-center gap-2">{ownerName && <div>Owned By {ownerName}</div>}</div>
						<div className="flex flex-row items-center gap-4 text-md text-neutral-600">{capacity && <div>{capacity} Capacity</div>}</div>
					</div>
				</div>
				<hr className="text-gray-100" />
				<div className="text-md font-light text-neutral-600">
					<h1 className="text-black font-medium text-xl mb-3">Description</h1>
					{description}
				</div>
				<hr className="text-gray-100" />
				<div className="text-md font-light text-neutral-600">
					<h1 className="text-black font-medium text-xl">Address</h1>
					<div className="flex gap-2 items-center mt-3">
						<FaLocationDot />
						{address}
					</div>
				</div>
				<hr className="text-gray-100" />
				<div className="font-light text-neutral-500 z-0 relative">
					<h1 className="text-black text-xl  font-medium mb-2">What this place offers</h1>
					{amenities?.map((amenity, index) => (
						<div key={index} className="flex ml-2 mt-3 gap-2 items-center">
							<span className=" w-1.5 h-1.5 rounded-full bg-gray-800"></span>
							<div className="text-black ml-3 text-lg"></div>
							{amenity}
						</div>
					))}
					{/* <h1 className="text-black font-medium mb-2">Location</h1>
					<MapContainer center={position} zoom={17} className="w-full h-[300px] rounded-md">
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							// url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=cAmD7YTjS0s4a0eyZVqx"
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						<Marker position={position}>
							<Popup>
								A pretty CSS3 popup. <br /> Easily customizable.
							</Popup>
						</Marker>
					</MapContainer> */}
				</div>
			</div>
		</>
	);
};

export default PropertyDescriptions;
