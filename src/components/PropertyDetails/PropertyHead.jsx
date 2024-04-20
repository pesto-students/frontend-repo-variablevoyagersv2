import React, { useState } from 'react';
import Heading from './Heading';
import ImagePlaceholder from "../../assets/ImagePlaceholder.jpeg";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const PropertyHead = ({ propertyName, city, country, propertyImages }) => {
    const [isFullScreen, setIsFullScreen] = useState(false);

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    if (!propertyImages || propertyImages.length === 0) {
        return null; // or display a placeholder image or message
    }

    return (
        <div className={isFullScreen ? "fixed inset-0 z-50 overflow-hidden bg-gray-900" : ""}>

            <Heading name={propertyName || ''} city={city} country={country} />
            <div className='hidden md:block'>
                <div className={`flex justify-end gap-2 mt-4 md:w-full md:h-[60vh] overflow-hidden rounded-xl relative cursor-pointer ${isFullScreen ? 'hidden' : ''}`}>
                    {propertyImages.length < 2 ? (
                        <img className="object-cover w-full" src={propertyImages[0].imgUrl} alt="Img" />
                    ) : (
                        <>
                            <div className=' flex-2 w-1/2'>
                                {propertyImages[0]?.imgUrl && (
                                    <img className="object-cover w-full h-full" src={propertyImages[0].imgUrl} alt="Img" />
                                )}
                            </div>
                            <div className='flex-1 flex flex-col gap-2 '>
                                {propertyImages.slice(1, 3).map((img, index) => (
                                    img?.imgUrl && (
                                        <img className="object-cover w-full h-full" src={img.imgUrl} alt="Img" key={index} />
                                    )
                                ))}
                            </div>
                            <div className='flex-1 flex flex-col gap-2 '>
                                {propertyImages.slice(3, 5).map((img, index) => (
                                    img?.imgUrl && (
                                        <img className="object-cover w-full h-full" src={img.imgUrl} alt="Img" key={index} />
                                    )
                                ))}
                            </div>
                        </>
                    )}
                    <button className="absolute z-10 px-2 py-1 rounded-md lg:top-2 lg:right-2 bg-white hover:bg-gray-100" onClick={toggleFullScreen}>
                        Show All Photos
                    </button>
                </div>
                {isFullScreen && (
                    <div className="fixed inset-0 z-50 flex justify-center items-center">
                        <button className='absolute w-20 h-10 z-10 right-2 top-2' onClick={toggleFullScreen}>Close</button>
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                            className="w-screen h-screen"
                            spaceBetween={50}
                            slidesPerView={1}
                            // navigation
                            pagination={{ clickable: true }}
                            scrollbar={{ draggable: true }}
                            navigation

                        >
                            {/* {console.log("photos",propertyImages)} */}
                            {propertyImages.map((img, index) => (
                                <SwiperSlide key={index} className='flex justify-center items-center'>
                                    <img className="object-cover md:w-[800px] md:h-[520px]" src={img.imgUrl} alt="Img" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )}
            </div>
            <div className='md:hidden flex justify-end gap-2 mt-4 md:w-full md:h-[60vh] overflow-hidden rounded-xl relative cursor-pointer'>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={50}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                >
                    {propertyImages.map((img, index) => (
                        <SwiperSlide key={index} className='flex justify-center items-center'>                            
                            <img className="object-cover w-full rounded-md" src={img.imgUrl} alt="Img"  />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

        </div>
    );
};

export default PropertyHead;
