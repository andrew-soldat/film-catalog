import React from 'react';
import CardMovie from '../../CardMovie'
import LinkViewAllMovies from '../../LinkViewAllMovies'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js'
import SwiperCore, {
   Keyboard,
   Scrollbar,
   Navigation,
   Pagination,
} from 'swiper'
SwiperCore.use([Keyboard, Scrollbar, Navigation, Pagination]);

const SliderMovies = ({listMovies, collection}) => {
   return (
      <div className="swipper-container">
         <Swiper
            slidesPerView={1}
            spaceBetween={24}
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
            {listMovies.map((movie) => (
               <SwiperSlide key={movie.id}>
                  <CardMovie movie={movie} />
               </SwiperSlide>
            ))}
            <SwiperSlide>
               <LinkViewAllMovies collection={collection} />
            </SwiperSlide>
         </Swiper>
      </div>
   );
}

export default SliderMovies