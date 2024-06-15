import React, { useRef } from 'react';
import { FaArrowLeft, FaArrowRight, FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6';
import Slider from 'react-slick';
import Avatar from '../Avatar';
import placeholder from "/placeholder.jpg";
import StarRating from './StarRating';
import Rating from 'react-rating';

// import 'slick-carousel/slick/slick.css';
// import 'node_modules/slick-carousel/slick/slick-theme.css';

// Dummy data for reviews
const reviews = [
  {
    id: 1,
    name: 'John Doe',
    rating: 4,
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi auctor convallis mi, ac aliquet dui malesuada et. Nunc auctor dignissim nibh eu commodo. Proin eu elementum lectus. Mauris laoreet a augue in accumsan. Sed euismod augue ac lacus vivamus.'  },
  {
    id: 2,
    name: 'Jane Smith',
    rating: 4,
    review: 'I love this! It exceeded my expectations.I love this! It exceeded my expectations.I love this! It exceeded my expectations.',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    rating: 4,
    review: 'Excellent service and quality. Will definitely buy again. ',
  },
  {
    id: 4,
    name: 'Bob Johnson',
    rating: 4,
    review: 'Excellent service and quality. ',
  },
  {
    id: 5,
    name: 'Bob Johnson',
    rating: 1,
    review: 'Excellent service and quality. Will definitely buy again. ',
  },
  {
    id: 6,
    name: 'Bob Johnson',
    rating: 2,
    review: 'Excellent service and quality. Will definitely buy again.',
  },
  {
    id: 7,
    name: 'Bob Johnson',
    rating: 3,
    review: 'Excellent service and quality. Will definitely buy again.',
  },
  {
    id: 8,
    name: 'Bob Johnson',
    rating: 5,
    review: 'Excellent service and quality. Will definitely buy again.',
  },
  // Add more reviews as needed
];


const Reviews = () => {

  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 1224,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 1,

        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (

    <div className="my-12">
    <div className="flex justify-end gap-3 mb-5 sm:mb-8">
      <button
        onClick={previous}
        className="bg-primary w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:opacity-80"
      >
        <FaArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </button>
      <button
        onClick={next}
        className="bg-primary w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:opacity-80"
      >
        <FaArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </button>
    </div>
    <Slider
  ref={(slider) => {
    sliderRef = slider;
  }}
  {...settings}
  className=""
>
  {reviews.map((review) => (
    <div key={review.id} className="flex flex-1 col-span-1 h-100">
      <div className="border border-gray-200 rounded-3xl mx-4 p-5 flex flex-col sm:mx-6 sm:p-6 h-full"> {/* Add the 'grow' class */}
        <div className="flex gap-4 mb-5">
          <img
            className="rounded-full object-cover w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20"
            alt="Avatar"
            src={
              'https://lh3.googleusercontent.com/a/ACg8ocLqj4MvDD7AcXNn8miJBGuLp0TT9Cvg-qU22DcMeJZxbgJnAS5rhg=s96-c' ||
              placeholder
            }
          />
          <div className="flex flex-col justify-center w-full">
            <h1 className="text-sm sm:text-base lg:text-xl md:text-medium">
              Mehul Vadgama
            </h1>
            <div className="text-xs sm:text-sm text-gray-500">Week ago</div>
          </div>
        </div>
        <StarRating rating={review.rating} size={6} />
        <p className="text-base md:text-lg mt-3 flex-grow">{review.review}</p> {/* Add the 'grow' class to the review content */}
      </div>
    </div>
  ))}
</Slider>
  </div>
  

  );
};



export default Reviews;