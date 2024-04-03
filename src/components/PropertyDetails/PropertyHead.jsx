import React from 'react'
import Heading from './Heading'

const PropertyHead = ({ propertyName, city, country, propertyImages }) => {
    return (
        <>
            <div>
                <Heading name={propertyName || ''} city={city} country={country} />
            </div>
            <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
                <img className="object-cover w-full" src={propertyImages} alt="Img" />
            </div>
        </>
    )
}

export default PropertyHead