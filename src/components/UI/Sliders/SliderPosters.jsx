import React from "react";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import SwiperCore, {
   Keyboard,
   Scrollbar,
   Navigation,
   Pagination,
} from "swiper";
import CardImage from "../../CardImage";
SwiperCore.use([Keyboard, Scrollbar, Navigation, Pagination]);

const SliderPosters = ({ list, handleShowImage }) => {
   return (
      <div className="swipper-container swiper-tab-card-movie">
         <Swiper
            slidesPerView={1.5}
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
               450: {
                  slidesPerView: 3,
               },
            }}
         >
            {list.map((item) => (
               <SwiperSlide key={item.file_path}>
                  <CardImage image={item} handleShowImage={handleShowImage} />
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   );
};

export default SliderPosters;
