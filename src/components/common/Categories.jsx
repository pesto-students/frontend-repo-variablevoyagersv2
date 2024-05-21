import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { CATEGORIES } from '../../constants/categories';

const Categories = () => {
	return (
		<div className="mx-20 grid grid-cols-1 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-6">
			{CATEGORIES.map((ele) => (
				<div
					key={ele.tagName}
					className="relative bottom-8 bg-white rounded-lg shadow-md border border-slate-200 py-2 flex justify-center items-center flex-col transition-transform duration-200 hover:scale-110 cursor-pointer"
				>
					<div className="w-[64px] h-[64px] aspect-square mb-2 flex justify-center items-center">
						<img src={ele.icon} alt={ele.title} className="object-cover rounded-lg w-6 h-6" />
					</div>
					<div className=" relative bottom-3 text-xs">{ele.title}</div>
				</div>
			))}
		</div>
	);
};

export default Categories;
