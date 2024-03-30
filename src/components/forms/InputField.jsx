// InputField.js
import React from 'react';

const InputField = ({ label, id, name, register, required, error, type }) => {
	console.log(error);
	return (
		<>
			<label htmlFor={id} className="block text-sm font-medium text-gray-700">
				{label}
			</label>
			<input
				type={type ? type : 'text'}
				id={id}
				name={name}
				{...register(name, { required })}
				className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
					error ? 'border-red-500' : ''
				}`}
			/>
		</>
	);
};

export default InputField;
