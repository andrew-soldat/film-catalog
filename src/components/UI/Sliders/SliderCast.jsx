import React from 'react';
import LinkViewAllMoviesByGenre from '../../LinkViewAllMoviesByGenre';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import SwiperCore, {
   Keyboard,
   Scrollbar,
   Navigation,
   Pagination,
} from 'swiper';
SwiperCore.use([Keyboard, Scrollbar, Navigation, Pagination]);

const SliderCast = ({ listCast }) => {
   const IMG_API = "https://image.tmdb.org/t/p/w300";

   return (
      <div className="swipper-container">
         <Swiper
            slidesPerView={1}
            spaceBetween={12}
            slidesPerGroup={1}
            keyboard={{
               enabled: true,
            }}
            scrollbar={true}
            navigation={true}
            breakpoints={{
               991: {
                  slidesPerView: 6,
                  slidesPerGroup: 6,
               },
               768: {
                  slidesPerView: 4,
                  slidesPerGroup: 4,
               },
               565: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
               },
            }}
         >
            {listCast.map((cast) => (
               <SwiperSlide key={cast.id}>
                  {/* <LinkViewAllMoviesByGenre cast={cast.name} id={genre.id} /> */}
               <div className="">
                  <div className="">
                     <img src={cast.profile_path ? IMG_API + cast.profile_path : "no photo"} alt={cast?.name} className="img-fluid" />
                     <div className="">{cast?.name}</div>
                  </div>
               </div>

               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   );
};

export default SliderCast;
