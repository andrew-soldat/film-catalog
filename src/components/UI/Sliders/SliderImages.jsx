import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import SwiperCore, {
   Keyboard,
   Scrollbar,
   Navigation,
   Pagination,
} from 'swiper';
import CardImage from '../../CardImage';
SwiperCore.use([Keyboard, Scrollbar, Navigation, Pagination]);

const SliderImages = ({ list, handleShowImage }) => {
   return (
      <div className="swipper-container swiper-tab-card-movie">
         <Swiper
            slidesPerView={1}
            slidesPerGroup={1}
            keyboard={{
               enabled: true,
            }}
            scrollbar={true}
            navigation={true}
            breakpoints={{
               991: {
                  slidesPerView: 4,
               },
               768: {
                  slidesPerView: 3,
               },
               565: {
                  slidesPerView: 2,
               },
            }}
         >
            {list.map((item) => (
               <SwiperSlide key={item.name}>
                  <CardImage image={item} handleShowImage={handleShowImage} />
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   );
};

export default SliderImages;
