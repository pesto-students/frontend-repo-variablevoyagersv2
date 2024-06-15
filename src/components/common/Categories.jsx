import React, { useState } from 'react';
import { CATEGORIES } from '../../constants/categories';
import Slider from 'react-slick';
import { FaCircleChevronLeft, FaCircleChevronRight, FaXmark } from 'react-icons/fa6';
function NextArrow(props) {
	const { className, style, onClick } = props;
	return <FaCircleChevronRight className={className} style={{ ...style, display: 'block', color: '#000' }} onClick={onClick} />;
}

function PrevArrow(props) {
	const { className, style, onClick } = props;
	return <FaCircleChevronLeft className={className} style={{ ...style, display: 'block', color: '#000' }} onClick={onClick} />;
}
const Categories = ({ setTag, selectedTag }) => {
	// const settings = {
	// 	navs: true,
	// 	infinite: true,
	// 	speed: 500,
	// 	slidesToShow: 3,
	// 	slidesToScroll: 3,
	// 	loop: true,
	// 	variableWidth: true,
	// 	adaptiveHeight: true,
	// 	nextArrow: <NextArrow />,
	// 	prevArrow: <PrevArrow />,
	// 	responsive: [
	// 		{
	// 			breakpoint: 1024,
	// 			settings: {
	// 				slidesToShow: 5,
	// 				slidesToScroll: 3,
	// 				variableWidth: false,
	// 				infinite: true,
	// 			},
	// 		},
	// 		{
	// 			breakpoint: 600,
	// 			settings: {
	// 				slidesToShow: 7,
	// 				slidesToScroll: 2,
	// 				variableWidth: false,
	// 				infinite: true,
	// 			},
	// 		},
	// 		{
	// 			breakpoint: 480,
	// 			settings: {
	// 				slidesToShow: 5,
	// 				slidesToScroll: 2,
	// 				variableWidth: true,
	// 				infinite: true,
	// 			},
	// 		},
	// 	],
	// };

	var settings = {
		dots:false,
		infinite: false,
		speed: 500,
		slidesToShow: 9,
		slidesToScroll: 9,
		initialSlide: 0,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 6,
					slidesToScroll: 6,
					variableWidth: false,
                    infinite: true,
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 5,
					variableWidth: false,
                    infinite: true,
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					variableWidth: false,
                    infinite: true,
				}
			}
		]
	};

	const handleClick = (category) => {
		setTag(category.tagName);
	};

	return (
		<div className="px-6 mt-14 mb-10 mx-4 md:mx-6 lg:mx-20">
			<Slider {...settings}>
				{CATEGORIES.map((ele) => (
					<div
						key={ele.tagName}
						className=" !w-[105px] group !flex !justify-center !items-center !flex-col transition-transform duration-200 cursor-pointer !gap-3"
						onClick={() => handleClick(ele)}
					>
						<img src={ele.icon} alt={ele.title} className={`object-cover w-8 h-8 opacity-100 group-hover:opacity-100 ${selectedTag == ele.tagName ? 'opacity-100' : ''}`} />
						<div className={`text-xs whitespace-nowrap font-normal group-hover:font-semibold ${ele.tagName === selectedTag ? ' opacity-100 font-semibold ' : ''}`}>{ele.title}</div>
						<div className={`w-[70%] ${ele.tagName === selectedTag ? 'border-b-2 border-black opacity-100 font-semibold ' : ''}`}></div>
					</div>
				))}
			</Slider>
		</div>
	);
};

export default Categories;
