import React from 'react'
import ImagePlaceholder from "../../assets/ImagePlaceholder.jpeg"
// import Heading from '../PropertyDetails/Heading'
import FormatPrice from '../FormatPrice'
import placeholderImage from '/placeholder.jpg';

const PropertyCard = ({ property }) => {
    return (
        <>
            <div className="bg-white rounded-lg shadow-md border border-slate-200 p-4 transition-transform duration-200 hover:scale-105 mb-5">
                <div className="w-full aspect-square mb-2">
                    {property?.propertyImages.length > 0 ? (
                        <img
                            src={property.propertyImages[0]?.imgUrl}
                            alt=""
                            className="object-cover h-full w-full rounded-lg"
                        />
                    ) : (
                        <img
                            src={ImagePlaceholder}
                            alt="Placeholder"
                            className="object-cover h-full w-full rounded-lg"
                        />
                    )}
                </div>
                {/* <h3 className="text-lg font-bold mb-2">title</h3> */}
                <h3 className="font-medium text-lg">{property?.propertyName}</h3>
                <h2 className="text-gray-500">{property?.city}, {property?.country}</h2>
                {/* <Heading name={property?.propertyName} city={property?.city} country={property?.country}/> */}
                <div className="mt-1">
                    <span className="font-medium "><FormatPrice price={property.price} /></span> per day
                </div>
                {/* Add card content here */}
            </div>




        </>
    )
}

export default PropertyCard