import React from 'react'
import placeholder from '../../../public/placeholder.jpg';
import Avatar from '../Avatar';
import { FaLocationDot } from 'react-icons/fa6';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import "leaflet/dist/leaflet.css"
import mappin from "../../../public/mappin.png"

const icon = L.icon({
    iconUrl: mappin,
    iconSize: [38, 38], // size
})

const position = [18.521428, 73.8544541];

const PropertyDescriptions = ({ ownerName, capacity, description, avatar, address }) => {
    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-5">
                <div>
                    <div className="text-2xl font-semibold flex flex-row items-center gap-2">
                        {ownerName && <div>Hosted By {ownerName}</div>}
                        <Avatar src={avatar} h="30" w="35"/>
                    </div>
                    <div className="flex flex-row items-center gap-4 text-md font-light text-neutral-500">
                        {capacity && <div>{capacity} Capacity</div>}
                    </div>
                </div>
                <hr />
                <div className="text-lg font-light text-neutral-500">
                    <h1 className='text-black font-semibold text-2xl'>Description</h1>
                    {description}
                </div>
                <hr />
                <div className="text-lg font-light text-neutral-500">
                    <h1 className='text-black font-semibold text-2xl'>Address</h1>
                    <div className='flex gap-2 items-center'>
                        <FaLocationDot />
                        {address}
                    </div>
                </div>
                <hr />
                <div className="text-2xl font-light text-neutral-500 z-0 relative">
                    <h1 className='text-black font-semibold'>Location</h1>
                    <MapContainer center={position} zoom={17} className='w-full h-[300px] rounded-md'>
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
                        {/* <ResetCenterView selectPosition={marker1} /> */}
                    </MapContainer>
                </div>
            </div>
        </div>
    )
}

export default PropertyDescriptions