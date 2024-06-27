export const BOOKING_STATUS = {
	PENDING: 'PENDING',
	AWAITING_OWNER_APPROVAL: 'AWAITING_OWNER_APPROVAL',
	FAILED: 'FAILED',
	CONFIRMED: 'CONFIRMED',
	CANCELLED: 'CANCELLED',
	COMPLETED: 'COMPLETED',
};

export const PAYMENT_STATUS = {
	PENDING: 'PENDING',
	FAILED: 'FAILED',
	SUCCESS: 'SUCCESS',
	REFUNDED: 'REFUNDED',
};

export const bookingStatusMessages = {
	[BOOKING_STATUS.AWAITING_OWNER_APPROVAL]: {
		title: 'No Bookings Awaiting Approval',
		subtitle: 'There are no bookings awaiting for approval at the moment.',
	},
	[BOOKING_STATUS.CONFIRMED]: {
		title: 'No Confirmed Bookings',
		subtitle: 'There are no confirmed bookings at the moment.',
	},
	[BOOKING_STATUS.CANCELLED]: {
		title: 'No Cancelled Bookings',
		subtitle: 'There are no cancelled bookings at the moment.',
	},
	[BOOKING_STATUS.COMPLETED]: {
		title: 'No Completed Bookings',
		subtitle: 'There are no completed bookings at the moment.',
	},
	default: {
		title: 'No Bookings',
		subtitle: 'There are no bookings at the moment.',
	},
};

export const bookingConfirmModalMessages = {
	[BOOKING_STATUS.CANCELLED]: {
		title: 'Confirm Booking Cancellation',
		message: 'Are you sure you want to cancel this booking? The payment will be refunded within 7 - 10 business days.',
		confirmText: 'Yes, Cancel Booking',
		cancelText: 'No, Keep Booking',
		btnClass: 'text-white bg-error-600 hover:bg-error-800 focus:ring-error-300 border-error-600',
	},
	default: {
		title: 'Confirm Booking Acceptance',
		message: 'Are you sure you want to accept this booking?',
		confirmText: 'Yes, Accept Booking',
		cancelText: 'I am not sure yet!',
		btnClass: 'text-white bg-green-600 hover:bg-green-800 focus:ring-green-300 border-green-600',
	},
};
