import React from "react";
import CardMovie from "../../CardMovie";
import LinkViewAllMovies from "../../LinkViewAllMovies";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import SwiperCore, {
   Keyboard,
   Scrollbar,
   Navigation,
   Pagination,
} from "swiper";
import Loader from "../Loader/Loader";
SwiperCore.use([Keyboard, Scrollbar, Navigation, Pagination]);

const SliderMovies = ({ listMovies, loading, error, collection }) => {
   return (
      <>
         {loading && <h2 className="h2">{error}</h2>}
         {loading ? (
            <Loader />
         ) : (
            [
               listMovies.length > 0 && (
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
                           <SwiperSlide key={movie.id.toString()}>
                              <CardMovie movie={movie} />
                           </SwiperSlide>
                        ))}
                        {collection && (
                           <SwiperSlide>
                              <LinkViewAllMovies collection={collection} />
                           </SwiperSlide>
                        )}
                     </Swiper>
                  </div>
               ),
            ]
         )}
      </>
   );
};

export default SliderMovies;
