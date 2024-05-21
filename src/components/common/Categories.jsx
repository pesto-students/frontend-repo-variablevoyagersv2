import React from 'react'
import benquet from "/banquet.png"
import birthdays from "../../assets/icons/birthday.png"
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import WeddingIcon from '../../assets/icons/wedding.png';
import BirthdayIcon from '../../assets/icons/birthday.png';
import EngagementIcon from '../../assets/icons/engage.png';
import CorIcon from '../../assets/icons/cor-party.png';
import PoolIcon from '../../assets/icons/pool-party.png';
import CocktailIcon from '../../assets/icons/cocktail.png';
import BanquetIcon from '../../assets/icons/hall.png';
import RestaurantIcon from '../../assets/icons/res.png';
import FarmIcon from '../../assets/icons/farm.png';
import KittyIcon from '../../assets/icons/kitty.png';

const events = [
  { title: 'Wedding', value: 'wedding', icon: WeddingIcon },
  { title: 'Birthday', value: 'birthday', icon: BirthdayIcon },
  { title: 'Engagement', value: 'engagement', icon: EngagementIcon },
  { title: 'Pool Party', value: 'pool-party', icon: PoolIcon },
  { title: 'Cocktail Party', value: 'cocktail-party', icon: CocktailIcon },
  { title: 'Corporate Party', value: 'corporate-party', icon: CorIcon },
  { title: 'Banquet Halls', value: 'banquet-halls', icon: BanquetIcon },
  { title: 'Restaurants', value: 'restaurants', icon: RestaurantIcon },
  { title: 'Farm Houses', value: 'farm-houses', icon: FarmIcon },
  { title: 'Kitty Party', value: 'kitty-party', icon: KittyIcon },
];

const Categories = () => {
  return (
    <div className="mx-20 grid grid-cols-1 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-8">
      {events.map((ele) => (
        <div className="relative bottom-8 bg-white rounded-lg shadow-md border border-slate-200 py-2 flex justify-center items-center flex-col transition-transform duration-200 hover:scale-110">
          <div className="w-[64px] h-[64px] aspect-square mb-2 flex justify-center items-center">
            <img src={ele.icon} alt="" className="object-cover rounded-lg w-6 h-6" />
          </div>
          <div className=" relative bottom-3 text-xs">{ele.title}</div>
        </div>
      ))}
    </div>
  )
}

export default Categories