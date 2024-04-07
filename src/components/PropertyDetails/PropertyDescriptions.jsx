import React from 'react'
import placeholder from '../../../public/placeholder.jpg';
import Avatar from '../Avatar';
import { FaLocationDot } from 'react-icons/fa6';

const PropertyDescriptions = ({ ownerName, capacity, description, avatar, address }) => {
    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold flex flex-row items-center gap-2">
                    {ownerName && <div>Hosted By {ownerName}</div>}
                    <Avatar src={avatar} />
                </div>
                <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                    {capacity && <div>{capacity} Capacity</div>}
                </div>
                <hr />
                <div className="text-lg font-light text-neutral-500">
                <h1 className='text-black font-bold'>Description</h1>
                    {description}
                </div>
                <hr />
                <div className="text-lg font-light text-neutral-500">
                    <h1 className='text-black font-bold'>Address</h1>
                    <div className='flex gap-2 items-center'>
                        <FaLocationDot />
                        {address}
                    </div>
                </div>
                <hr />
                <div className="text-lg font-light text-neutral-500">
                    <h1 className='text-black font-bold'>Location</h1>
                    <div className='flex gap-2 items-center'>
                        
                    </div>
                </div>
                

            </div>
        </div>
    )
}

export default PropertyDescriptions