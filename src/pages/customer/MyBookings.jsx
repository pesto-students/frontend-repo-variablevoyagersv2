import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/authSlice';
import { axiosPrivate } from '../../services/axios.service';
import Button from '../../components/common/Button';
import { BOOKING_STATUS, PAYMENT_STATUS } from '../../constants/status';
import { ROLES } from '../../constants/roles';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { formatDateRange, formatPrice } from '../../utils';
import StatusBadge from '../../components/common/StatusBadge';
import ConfirmModal from '../../components/common/ConfirmModal';

import { toast } from 'react-toastify';
import Pagination from '../../components/common/Pagination';
import Loader from '../../components/common/Loader';
import { PiWarningCircleFill } from 'react-icons/pi';
import { RiCalendarCloseLine } from 'react-icons/ri';
import EmptyState from '../../components/common/EmptyState';

const MyBookings = () => {
	const user = useSelector(selectUser);
	const [loading, setLoading] = useState(false);
	const [bookings, setBookings] = useState([]);

	const [page, setPage] = useState(1);
	const [totalCount, setTotalCount] = useState(0);
	const limit = 10;

	const [showModal, setShowModal] = useState(false);
	const [selectedBookingId, setSelectedBookingId] = useState(null);

	const getUserBookings = useCallback(async () => {
		try {
			setLoading(true);
			const { data } = await axiosPrivate.get(`/booking/customer-bookings/${user?.id}?page=${page}&limit=${limit}`);
			console.log(data);

			setTotalCount(data.totalCount);
			setBookings(data.data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}, [page, user?.id]);

	useEffect(() => {
		getUserBookings();
	}, [getUserBookings, page, user?.id]);

	const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
	// const handleAcceptReject = async (id, bookingStatus, paymentStatus) => {
	// 	console.log(id);
	// 	const reqObj = {
	// 		bookingStatus,
	// 		paymentStatus,
	// 		role: ROLES.CUSTOMER,
	// 	};
	// 	const {
	// 		data: { data },
	// 	} = await axiosPrivate.put(`/booking/${id}`, reqObj);
	// 	console.log(data);
	// };

	const handleAcceptReject = (bookingId) => {
		console.log('here');
		setSelectedBookingId(bookingId);
		setShowModal(true);
	};

	const handleConfirm = async () => {
		try {
			setLoading(true);
			const reqObj = {
				bookingStatus: BOOKING_STATUS.CANCELLED,
				paymentStatus: PAYMENT_STATUS.REFUNDED,
				role: ROLES.CUSTOMER,
			};
			const { data } = await axiosPrivate.put(`/booking/${selectedBookingId}`, reqObj);
			if (data.success) {
				toast.success('Booking is cancelled');
				getUserBookings();
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.error('Error cancelling booking:', error);
			toast.error('Something went wrong');
		} finally {
			setLoading(false);
			setShowModal(false);
			setSelectedBookingId(null);
		}
	};

	const handleCancel = () => {
		setShowModal(false);
		setSelectedBookingId(null);
	};

	const addReview = async (id) => {
		console.log(id);

		try {
			const reqObj = {
				rating: 3,
				review: 'It was a good experience',
				userId: user?.id,
				propertyId: id,
			};
			const { data } = await axiosPrivate.post(`/review`, reqObj);
			console.log(data);
			// if (data.success) {
			// 	toast.success('Review added');
			// } else {
			// 	toast.error(data.message);
			// }
		} catch (err) {
			console.error(err);
		}
	};

	if (loading) {
		return <Loader />;
	}

	return (
		<>
			<div className="md:flex md:items-center md:justify-between mb-8">
				<div className="min-w-0 flex-1">
					<h2 className="text-2xl font-bold leading-7 text-gray-50 sm:truncate sm:text-3xl sm:tracking-tight">Your bookings</h2>
					<p className="mt-1 text-sm text-gray-50">A list of all the bookings in your account.</p>
				</div>
			</div>
			{bookings.length > 0 ? (
				<div className="shadow sm:overflow-hidden sm:rounded-md">
					<div className="space-y-6 bg-white px-4 py-6 sm:p-6">
						<div className="flow-root">
							<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
								<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
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
													Date Placed
												</th>
												<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
													Property Price
												</th>
												<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
													Amount Paid
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
														<Link to={`/property-detail/${ele?.property?.id}`}>
															<div className="flex items-center">
																<div className="h-14 w-14 flex-shrink-0">
																	<img
																		className="h-14 w-14 rounded-md"
																		src={ele?.property?.propertyImages[0]?.imgUrl}
																		alt={ele?.property?.propertyName}
																	/>
																</div>

																<div className="ml-4">
																	<div className="font-medium text-gray-900">{ele?.property?.propertyName}</div>
																	{/* <div className="mt-1 text-gray-500">{property.description}</div> */}
																</div>
															</div>
														</Link>
													</td>
													<td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{formatDateRange(ele?.startDate, ele?.endDate)}</td>
													<td className="whites pace-nowrap px-3 py-5 text-sm text-gray-500">{format(new Date(ele?.bookingDate), 'dd MMMM yyyy')}</td>
													<td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
														<div className="text-gray-500">{formatPrice(ele?.property?.price)} per day</div>
													</td>
													<td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
														<div className="text-gray-500">{formatPrice(ele?.payments[0]?.amount)}</div>
													</td>

													<td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
														<StatusBadge status={ele?.bookingStatus} type="booking" />
													</td>

													<td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
														<StatusBadge status={ele?.payments[0].status} type="payment" />
													</td>
													{(ele?.bookingStatus === BOOKING_STATUS.AWAITING_OWNER_APPROVAL || ele?.bookingStatus === BOOKING_STATUS.CONFIRMED) && (
														<td>
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
														</td>
													)}

													{ele?.bookingStatus === BOOKING_STATUS.COMPLETED && (
														<td>
															<Button
																buttonType="button"
																size="sm"
																variant="filled"
																innerClass="w-36"
																innerTextClass="text-white"
																onClick={() => addReview(ele?.property?.id)}
															>
																Add review
															</Button>
														</td>
													)}

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
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<EmptyState
					title="No Bookings"
					subtitle="You haven't made any bookings yet."
					icon={<RiCalendarCloseLine className="w-16 h-16 text-white" />}
				/>
			)}
			<div className="mt-5">
				<Pagination totalCount={totalCount} page={page} limit={limit} onPageChange={setPage} />
			</div>
			{showModal && (
				<ConfirmModal
					modalId="booking-action-modal"
					title="Confirm Booking Cancellation"
					message="Are you sure you want to cancel this booking? The payment will be refunded within 7 business days."
					confirmText={'Yes, Cancel Booking'}
					cancelText="No, Keep Booking"
					onConfirm={handleConfirm}
					onCancel={handleCancel}
					confirmDisabled={loading}
					cancelDisabled={loading}
					btnClass={'text-white bg-warning-600 hover:bg-warning-800 focus:ring-warning-300 border-warning-600'}
					icon={<PiWarningCircleFill className="w-10 h-10 text-warning-500" />}
				/>
			)}
		</>
	);
};

export default MyBookings;
