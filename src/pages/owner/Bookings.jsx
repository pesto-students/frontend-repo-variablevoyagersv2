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
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-10">
					{bookings.map((ele, idx) => (
						<div key={idx} className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border mt-8">
							<h3 className="sr-only">
								Order placed on <time datetime="2021-07-06">Jul 6, 2021</time>
							</h3>

							<div className="flex flex-1 justify-between items-center border-b border-gray-200 p-4 w-full">
								<div className="">
									<dt className="font-medium text-sm text-gray-900">Date placed</dt>
									<dd className="text-sm text-gray-500">
										<time datetime="2021-07-06">Jul 6, 2021</time>
									</dd>
								</div>
								<div>
									<dt className="font-medium text-sm text-gray-900">Booking Id</dt>
									<dd className="text-sm text-gray-500">{ele?.id.toUpperCase()}</dd>
								</div>
							</div>

							<ul role="list" className="divide-y divide-gray-200">
								<li className="p-4 sm:p-6 divide-y divide-gray-200">
									<div className="flex w-full justify-between">
										{/* <div className="w-20 flex-shrink-0 overflow-hidden rounded-lg"> */}
										<img
											src={ele?.property?.propertyImages[0]?.imgUrl}
											alt={ele?.property?.propertyName}
											className=" w-[80px] h-[80px] object-cover object-center rounded-lg"
										/>
										{/* </div> */}
										<div>
											<div className="flex justify-between">
												<div className="flex flex-col">
													<div className="text-sm">
														<h5>{ele?.property?.propertyName}</h5>
														{/* <div className="font-medium text-gray-900 sm:flex sm:justify-between"> */}

														{/* </div> */}
													</div>
													<div>
														<div className="flex flex-col text-sm">
															<h2>Customer Information</h2>
															<h5>
																{ele?.user?.firstName} {ele?.user?.lastName}
															</h5>
															<p className="mt-2 sm:mt-0">{ele?.user?.email}</p>
															{/* <p className="mt-2 sm:mt-0">+91 932325236236</p>
											<p className="mt-2 sm:mt-0">15 Apr 2024 - 16 Apr 2024 </p> */}
														</div>
													</div>
												</div>
												<div className="text-right">
													<p className="mt-2 sm:mt-0">TOTAL PAID: RS.{ele?.payments[0].amount}</p>
													<div className="flex justify-between">
														<span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
															{ele?.bookingStatus}
														</span>
														<span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
															{ele?.payments && ele.payments.length > 0 ? ele?.payments[0].status : 'Payment not done'}
														</span>
													</div>
													{ele?.bookingStatus === 'AWAITING_OWNER_APPROVAL' && (
														<div className="flex gap-3 text-sm">
															<Button
																buttonType="button"
																size="sm"
																variant="filled"
																innerClass="w-36 !bg-green-400 border-0"
																innerTextClass="text-white"
																onClick={() => handleAcceptReject(ele.id, BOOKING_STATUS.CONFIRMED, PAYMENT_STATUS.SUCCESS)}
															>
																Accept
															</Button>
															<Button
																buttonType="button"
																size="sm"
																variant="filled"
																innerClass="w-36 !bg-error-400 border-0"
																innerTextClass="text-white"
																onClick={() => handleAcceptReject(ele.id, BOOKING_STATUS.CANCELLED, PAYMENT_STATUS.REFUNDED)}
															>
																Reject
															</Button>
														</div>
													)}
												</div>
											</div>
										</div>
									</div>
								</li>
							</ul>
						</div>
					))}
				</div>
			) : (
				<h1>No book from customer yet</h1>
			)}
		</>
	);
};

export default Bookings;
