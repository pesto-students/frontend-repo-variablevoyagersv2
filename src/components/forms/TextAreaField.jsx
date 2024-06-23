import React from 'react';

const TextAreaField = ({ label, id, name, register, required, error, placeholder, maxLength, watch }) => {
	return (
		<>
			<label htmlFor={id} className="block text-sm font-medium text-gray-700">
				{label}
			</label>
			<textarea
				maxLength={maxLength}
				placeholder={placeholder}
				id={id}
				name={name}
				{...register(name, { required })}
				rows="4"
				className={`focus:outline-none  focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
					error ? 'border-red-500' : ''
				}`}
			></textarea>
			{watch && (
				<div className="text-sm text-gray-500 text-right">
					{watch(name)?.length > 0 ? watch(name)?.length : 0}/{maxLength}
				</div>
			)}
		</>
	);
};

export default TextAreaField;
