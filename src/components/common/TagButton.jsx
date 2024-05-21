import React from 'react';
import { FaXmark } from 'react-icons/fa6';
const TagButton = ({ event, isSelected, onSelectEvent, hasErrors, isDisabled }) => {
	const getButtonClasses = () => {
		const baseClasses = 'relative flex items-end rounded-[8px] border-[1.5px] px-5 py-[12px] text-sm font-medium';
		if (isSelected) {
			return `${baseClasses} border-main-400 bg-main-50 text-main-700 hover:border-main-600`;
		}
		if (hasErrors) {
			return `${baseClasses} border-error-400 bg-error-50 text-error-700 hover:border-error-600`;
		}
		return `${baseClasses} border-gray-100 text-gray-700 hover:border-gray-300 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`;
	};

	return (
		<button onClick={() => !isDisabled && onSelectEvent(event.tagName)} type="button" className={getButtonClasses()} disabled={isDisabled}>
			<div className="flex flex-col items-center">
				<img src={event.icon} className="w-8 h-8" />
				{event.title}
			</div>
			{isSelected && (
				<div className="absolute top-[-7px] right-[-4px] rounded-full bg-white border-[1.5px] border-main-400 p-[4px]">
					<FaXmark className="text-red-500" />
				</div>
			)}
		</button>
	);
};

export default TagButton;
