import React from 'react'
import ImagePlaceholder from "../../assets/ImagePlaceholder.jpeg"
import Heading from '../PropertyDetails/Heading'
import FormatPrice from '../FormatPrice'

const PropertyCard = ({ property }) => {
    return (
        <>
            <div className="bg-gray-500 mb-2 w-[250px] rounded-lg flex ">
                {property?.propertyImages.length > 0 ? (
                    <img
                        className="rounded-lg object-cover aspect-square w-full"
                        src={property.propertyImages[0]?.imgUrl}
                        alt=""
                    />
                ):(<img
                    className="rounded-lg object-cover aspect-square"
                    src={ImagePlaceholder}
                    alt=""
                />)}
            </div>
            <h3 className="font-bold text-lg">{property?.propertyName}</h3>
            <h2 className="text-gray-500">{property?.city}, {property?.country}</h2>
            {/* <Heading name={property?.propertyName} city={property?.city} country={property?.country}/> */}
            <div className="mt-1">
                <span className="font-bold"><FormatPrice price={property.price}/></span> per day
            </div>
        </>
    )
}

export default PropertyCard