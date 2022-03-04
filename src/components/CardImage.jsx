import React from "react";

function CardImage({ image, handleShowImage }) {
   const IMG_API = "https://image.tmdb.org/t/p/original/";

   return (
      <div className="tab-card-movie">
         <div className="tab-card-movie__img">
            <img
               src={image.file_path && IMG_API + image.file_path}
               alt=""
               className="img-fluid"
            />
            <button
               className="tab-card-movie__btn-open-modal"
               onClick={() => handleShowImage(image.file_path)}
            ></button>
         </div>
      </div>
   );
}

export default CardImage;
