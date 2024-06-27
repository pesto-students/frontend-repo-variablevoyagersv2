import React, { useState, useEffect } from 'react';
import { LuLoader2 } from 'react-icons/lu';

const PaymentLoader = () => {
	const [currentMessage, setCurrentMessage] = useState('');
	const messages = ['Confirming payment...', 'Collecting payments...', 'Sending emails...'];

	useEffect(() => {
		let index = 0;
		const intervalId = setInterval(() => {
			if (index < messages.length) {
				setCurrentMessage(messages[index]);
				index++;
			} else {
				clearInterval(intervalId);
			}
		}, 2000); // Change message every 2 seconds

		return () => clearInterval(intervalId);
	}, []);

	return (
		<div className="flex flex-col gap-3 items-center justify-center space-x-2 h-screen ">
			<LuLoader2 className="w-6 h-6 text-primary animate-spin" />
			<p className="text-gray-500 text-md">{currentMessage}</p>
		</div>
	);
};

export default PaymentLoader;
