import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '@maptiler/leaflet-maptilersdk';
import mappin from '../../../public/mappin.png';
import axios from 'axios';
import { axiosPrivate } from '../../services/axios.service';
import { selectUser } from '../../redux/slices/authSlice';
import { useSelector } from 'react-redux';
import Button from '../../components/common/Button';
import { BOOKING_STATUS, PAYMENT_STATUS } from '../../constants/status';
import { ROLES } from '../../constants/roles';
import { format } from 'date-fns';
import { formatDateRange } from '../../utils';
import { Link } from 'react-router-dom';

const icon = L.icon({
	iconUrl: mappin,
	iconSize: [38, 38], // size
});

// const map = L.map('map', {
// 	center: L.latLng(49.2125578, 16.62662018),
// 	zoom: 14,
// });

// const mtLayer = new L.MaptilerLayer({
// 	// Get your free API key at https://cloud.maptiler.com
// 	apiKey: "cAmD7YTjS0s4a0eyZVqx",
// }).addTo(map);

const position = [51.505, -0.09];

const Bookings = () => {
	const [loading, setLoading] = useState(false);
	const [bookings, setBookings] = useState([]);
	const user = useSelector(selectUser);
	useEffect(() => {
		getBookings();
	}, []);

	const getBookings = async () => {
		try {
			setLoading(true);
			const {
				data: { data },
			} = await axiosPrivate.get(`/booking/owner-bookings/${user?.id}`);
			console.log(data);
			setBookings(data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	const handleAcceptReject = async (id, bookingStatus, paymentStatus) => {
		console.log(id);
		const reqObj = {
			bookingStatus,
			paymentStatus,
			role: ROLES.OWNER,
		};
		const {
			data: { data },
		} = await axiosPrivate.put(`/booking/${id}`, reqObj);
		console.log(data);
	};

	return (
		<>
			<div className="md:flex md:items-center md:justify-between mb-8">
				<div className="min-w-0 flex-1">
					<h2 className="text-2xl font-bold leading-7 text-gray-50 sm:truncate sm:text-3xl sm:tracking-tight">Bookings</h2>
					<p className="mt-1 text-sm text-gray-50">A list of all the bookings of your properties.</p>
				</div>
			</div>
			{bookings.length > 0 ? (
				<ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8 ">
					{bookings.map((ele, idx) => (
						<li key={idx} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
							<Link to={`/property-detail/${ele?.property?.id}`}>
								<div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
									<img
										src={ele?.property?.propertyImages[0]?.imgUrl}
										alt={ele?.property?.propertyName}
										className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
									/>
									<div className="text-sm font-medium leading-6 text-gray-900">{ele?.property?.propertyName}</div>
								</div>
							</Link>
							<dl className=" px-6 py-3 ">
								<div>
									<h3 className="mb-4 text-sm font-medium leading-6 text-gray-900">Booking Info</h3>
									<div className="-my-3 divide-y divide-gray-100 text-sm leading-6 rounded-xl border border-gray-200 px-2">
										<div className="flex justify-between gap-x-4 py-2">
											<dt className="text-gray-500 whitespace-nowrap">Booking Id</dt>
											<dd className="text-gray-700 text-sm whitespace-nowrap">
												<time dateTime="2023-01-23">{ele?.id.substring(0, 8).toUpperCase()}</time>
											</dd>
										</div>

										<div className="flex justify-between gap-x-4 py-2">
											<dt className="text-gray-500">Booking Date</dt>
											<dd className="text-gray-700">
												<time dateTime="2023-01-23">{format(new Date(ele?.createdAt), 'dd MMMM yyyy')}</time>
											</dd>
										</div>
										<div className="flex justify-between gap-x-4 py-2">
											<dt className="text-gray-500">Event Date</dt>
											<dd className="text-gray-700">
												<time dateTime="2023-01-23">{formatDateRange(ele?.startDate, ele?.endDate)}</time>
											</dd>
										</div>
										<div className="flex justify-between gap-x-4 py-2">
											<dt className="text-gray-500">Booking Status</dt>
											<dd className="flex items-start gap-x-2">
												<div className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
													{ele?.bookingStatus}
												</div>
											</dd>
										</div>
										<div className="flex justify-between gap-x-4 py-2">
											<dt className="text-gray-500">Amount</dt>
											<dd className="flex items-start gap-x-2">
												<div className="font-medium text-gray-900">RS.{ele?.payments[0].amount}</div>
												<div className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
													{ele?.payments[0].status}
												</div>
											</dd>
										</div>
									</div>
								</div>
								<div className="mt-6">
									<h3 className="mb-4 text-sm font-medium leading-6 text-gray-900">Customer Info</h3>
									<div className="-my-3 divide-y divide-gray-100 text-sm leading-6 rounded-xl border border-gray-200 px-2">
										<div className="flex justify-between gap-x-4 py-2">
											<dt className="text-gray-500">Name</dt>
											<dd className="flex items-start gap-x-2">
												<div className="font-medium text-gray-900">
													{ele?.user?.firstName} {ele?.user?.lastName}
												</div>
											</dd>
										</div>
										<div className="flex justify-between gap-x-4 py-2">
											<dt className="text-gray-500">Email</dt>
											<dd className="flex items-start gap-x-2">
												<div className="font-medium text-gray-900">{ele?.user?.email}</div>
											</dd>
										</div>
										<div className="flex justify-between gap-x-4 py-2">
											<dt className="text-gray-500">Phone</dt>
											<dd className="flex items-start gap-x-2">
												<div className="font-medium text-gray-900">{ele?.user?.phone}</div>
											</dd>
										</div>
									</div>
								</div>
								{/* {ele?.bookingStatus === 'AWAITING_OWNER_APPROVAL' && ( */}
								<div className="flex justify-between gap-x-4 text-sm py-3 mt-6">
									<Button
										buttonType="button"
										size="sm"
										variant="filled"
										innerClass="w-36 bg-green-400 border-0"
										innerTextClass="text-white"
										onClick={() => handleAcceptReject(ele.id, BOOKING_STATUS.CONFIRMED, PAYMENT_STATUS.SUCCESS)}
										disabled={ele?.bookingStatus === BOOKING_STATUS.CONFIRMED}
									>
										Accept
									</Button>
									<Button
										buttonType="button"
										size="sm"
										variant="filled"
										innerClass="w-36 bg-error-400 border-0"
										innerTextClass="text-white"
										onClick={() => handleAcceptReject(ele.id, BOOKING_STATUS.CANCELLED, PAYMENT_STATUS.REFUNDED)}
										disabled={ele?.bookingStatus === BOOKING_STATUS.CANCELLED}
									>
										Reject
									</Button>
								</div>
								{/* )} */}
							</dl>
						</li>
					))}
				</ul>
			) : (
				<h1>No book from customer yet</h1>
			)}
		</>
	);
};

export default Bookings;
