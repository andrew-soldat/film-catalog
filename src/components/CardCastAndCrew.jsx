import React from "react";

function CardCastAndCrew({ item }) {
   const IMG_API = "https://image.tmdb.org/t/p/w300";

   return (
      <div className="tab-card-movie">
         <div className="tab-card-movie__img">
            <img
               src={
                  item.profile_path
                     ? IMG_API + item.profile_path
                     : "./assets/img/avatar-default.jpg"
               }
               alt={item?.name}
               className="img-fluid"
            />
         </div>
         <div className="tab-card-movie__info">
            <div className="tab-card-movie__name">{item?.name}</div>
            <div className="tab-card-movie__text">
               {item.character ? item?.character : item?.job}
            </div>
         </div>
      </div>
   );
}

export default CardCastAndCrew;
