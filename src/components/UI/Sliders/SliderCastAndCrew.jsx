import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import SwiperCore, {
   Keyboard,
   Scrollbar,
   Navigation,
   Pagination,
} from 'swiper';
import CardCastAndCrew from '../../CardCastAndCrew';
SwiperCore.use([Keyboard, Scrollbar, Navigation, Pagination]);

const SliderCastAndCrew = ({ list }) => {
   return (
      <div className="swipper-container swiper-tab-card-movie">
         <Swiper
            slidesPerView={2}
            slidesPerGroup={1}
            keyboard={{
               enabled: true,
            }}
            scrollbar={true}
            navigation={true}
            breakpoints={{
               991: {
                  slidesPerView: 8,
               },
               768: {
                  slidesPerView: 6,
               },
               565: {
                  slidesPerView: 4,
               },
               480: {
                  slidesPerView: 3,
               },
            }}
         >
            {list.map((item) => (
               <SwiperSlide key={item.name}>
                  <CardCastAndCrew item={item} />
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   );
};

export default SliderCastAndCrew;
