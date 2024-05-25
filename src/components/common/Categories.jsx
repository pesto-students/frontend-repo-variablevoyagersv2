import React from 'react';
import { CATEGORIES } from '../../constants/categories';
import Slider from 'react-slick';
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6';
function NextArrow(props) {
	const { className, style, onClick } = props;
	return <FaCircleChevronRight className={className} style={{ ...style, display: 'block', color: '#000' }} onClick={onClick} />;
}

function PrevArrow(props) {
	const { className, style, onClick } = props;
	return <FaCircleChevronLeft className={className} style={{ ...style, display: 'block', color: '#000' }} onClick={onClick} />;
}
const Categories = () => {
	const settings = {
		dots: false,
		navs: true,
		infinite: true,
		speed: 500,
		slidesToShow: 9,
		slidesToScroll: 3,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 6,
					slidesToScroll: 3,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 2,
				},
			},
		],
	};
	return (
		<div className="px-8 my-12  max-w-7xl mx-4  md:mx-16 xl:mx-auto">
			<Slider {...settings}>
				{CATEGORIES.map((ele) => (
					<div key={ele.tagName} className="group !flex justify-center items-center !flex-col transition-transform duration-200 cursor-pointer gap-2">
						<img src={ele.icon} alt={ele.title} className="object-cover w-8 h-8 opacity-80 group-hover:opacity-100" />
						<div className="text-xs whitespace-nowrap font-normal group-hover:font-semibold">{ele.title}</div>
					</div>
				))}
			</Slider>
		</div>
	);
};

export default Categories;
