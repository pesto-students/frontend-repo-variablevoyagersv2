import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { axiosPrivate } from '../../services/axios.service';
import { formatDateRange, formatPrice } from '../../utils';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import Loader from '../../components/common/Loader';

const PaymentSuccessPage = () => {
	const location = useLocation();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const [booking, setBooking] = useState(null);

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const bookingId = searchParams.get('id');
		if (!bookingId) {
			navigate('/');
		}
		const getBooking = async () => {
			setLoading(true);
			try {
				const { data } = await axiosPrivate.get(`/booking/${bookingId}`);
				console.log(data);
				setBooking(data);
			} catch (err) {
				console.log('Error fetching booking', booking);
			} finally {
				setLoading(false);
			}
		};
		getBooking();
	}, []);

	if (loading) {
		return <Loader />;
	}

	return (
		<>
			<main className="grid h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
				<div className=" rounded-lg bg-white px-4 pb-4 pt-5 text-left border border-gray-100 sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
					<div>
						<div className="mx-auto flex  items-center justify-center rounded-full ">
							<IoCheckmarkCircleSharp className="h-12 w-12 text-green-600" />
						</div>

						<div className="mt-4 text-center sm:mt-5">
							<h3 className="text-lg font-semibold leading-6 text-gray-900" id="modal-title">
								Payment successful
							</h3>
							<div className="mt-3">
								<p className="text-md text-gray-500">
									Your payment of {formatPrice(booking?.payments[0]?.amount)} for the event on {formatDateRange(booking?.startDate, booking?.endDate)}{' '}
									at {booking?.property?.propertyName} has been successfully processed.
								</p>
							</div>
						</div>
					</div>
					<div className="mt-6 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
						<Link
							to="/customer/my-bookings"
							className="inline-flex w-full justify-center rounded-full bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-gray:outline-indigo-600 sm:col-start-2"
						>
							Check Bookings
						</Link>
						<Link
							to="/"
							className="mt-3 inline-flex w-full justify-center rounded-full bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
						>
							Back to Home
						</Link>
					</div>
				</div>
			</main>
		</>
	);
};

export default PaymentSuccessPage;
