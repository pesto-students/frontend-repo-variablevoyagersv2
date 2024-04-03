import React from 'react'
import Calendar from '../Calendar';
import FormatPrice from '../FormatPrice';


const PropertyReservation = ({ price, totalPrice, onChangeDate, dateRange, disabledDates, onSubmit }) => {
    
    
    return (

        <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
            <div className="flex flex-row items-center gap-1 p-4">
                <div className="text-2xl font-semibold">{<FormatPrice price={price}/>} /</div>
                <div className="font-light text-neutral-600 ">Night</div>
            </div>
            <hr />
            <Calendar
                value={dateRange}
                disabledDates={disabledDates}
                onChange={(value) => onChangeDate(value.selection)}
            />
            <hr />
            <div className="p-4">
                <button
                    className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full bg-primary text-white py-2`}
                    label="Reserve"
                // onClick={onSubmit}
                >
                    Reserve
                </button> 

            </div>
            
            <hr />
            <div
                className=" p-4 flex flex-row items-center justify-between font-semibold text-lg"
            >
                <div>
                    Total
                </div>
                <div>
                    {<FormatPrice price={totalPrice}/>}
                </div>
            </div>
        </div>
    )
}

export default PropertyReservation