import React from 'react';
import { CATEGORIES } from '../../constants/categories';
const Categories = () => {
	return (
		<div className="my-12 mx-auto max-w-7xl px-4 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3 lg:gap-8 md:gap-5">
			{CATEGORIES.map((ele) => (
				<div key={ele.tagName} className="group flex justify-center items-center flex-col transition-transform duration-200 cursor-pointer gap-2">
					<img src={ele.icon} alt={ele.title} className="object-cover w-8 h-8 opacity-80 group-hover:opacity-100" />
					<div className="text-xs whitespace-nowrap font-normal group-hover:font-semibold">{ele.title}</div>
				</div>
			))}
		</div>
	);
};

export default Categories;
