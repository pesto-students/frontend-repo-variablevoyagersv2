import React from 'react'
import BookingHead from '../../components/PropertyDetails/BookingHead'

const BookingClint = ({property}) => {
    return (
        <div className="max-w-screen-lg mx-auto">
            <div className="flex flex-col gap-6">
                <BookingHead
                    title={property.propertyName}
                />
            </div>
        </div>
    )
}

export default BookingClint