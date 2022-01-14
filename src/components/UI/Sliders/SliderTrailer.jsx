import React from "react";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import SwiperCore, {
   Keyboard,
   Scrollbar,
   Navigation,
   Pagination,
} from "swiper";
import CardTrailer from "../../CardTrailer";
SwiperCore.use([Keyboard, Scrollbar, Navigation, Pagination]);

const SliderTrailer = ({ listTrailers, handleShow }) => {
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
            {listTrailers.map((item) => (
               <SwiperSlide key={item.name}>
                  <CardTrailer trailer={item} handleShow={handleShow} />
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   );
};

export default SliderTrailer;
