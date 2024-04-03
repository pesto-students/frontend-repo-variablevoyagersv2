import React from 'react'

function Heading({ name, city , country}) {
    return (
        <>
            <h3 className="font-bold text-xl">{name}</h3>
            <h2 className="text-sm text-gray-500">{city}, {country}</h2>
        </>
    )
}

export default Heading