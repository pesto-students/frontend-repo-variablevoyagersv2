import React, { useEffect, useState } from 'react';
import { FaEllipsisVertical, FaEye, FaPenToSquare, FaTrash } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/authSlice';
import { axiosPrivate } from '../../services/axios.service';
import Button from '../../components/common/Button';
import { BOOKING_STATUS, PAYMENT_STATUS } from '../../constants/status';
import { ROLES } from '../../constants/roles';

const MyBookings = () => {
	const [loading, setLoading] = useState(false);
	const [bookings, setBookings] = useState([]);
	const user = useSelector(selectUser);
	useEffect(() => {
		getUserBookings();
	}, []);

	const getUserBookings = async () => {
		try {
			setLoading(true);
			const {
				data: { data },
			} = await axiosPrivate.get(`/booking/customer-bookings/${user?.id}`);
			console.log(data.data);
			setBookings(data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
	const handleAcceptReject = async (id, bookingStatus, paymentStatus) => {
		console.log(id);
		const reqObj = {
			bookingStatus,
			paymentStatus,
			role: ROLES.CUSTOMER,
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
					<h2 className="text-2xl font-bold leading-7 text-gray-50 sm:truncate sm:text-3xl sm:tracking-tight">Your bookings</h2>
					<p className="mt-1 text-sm text-gray-50">A list of all the bookings in your account.</p>
				</div>
			</div>
			<div className="shadow sm:overflow-hidden sm:rounded-md">
				<div className="space-y-6 bg-white px-4 py-6 sm:p-6">
					<div className="flow-root">
						<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
							<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
								{bookings.length > 0 ? (
									<table className="min-w-full divide-y divide-gray-300 overflow-hidden">
										<thead>
											<tr>
												<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
													Property Name
												</th>
												<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
													Event Date
												</th>
												<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
													Date placed
												</th>
												<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
													Total Amount
												</th>
												<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
													Booking Status
												</th>
												<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
													Payment Status
												</th>
												<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
													Actions
												</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-gray-200 bg-white">
											{bookings.map((ele, idx) => (
												<tr key={idx}>
													<td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
														<div className="flex items-center">
															<div className="h-14 w-14 flex-shrink-0">
																<img
																	className="h-14 w-14 rounded-md"
																	src="https://ik.imagekit.io/venueBooking/property/propertyImages-1711808420083-957408833_Lo90KcTG6"
																	alt=""
																/>
															</div>

															<div className="ml-4">
																<div className="font-medium text-gray-900">{ele?.property?.propertyName}</div>
																{/* <div className="mt-1 text-gray-500">{property.description}</div> */}
															</div>
														</div>
													</td>
													<td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">15 Apr 2024 - 24 Apr 2-24</td>
													<td className="whites pace-nowrap px-3 py-5 text-sm text-gray-500">{ele?.bookingDate}</td>
													<td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
														<div className="text-gray-900">Rs.5000</div>
													</td>

													<td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
														<span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
															{/* Pending */}
															{ele?.bookingStatus}
														</span>
													</td>

													<td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
														<span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
															{/* Pending */}
															{ele?.payments && ele.payments.length > 0 ? ele?.payments[0].status : 'Payment not done'}
														</span>
													</td>
													{ele?.bookingStatus === BOOKING_STATUS.AWAITING_OWNER_APPROVAL ||
														(ele?.bookingStatus === BOOKING_STATUS.CONFIRMED && (
															<Button
																buttonType="button"
																size="sm"
																variant="filled"
																innerClass="w-36 !bg-error-400 border-0"
																innerTextClass="text-white"
																onClick={() => handleAcceptReject(ele.id, BOOKING_STATUS.CANCELLED, PAYMENT_STATUS.REFUNDED)}
															>
																Cancel
															</Button>
														))}
													{/* <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
														<div
															className="flex justify-center relative z-2"
															onMouseEnter={() => setHoveredRowIndex(idx)}
															onMouseLeave={() => setHoveredRowIndex(null)}
														>
															<FaEllipsisVertical className="text-indigo-600 hover:text-indigo-900" />

															{hoveredRowIndex === idx && (
																<div
																	className="absolute top-[-10px] right-[-10px]  bg-white border rounded-md z-1 animate-slideIn opacity-0"
																	style={{ '--delay': idx * 0 + 's' }}
																>
																	<ul className="flex ">
																		<li className="p-3 hover:bg-gray-100 cursor-pointer flex items-center">
																			<FaEye />
																		</li>
																		<li className="p-3 hover:bg-gray-100 cursor-pointer flex items-center">
																			<FaPenToSquare />
																		</li>
																		<li className="p-3 hover:bg-gray-100 cursor-pointer flex items-center">
																			<FaTrash className="text-error-500" />
																		</li>
																	</ul>
																</div>
															)}
														</div>
													</td> */}
												</tr>
											))}
										</tbody>
									</table>
								) : (
									<h1>No book yet</h1>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MyBookings;
