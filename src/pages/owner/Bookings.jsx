import React, { useCallback, useEffect, useState } from 'react';

import { axiosPrivate } from '../../services/axios.service';
import { selectUser } from '../../redux/slices/authSlice';
import { useSelector } from 'react-redux';
import Button from '../../components/common/Button';
import { BOOKING_STATUS, PAYMENT_STATUS } from '../../constants/status';
import { ROLES } from '../../constants/roles';
import { format } from 'date-fns';
import { formatDateRange, formatPrice } from '../../utils';
import { Link } from 'react-router-dom';
import StatusBadge from '../../components/common/StatusBadge';
import Pagination from '../../components/common/Pagination';
import Loader from '../../components/common/Loader';
import ConfirmModal from '../../components/common/ConfirmModal';
import { PiCheckSquareFill } from 'react-icons/pi';
import { toast } from 'react-toastify';
import EmptyState from '../../components/common/EmptyState';
import { RiCalendarCloseLine } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';
const Bookings = () => {
	const user = useSelector(selectUser);
	const [loading, setLoading] = useState(false);
	const [bookings, setBookings] = useState([]);

	const [page, setPage] = useState(1);
	const [totalCount, setTotalCount] = useState(0);
	const limit = 6;
	const [showModal, setShowModal] = useState(false);
	const [selectedBookingId, setSelectedBookingId] = useState(null);
	const [bookingStatus, setBookingStatus] = useState(null);
	const [paymentStatus, setPaymentStatus] = useState(null);
	const [view, setView] = useState(BOOKING_STATUS.AWAITING_OWNER_APPROVAL);
	const getBookings = useCallback(async () => {
		try {
			setLoading(true);
			const { data } = await axiosPrivate.get(`/booking/owner-bookings/${user?.id}?page=${page}&limit=${limit}&status=${view}`);
			console.log(data);
			setTotalCount(data.totalCount);
			setBookings(data.data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}, [page, user?.id, view]);
	useEffect(() => {
		getBookings();
	}, [getBookings, page, user?.id]);

	const handleAcceptReject = (id, bookingStatus, paymentStatus) => {
		setBookingStatus(bookingStatus);
		setPaymentStatus(paymentStatus);
		setShowModal(true);
		setSelectedBookingId(id);
	};
	// const handleAcceptRejec2t = async (id, bookingStatus, paymentStatus) => {
	// 	console.log(id);
	// 	const reqObj = {
	// 		bookingStatus,
	// 		paymentStatus,
	// 		role: ROLES.OWNER,
	// 	};
	// 	const {
	// 		data: { data },
	// 	} = await axiosPrivate.put(`/booking/${id}`, reqObj);
	// 	console.log(data);
	// };
	const handleConfirm = async () => {
		// const reqObj = {
		// 	bookingStatus,
		// 	paymentStatus,
		// 	role: ROLES.OWNER,
		// };
		// const {
		// 	data: { data },
		// } = await axiosPrivate.put(`/booking/${selectedBookingId}`, reqObj);
		// console.log(data);
		try {
			setLoading(true);
			const reqObj = {
				bookingStatus,
				paymentStatus,
				role: ROLES.OWNER,
			};
			console.log(reqObj);
			const { data } = await axiosPrivate.put(`/booking/${selectedBookingId}`, reqObj);
			if (data.success) {
				toast.success(data.message);
				getBookings();
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

	const handleFilter = (status) => {
		console.log(status);
		setView(status);
		setPage(1);
	};

	if (loading) {
		return <Loader />;
	}

	return (
		<>
			<div className="md:flex md:items-center md:justify-between mb-8">
				<div className="min-w-0 flex-1">
					<h2 className="text-2xl font-bold leading-7 text-gray-50 sm:truncate sm:text-3xl sm:tracking-tight">Bookings</h2>
					<p className="mt-1 text-sm text-gray-50">A list of all the bookings of your properties.</p>
				</div>
			</div>

			<div className="lg:grid lg:grid-cols-12 lg:gap-x-5 mb-5">
				{/* <div className="px-2 py-6 lg:col-span-3 lg:px-0 lg:py-0"> */}
				<nav className="flex flex-wrap lg:flex-nowrap gap-2">
					<a
						onClick={() => handleFilter(BOOKING_STATUS.AWAITING_OWNER_APPROVAL)}
						className={`cursor-pointer group flex items-center rounded-md px-3 py-2 text-sm font-medium  ${
							view === BOOKING_STATUS.AWAITING_OWNER_APPROVAL ? 'bg-gray-50 text-gray-900' : 'hover:bg-gray-50 hover:text-gray-900 text-gray-50 '
						}`}
					>
						<span className="truncate">Awaiting approval</span>
						{/* <span className="ml-3 hidden rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-900 md:inline-block">
								{totalCount}
							</span> */}
					</a>
					<a
						onClick={() => handleFilter(BOOKING_STATUS.CONFIRMED)}
						className={`cursor-pointer group flex items-center rounded-md px-3 py-2 text-sm font-medium ${
							view === BOOKING_STATUS.CONFIRMED ? 'bg-gray-50 text-gray-900' : 'hover:bg-gray-50 hover:text-gray-900 text-gray-50'
						}`}
					>
						<span className="truncate">Confirmed</span>
						{/* <span className="ml-3 hidden rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-900 md:inline-block">
								{totalCount}
							</span> */}
					</a>
					<a
						onClick={() => handleFilter(BOOKING_STATUS.CANCELLED)}
						className={`cursor-pointer group flex items-center rounded-md px-3 py-2 text-sm font-medium ${
							view === BOOKING_STATUS.CANCELLED ? 'bg-gray-50 text-gray-900' : 'hover:bg-gray-50 hover:text-gray-900 text-gray-50'
						}`}
					>
						<span className="truncate">Cancelled</span>
						{/* <span className="ml-3 hidden rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-900 md:inline-block">
								{totalCount}
							</span> */}
					</a>

					<a
						onClick={() => handleFilter(BOOKING_STATUS.COMPLETED)}
						className={`cursor-pointer group flex items-center rounded-md px-3 py-2 text-sm font-medium ${
							view === BOOKING_STATUS.COMPLETED ? 'bg-gray-50 text-gray-900' : 'hover:bg-gray-50 hover:text-gray-900 text-gray-50'
						}`}
					>
						<span className="truncate">Completed</span>
						{/* <span className="ml-3 hidden rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-900 md:inline-block">
								{totalCount}
							</span> */}
					</a>
				</nav>
				{/* </div> */}
			</div>

			{bookings.length > 0 ? (
				<ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
					{bookings.map((ele, idx) => (
						<li key={idx} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
							<Link to={`/property-detail/${ele?.property?.id}`}>
								<div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
									<img
										src={ele?.property?.propertyImages[0]?.imgUrl}
										alt={ele?.property?.propertyName}
										className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
									/>
									<div className="text-md font-medium leading-6 text-gray-900">
										{ele?.property?.propertyName}
										<div className="font-normal text-gray-500">{formatPrice(ele?.payments[0].amount)} per day</div>
									</div>
								</div>
							</Link>
							<dl className=" px-6 py-3 ">
								<div>
									<h3 className="mb-4 text-sm font-medium leading-6 text-gray-900">Booking Info</h3>
									<div className="-my-3 divide-y divide-gray-100 text-sm leading-6 rounded-xl border border-gray-200 px-2">
										<div className="flex justify-between gap-x-4 py-2">
											<dt className="text-gray-500 whitespace-nowrap">Booking Id</dt>
											<dd className="text-gray-700 text-sm whitespace-nowrap">
												<time>{ele?.id.substring(0, 8).toUpperCase()}</time>
											</dd>
										</div>

										<div className="flex justify-between gap-x-4 py-2">
											<dt className="text-gray-500">Booking Date</dt>
											<dd className="text-gray-700">
												<time>{format(new Date(ele?.createdAt), 'dd MMMM yyyy')}</time>
											</dd>
										</div>
										<div className="flex justify-between gap-x-4 py-2">
											<dt className="text-gray-500">Event Date</dt>
											<dd className="text-gray-700">
												<time>{formatDateRange(ele?.startDate, ele?.endDate)}</time>
											</dd>
										</div>

										{/* <div className="flex justify-between gap-x-4 py-2">
											<dt className="text-gray-500">Property Price</dt>
											<dd className="text-gray-700">
												<time>{formatPrice(ele?.property?.price)} per day</time>
											</dd>
										</div> */}
										<div className="flex justify-between gap-x-4 py-2">
											<dt className="text-gray-500">Amount Paid</dt>
											<dd className="flex items-start gap-x-2">
												<div className="font-medium text-gray-900">{formatPrice(ele?.payments[0].amount)}</div>

												<StatusBadge status={ele?.payments[0].status} type="payment" />
											</dd>
										</div>
										<div className="flex justify-between gap-x-4 py-2">
											<dt className="text-gray-500">Booking Status</dt>
											<dd className="flex items-start gap-x-2">
												<StatusBadge status={ele?.bookingStatus} type="booking" />
											</dd>
										</div>
									</div>
								</div>
								<div className="mt-6 mb-6">
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
								{ele?.bookingStatus === 'AWAITING_OWNER_APPROVAL' && (
									<div className="flex justify-between gap-x-4 text-sm py-3">
										<Button
											buttonType="button"
											size="sm"
											variant="filled"
											innerClass="w-36 bg-white !border !border-green-500"
											innerTextClass="text-green-500"
											onClick={() => handleAcceptReject(ele.id, BOOKING_STATUS.CONFIRMED, PAYMENT_STATUS.SUCCESS)}
											disabled={ele?.bookingStatus === BOOKING_STATUS.CONFIRMED}
										>
											Accept
										</Button>
										<Button
											buttonType="button"
											size="sm"
											variant="outline"
											innerClass="w-36  border !border-error-500"
											innerTextClass="!text-red-500"
											onClick={() => handleAcceptReject(ele.id, BOOKING_STATUS.CANCELLED, PAYMENT_STATUS.REFUNDED)}
											disabled={ele?.bookingStatus === BOOKING_STATUS.CANCELLED}
										>
											Reject
										</Button>
									</div>
								)}
							</dl>
						</li>
					))}
				</ul>
			) : (
				// <div className=" bg-white sm:p-6 sm:rounded-md">
				<EmptyState
					title={
						view === BOOKING_STATUS.AWAITING_OWNER_APPROVAL
							? 'No Bookings Awaiting Approval'
							: view === BOOKING_STATUS.CONFIRMED
							? 'No Confirmed Bookings'
							: view === BOOKING_STATUS.CANCELLED
							? 'No Cancelled Bookings'
							: view === BOOKING_STATUS.COMPLETED
							? 'No Completed Bookings'
							: 'No Bookings'
					}
					subtitle={
						view === BOOKING_STATUS.AWAITING_OWNER_APPROVAL
							? 'There are no bookings awaiting your approval at the moment.'
							: view === BOOKING_STATUS.CONFIRMED
							? 'There are no confirmed bookings at the moment.'
							: view === BOOKING_STATUS.CANCELLED
							? 'There are no cancelled bookings at the moment.'
							: view === BOOKING_STATUS.COMPLETED
							? 'There are no completed bookings at the moment.'
							: 'There are no bookings at the moment.'
					}
					icon={<RiCalendarCloseLine className="w-16 h-16 text-white" />}
				/>
				// </div>
			)}
			<div className="mt-5">
				<Pagination totalCount={totalCount} page={page} limit={limit} onPageChange={setPage} pageClass={'justify-center'} />
			</div>
			{showModal && (
				<ConfirmModal
					modalId="booking-action-modal"
					title={bookingStatus === BOOKING_STATUS.CANCELLED ? 'Confirm Booking Cancellation' : 'Confirm Booking Acceptance'}
					message={
						bookingStatus === BOOKING_STATUS.CANCELLED
							? 'Are you sure you want to cancel this booking? The payment will be refunded within 7 business days.'
							: 'Are you sure you want to accept this booking?'
					}
					confirmText={bookingStatus === BOOKING_STATUS.CANCELLED ? 'Yes, Cancel Booking' : 'Yes, Accept Booking'}
					cancelText={bookingStatus === BOOKING_STATUS.CANCELLED ? 'No, Keep Booking' : 'I am not sure yet!'}
					onConfirm={handleConfirm}
					onCancel={handleCancel}
					confirmDisabled={loading}
					cancelDisabled={loading}
					btnClass={
						bookingStatus === BOOKING_STATUS.CANCELLED
							? 'text-white bg-error-600 hover:bg-error-800 focus:ring-error-300 border-error-600'
							: ' text-white bg-green-600 hover:bg-green-800 focus:ring-green-300 border-green-600'
					}
					icon={
						bookingStatus === BOOKING_STATUS.CANCELLED ? (
							<MdOutlineCancel className="w-10 h-10 text-error-600" />
						) : (
							<PiCheckSquareFill className="w-10 h-10 text-green-500" />
						)
					}
				/>
			)}
		</>
	);
};
export default Bookings;
