import React from 'react';

const Input = ({ label, placeholder, type, success, error, successMessage, errorMessage, onChange }) => {
	return (
		<div>
			<label htmlFor={label} className="block mb-2 text-sm font-medium">
				{label}
			</label>
			<input
				type={type}
				id={label}
				className={`bg-${success ? 'green' : error ? 'red' : 'white'}-50 border border-${success ? 'green' : error ? 'red' : 'gray'}-500 text-${
					success ? 'green' : error ? 'red' : 'gray'
				}-900 placeholder-${success ? 'green' : error ? 'red' : 'gray'}-700 text-sm rounded-lg focus:ring-${
					success ? 'green' : error ? 'red' : 'gray'
				}-500 focus:border-${success ? 'green' : error ? 'red' : 'gray'}-500 block w-full p-2.5  ${
					success
						? 'dark:text-green-400 dark:border-green-500 dark:placeholder-green-500'
						: error
						? 'dark:text-red-500 dark:border-red-500 dark:placeholder-red-500'
						: ''
				}`}
				placeholder={placeholder}
				onChange={onChange}
			/>
			{success && successMessage && (
				<p className="mt-2 text-sm text-green-600 dark:text-green-500">
					<span className="font-medium">{successMessage}</span>
				</p>
			)}
			{error && errorMessage && (
				<p className="mt-2 text-sm text-red-600 dark:text-red-500">
					<span className="font-medium">{errorMessage}</span>
				</p>
			)}
		</div>
	);
};

export default Input;
