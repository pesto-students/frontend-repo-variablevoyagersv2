import React from 'react';
import { BOOKING_STATUS, PAYMENT_STATUS } from '../../constants/status';
// import { BOOKING_STATUS, PAYMENT_STATUS } from './constants';

const StatusBadge = ({ status, type }) => {
	const isBookingStatus = type === 'booking';
	const statusColor = getStatusColor(status, isBookingStatus);

	return (
		<span
			className={`inline-flex items-center rounded-full px-2  lg:px-3 lg:py-1 text-sm lg:text-xs font-medium ring-1 ring-inset ${statusColor.bg} ${statusColor.text}`}
		>
			{status}
		</span>
	);
};

const getStatusColor = (status, isBookingStatus) => {
	const bookingStatusColors = {
		[BOOKING_STATUS.PENDING]: {
			bg: 'bg-yellow-50',
			text: 'text-yellow-800 ring-yellow-600/20',
		},
		[BOOKING_STATUS.AWAITING_OWNER_APPROVAL]: {
			bg: 'bg-yellow-50',
			text: 'text-yellow-800 ring-yellow-600/20',
		},
		[BOOKING_STATUS.FAILED]: {
			bg: 'bg-red-50',
			text: 'text-red-800 ring-red-600/20',
		},
		[BOOKING_STATUS.CONFIRMED]: {
			bg: 'bg-green-50',
			text: 'text-green-800 ring-green-600/20',
		},
		[BOOKING_STATUS.CANCELLED]: {
			bg: 'bg-gray-50',
			text: 'text-gray-800 ring-gray-600/20',
		},
		[BOOKING_STATUS.COMPLETED]: {
			bg: 'bg-purple-50',
			text: 'text-purple-800 ring-purple-600/20',
		},
	};

	const paymentStatusColors = {
		[PAYMENT_STATUS.PENDING]: {
			bg: 'bg-yellow-50',
			text: 'text-yellow-800 ring-yellow-600/20',
		},
		[PAYMENT_STATUS.FAILED]: {
			bg: 'bg-red-50',
			text: 'text-red-800 ring-red-600/20',
		},
		[PAYMENT_STATUS.SUCCESS]: {
			bg: 'bg-green-50',
			text: 'text-green-800 ring-green-600/20',
		},
		[PAYMENT_STATUS.REFUNDED]: {
			bg: 'bg-gray-50',
			text: 'text-gray-800 ring-gray-600/20',
		},
	};

	const statusColors = isBookingStatus ? bookingStatusColors : paymentStatusColors;
	return statusColors[status] || { bg: 'bg-gray-50', text: 'text-gray-800 ring-gray-600/20' };
};

export default StatusBadge;
