import React from 'react'
import benquet from "/banquet.png"
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Categories = () => {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,];
  return (
    <div className=' relative bottom-9 px-20'>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        className="px-2"
        slidesPerView={8}
        navigation={{
          nextEl: '.swiper-button-next', // CSS selector for the next button
          prevEl: '.swiper-button-prev', // CSS selector for the previous button
          disabledClass: 'swiper-button-disabled', // Class name for disabled state
        }}
      >
        {arr.map((ele, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center">
            <div className="px-2">
              <img className="object-cover" src={benquet} alt="Img" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Categories