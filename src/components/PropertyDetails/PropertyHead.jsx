import React, { useState } from 'react';
import Heading from './Heading';
import Slider from 'react-slick';

const NextArrow = (props) => {
	const { className, style, onClick } = props;
	return (
		<div
			className={`${className} absolute right-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer`}
			style={{ ...style }}
			onClick={onClick}
		></div>
	);
};

const PrevArrow = (props) => {
	const { className, style, onClick } = props;
	return (
		<div
			className={`${className} absolute left-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer`}
			style={{ ...style }}
			onClick={onClick}
		></div>
	);
};

const PropertyHead = ({ propertyName, city, country, propertyImages }) => {
	const [isFullScreen, setIsFullScreen] = useState(false);

	const toggleFullScreen = () => {
		setIsFullScreen(!isFullScreen);
	};

	if (!propertyImages || propertyImages.length === 0) {
		return null;
	}

	const settings = {
		dots: true,
		lazyLoad: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		initialSlide: 1,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
	};

	return (
		<>
			<div>
				<Heading name={propertyName || ''} city={city} country={country} />
			</div>
			<div
				className={`hidden lg:flex justify-end gap-2 w-full h-[60vh] overflow-hidden rounded-xl relative cursor-pointer ${
					isFullScreen ? 'hidden' : ''
				}`}
			>
				{propertyImages.length < 5 ? (
					<img className="object-cover w-full" src={propertyImages[0].imgUrl} alt="Img" />
				) : (
					<>
						<div className=" flex-2 w-full lg:w-auto">
							{propertyImages[0]?.imgUrl && <img className="object-cover w-full h-full" src={propertyImages[0].imgUrl} alt="Img" />}
						</div>
						<div className="flex-1 hidden lg:flex flex-col gap-2 ">
							{propertyImages
								.slice(1, 3)
								.map((img, index) => img?.imgUrl && <img className="object-cover w-full h-[210px]" src={img.imgUrl} alt="Img" key={index} />)}
						</div>
						<div className="flex-1 hidden lg:flex flex-col gap-2 ">
							{propertyImages
								.slice(3, 5)
								.map((img, index) => img?.imgUrl && <img className="object-cover w-full h-[210px]" src={img.imgUrl} alt="Img" key={index} />)}
						</div>
					</>
				)}
				<button
					className="hidden lg:block absolute z-1 px-2 py-1 rounded-md lg:top-2 lg:right-2 bg-white hover:bg-gray-100 "
					onClick={toggleFullScreen}
				>
					Show All Photos
				</button>
			</div>
			<div className="flex lg:hidden justify-center items-center w-full h-full overflow-hidden rounded-sm relative cursor-pointer">
				<Slider {...settings} className="w-full">
					{propertyImages.map((img, index) => (
						<div key={index} className="w-full ">
							<img className="w-full object-cover" src={img.imgUrl} alt="Img" />
						</div>
					))}
				</Slider>
			</div>
			{isFullScreen && (
				<div className="fixed inset-0 z-50 overflow-hidden bg-gray-900 flex justify-center items-center">
					<button className="absolute w-20 h-10 z-10 right-2 top-2 rounded-lg bg-white" onClick={toggleFullScreen}>
						Close
					</button>
					<Slider {...settings} className="w-screen h-screen">
						{propertyImages.map((img, index) => (
							<div key={index} className="w-screen h-screen">
								<img className="w-full h-full object-contain" src={img.imgUrl} alt="Img" />
							</div>
						))}
					</Slider>
				</div>
			)}
		</>
	);
};

export default PropertyHead;
