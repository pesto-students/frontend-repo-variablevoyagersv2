// InputField.js
import React from 'react';

const InputField = ({ label, id, name, register, required, error, type, disabled, readOnly }) => {
	return (
		<>
			<label htmlFor={id} className="block text-sm font-medium text-gray-700">
				{label}
			</label>
			{type === 'email' ? (
				<input
					type="email"
					id={id}
					name={name}
					{...register(name, {
						required,
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
							message: `Invalid ${label}`,
						},
					})}
					className={`mt-1 focus:ring-indigo-500 focus:outline-none focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
						error ? 'border-error-700 focus:border-error-700 focus:ring-error-700' : 'border-gray-100 focus:border-primary-300 focus:ring-primary-50'
					}`}
					disabled={disabled ? true : false}
				/>
			) : type === 'number' ? (
				<input
					type="number"
					id={id}
					name={name}
					{...register(name, {
						required,
					})}
					className={`mt-1 focus:ring-indigo-500 focus:outline-none focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
						error
							? 'border-error-700 focus:border-error-700 focus:focus:ring-error-700'
							: 'border-gray-100 focus:border-primary-300 focus:ring-primary-50'
					}`}
					disabled={disabled ? true : false}
				/>
			) : (
				<input
					type={type ? type : 'text'}
					id={id}
					name={name}
					{...register(name, {
						required,
					})}
					className={`mt-1 focus:ring-indigo-500 focus:outline-none focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
						error
							? 'border-error-700 focus:border-error-700 focus:focus:ring-error-700'
							: 'border-gray-100 focus:border-primary-300 focus:ring-primary-50'
					}`}
					disabled={disabled ? true : false}
					readOnly={readOnly ? true : false}
				/>
			)}
		</>
	);
};

export default InputField;
