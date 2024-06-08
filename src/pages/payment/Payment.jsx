import React, { useCallback, useEffect, useState } from 'react';

import Container from '../../components/Container';
import { axiosPrivate } from '../../services/axios.service';
import { useNavigate } from 'react-router-dom';

import Loader from '../../components/common/Loader';
import { selectUser } from '../../redux/slices/authSlice';
import { useSelector } from 'react-redux';
import useRazorpay from 'react-razorpay';
import { PAYMENT_STATUS } from '../../constants/status';
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

const Payment = () => {
	const [Razorpay] = useRazorpay();
	const navigate = useNavigate();
	const user = useSelector(selectUser);
	const [booking, setBooking] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const savedBooking = JSON.parse(localStorage.getItem('booking'));
		if (savedBooking) {
			setBooking(savedBooking);
		} else {
			navigate('/');
		}
	}, [navigate]);

	const handlePaymentModalDissmiss = useCallback(async (order) => {
		try {
			await axiosPrivate.put(`booking/remove-booking/${order.bookingId}`);
		} catch (err) {
			console.log('Order Dissmiss Removed', err);
		}
	}, []);

	const handlePayment = useCallback(async () => {
		if (!booking) return;
		try {
			const { data } = await axiosPrivate.post('/payment/create-payment-order', {
				amount: booking.totalPrice,
				startDate: booking.startDate,
				endDate: booking?.endDate,
				userId: booking?.userId,
				propertyId: booking?.id,
			});
			console.log(data);
			if (data.success) {
				const { data: orderResponse } = data;
				const options = {
					key: RAZORPAY_KEY_ID,
					amount: orderResponse.order.amount,
					currency: orderResponse.order.currency,
					name: 'Book My Venue',
					description: 'Test Transaction',
					image: 'https://example.com/your_logo',
					order_id: orderResponse.order.id,
					handler: async function (response) {
						console.log('raz', response);
						await axiosPrivate.post('/payment/confirm-payment', {
							bookingId: orderResponse.bookingId,
							orderId: response.razorpay_order_id,
							paymentId: response.razorpay_payment_id,
							signature: response.razorpay_signature,
							status: PAYMENT_STATUS.SUCCESS,
						});
						alert('Payment successful and booking confirmed!');
					},
					prefill: {
						name: `${user.firstName} ${user.lastName}`,
						email: user?.email,
					},
					modal: {
						ondismiss: () => handlePaymentModalDissmiss(orderResponse),
					},
					timeout: 15 * 60, //15Min
				};

				const rzpay = new Razorpay(options);
				rzpay.open();
				rzpay.on('payment.failed', async (res) => {
					console.log('FAILED', res, orderResponse);

					await axiosPrivate.post('/payment/confirm-payment', {
						bookingId: orderResponse.bookingId,
						orderId: orderResponse.order.id,
						paymentId: res.error.metadata.payment_id,
						signature: '',
						status: PAYMENT_STATUS.FAILED,
					});
				});
			}
		} catch (err) {
			console.log(err);
		}
	}, [Razorpay, user?.email, user?.firstName, user?.lastName, booking, handlePaymentModalDissmiss]);

	if (loading) {
		return <Loader />;
	}

	return (
		<Container>
			<div className="mt-32">
				<h1>{booking?.propertyName}</h1>
				<h1>Property price: {booking?.price}/day</h1>
				<h1>Total price: {booking?.totalPrice}</h1>
				<button onClick={handlePayment} className="text-3xl px-4 py-2 rounded-md bg-primary text-white">
					Confirm and Pay
				</button>
			</div>
		</Container>
		// <Container>
		// 	<div className="mt-32">
		// 		<h1 className="text-4xl  font-semibold mb-10 sm:mb-10">Confirm And Pay</h1>
		// 		<div className="grid grid-cols-1 md:grid-cols-7 md:gap-28">
		// 			<div className="col-span-4 flex flex-col">
		// 				<p className="font-medium text-2xl">Your Booking</p>
		// 				<p className="mt-6 font-mediumd text-xl">Dates</p>
		// 				<div className="mt-2 mb-9 flex justify-between">
		// 					<p className="text-lg">{booking && formatDateRange(booking.startDate, booking.endDate)}</p>
		// 					<p className="text-lg font-medium underline cursor-pointer">Edit</p>
		// 				</div>
		// 				<hr />
		// 				<p className="mt-10 mb-10 font-medium text-2xl">Pay With</p>
		// 				<hr />
		// 				<div className="mt-10 mb-10">
		// 					<p className="font-medium text-2xl">Required for your trip</p>
		// 					<div className="flex justify-between">
		// 						<p className="mt-1 font-medium text-xl">Phone number</p>
		// 						<button className="rounded-md p-2 bg-white border font-medium">Add</button>
		// 					</div>
		// 				</div>
		// 				<hr />
		// 				<div className="mt-10 mb-10">
		// 					<p className="font-medium text-2xl">Cancellation policy</p>
		// 					<span>Free cancellation for 48 hours. Cancel before 6 May for a partial refund.</span>
		// 					<p className=" underline font-bold">Learn More</p>
		// 				</div>
		// 				<hr />
		// 				<div className="mt-10 mb-10">
		// 					<p className="font-medium text-2xl">Ground rules</p>
		// 					<span>We ask every guest to remember a few simple things about what makes a great guest.</span>
		// 					<p className="font-bold">1. Treat your Host’s home like your own</p>
		// 					<p className="font-bold">2. Follow the house rules</p>
		// 				</div>
		// 				<hr />
		// 			</div>
		// 			<div className="order-first mb-10 md:order-last md:col-span-3">
		// 				<div className="bg-white flex flex-col gap-5  sticky top-32 rounded-xl shadow-lg border-[1px] p-4 border-neutral-200 overflow-hidden">
		// 					<div className="flex flex-row items-center mt-3">
		// 						<div className="flex gap-5 items-center">
		// 							<img src={booking?.property?.propertyImages[0].imgUrl} alt="" className="rounded-md w-[100px] h-[100px]" />
		// 							<div className="font-medium text-2xl">
		// 								{booking?.property?.propertyName}
		// 								<div className="flex items-center text-base">
		// 									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 mr-1">
		// 										<path
		// 											fillRule="evenodd"
		// 											d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
		// 											clipRule="evenodd"
		// 										/>
		// 									</svg>
		// 									4.90 (21 Review)
		// 								</div>
		// 							</div>
		// 						</div>
		// 					</div>
		// 					<hr />
		// 					<div className="flex flex-col">
		// 						<p className="font-medium text-2xl">Price Details</p>
		// 						<div className="flex justify-between">
		// 							<div>
		// 								<FormatPrice price={50000} />
		// 								<span> x 3 Nights</span>
		// 							</div>
		// 							<div>
		// 								<FormatPrice price={150000} />
		// 							</div>
		// 						</div>
		// 					</div>
		// 					<hr />
		// 					<div className="flex justify-between">
		// 						<p className="font-medium text-2xl">Total</p>
		// 						<div className="font-medium text-2xl">
		// 							<FormatPrice price={150000} />
		// 						</div>
		// 					</div>
		// 					<button className="text-3xl px-4 py-2 rounded-md bg-primary text-white">Confirm and Pay</button>
		// 					<div className="w-max"></div>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</div>
		// </Container>
	);
};

export default Payment;
