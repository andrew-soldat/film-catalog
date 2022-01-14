import React from "react";

function CardTrailer({ trailer, handleShow }) {
   return (
      <div className="tab-card-movie">
         <div className="tab-card-movie__trailer">
            <iframe
               src={`https://www.youtube.com/embed/${trailer.key}`}
               title="YouTube video player"
               frameborder="0"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               allowfullscreen
            ></iframe>
            <button
               className="tab-card-movie__btn-open-modal"
               onClick={() => handleShow(trailer.key)}
            ></button>
         </div>
         <div className="tab-card-movie__info tab-card-movie__info_trailer">
            {trailer.name}
         </div>
      </div>
   );
}

export default CardTrailer;
