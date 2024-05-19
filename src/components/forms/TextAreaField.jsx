// TextAreaField.js
import React from 'react';

const TextAreaField = ({ label, id, name, register, required, error }) => {
	return (
		<>
			<label htmlFor={id} className="block text-sm font-medium text-gray-700">
				{label}
			</label>
			<textarea
				id={id}
				name={name}
				{...register(name, { required })}
				rows="4"
				className={`focus:outline-none  focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
					error ? 'border-red-500' : ''
				}`}
			></textarea>
		</>
	);
};

export default TextAreaField;
