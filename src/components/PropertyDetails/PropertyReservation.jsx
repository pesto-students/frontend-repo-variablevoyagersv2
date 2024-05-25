import React, { useEffect, useState } from 'react'
import Calendar from '../Calendar';
import FormatPrice from '../FormatPrice';
import { NavLink, useNavigate } from 'react-router-dom';
import { differenceInDays } from 'date-fns';
import axios from 'axios';
import { axiosPrivate } from '../../services/axios.service';
import { selectIsAuthenticated, selectUser } from '../../redux/slices/authSlice';
import { useSelector } from 'react-redux';

const PropertyReservation = ({ price, propertyId }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const [totalPrice, setTotalPrice] = useState(price);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);
      if (dayCount && price) {
        setTotalPrice(dayCount * price);
      } else {
        setTotalPrice(price);
      }
    }
  }, [dateRange, price]);

  const bookThisPlace = async () => {
    if (!isAuthenticated) {
        const currentUrl = window.location.pathname + window.location.search;
        console.log(currentUrl);
        navigate(`/login?redirect=${encodeURIComponent(currentUrl)}`);
        return;
    }

    try {
      const response = await axiosPrivate.post('/booking', {
        startDate: dateRange.startDate.toISOString(),
        endDate: dateRange.endDate.toISOString(),
        propertyId: propertyId,
        userId: user.id,
      });
      const bookingId = response.data;
      console.log(bookingId);
      navigate(`/payment/${bookingId.id}`);
    } catch (error) {
      console.error('Error booking property:', error);
      // Handle error case
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-0 p-4">
        <div className="text-2xl font-semibold">{<FormatPrice price={price} />}</div>
        <div className=" text-neutral-600 ml-2 font-normal">Per Day</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        onChange={(value) => setDateRange(value.selection)}
      />
      <hr />
      <div className="p-4">
        <button
          className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full bg-primary text-white py-2`}
          onClick={bookThisPlace}
        >
          Reserve
        </button>
      </div>
      <hr />
      <div className=" p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>{<FormatPrice price={totalPrice} />}</div>
      </div>
    </div>
  )
}

export default PropertyReservation