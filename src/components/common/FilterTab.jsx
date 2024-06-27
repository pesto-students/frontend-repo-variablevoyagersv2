import React from 'react';

const FilterTab = ({ status, currentView, onFilter, label }) => {
	const isActive = currentView === status;
	const activeClass = 'bg-gray-50 text-gray-900';
	const inactiveClass = 'hover:bg-gray-50 hover:text-gray-900 text-gray-50';
	const className = `cursor-pointer group flex items-center rounded-md px-3 py-2 text-sm font-medium ${isActive ? activeClass : inactiveClass}`;

	return (
		<a onClick={() => onFilter(status)} className={className}>
			<span className="truncate">{label}</span>
		</a>
	);
};

export default FilterTab;
