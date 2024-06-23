import React from 'react';
import placeholder from '/placeholder.jpg';

export default function Avatar({ src }) {
	return (
		<img
			className="rounded-full object-cover w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20"
			alt="Avatar"
			src={src || placeholder}
		/>
	);
}
