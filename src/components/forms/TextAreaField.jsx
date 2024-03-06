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
				className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
					error ? 'border-red-500' : ''
				}`}
			></textarea>
		</>
	);
};

export default TextAreaField;
