import React from 'react'
import Calendar from '../Calendar';
import FormatPrice from '../FormatPrice';
import { NavLink } from 'react-router-dom';


const PropertyReservation = ({ price, totalPrice, onChangeDate, dateRange, disabledDates, onSubmit }) => {

    return (

        <div className="bg-white rounded-xl shadow-lg border-[1px] border-neutral-200 overflow-hidden">
            <div className="flex flex-row items-center gap-0 p-4">
                <div className="text-2xl font-semibold">{<FormatPrice price={price} />}/</div>
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
                <NavLink to="/payment/fytyuyu">
                    <button
                        className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full bg-primary text-white py-2`}
                        label="Reserve"
                        // onClick={onSubmit}
                    >
                        Reserve
                    </button>
                </NavLink>

            </div>

            <hr />
            <div
                className=" p-4 flex flex-row items-center justify-between font-semibold text-lg"
            >
                <div>
                    Total
                </div>
                <div>
                    {<FormatPrice price={totalPrice} />}
                </div>
            </div>
        </div>
    )
}

export default PropertyReservation