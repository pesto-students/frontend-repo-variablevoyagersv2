import React from 'react'

const PropertyCard = ({property}) => {
    return (
        <>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
                <img
                    className="rounded-2xl object-cover aspect-square"
                    src="https://ik.imagekit.io/venueBooking/Property/avatar-1709318908522-289822310_wpUxtfZfR?updatedAt=1709318913836"
                    alt=""
                />
            </div>
            <h2 className="font-bold">Debidanga, Siliguri</h2>
            <h3 className="text-sm text-gray-500">{property?.propertyName}</h3>
            <div className="mt-1">
                <span className="font-bold">Rs. 1000</span> per day
            </div>
        </>
    )
}

export default PropertyCard