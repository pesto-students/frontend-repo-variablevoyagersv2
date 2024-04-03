import React from 'react'
import ImagePlaceholder from "../../assets/ImagePlaceholder.jpeg"
import Heading from '../PropertyDetails/Heading'

const PropertyCard = ({ property }) => {
    return (
        <>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
                {property?.propertyImages.length > 0 ? (
                    <img
                        className="rounded-2xl object-cover aspect-square"
                        src={property.propertyImages[0]?.imgUrl}
                        alt=""
                    />
                ):(<img
                    className="rounded-2xl object-cover aspect-square"
                    src={ImagePlaceholder}
                    alt=""
                />)}
            </div>
            <Heading name={property?.propertyName} city={property?.city} country={property?.country}/>
            <div className="mt-1">
                <span className="font-bold">Rs. {property?.price}</span> per day
            </div>
        </>
    )
}

export default PropertyCard