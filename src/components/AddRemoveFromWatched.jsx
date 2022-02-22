import React from "react";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { useGlobalState } from "../GlobalState";
import getMovieById from "../utils/getMovieById";

function AddRemoveFromWatched({ isCard, id, movie }) {
   const { watched, addMovieToWatched, removeMovieFromWatched } =
      useGlobalState();

   const storedMovieWatched = getMovieById(watched, id);
   const watchedDisabled = storedMovieWatched ? true : false;

   return (
      <>
         {isCard && [
            watchedDisabled ? (
               <OverlayTrigger
                  placement="top"
                  overlay={
                     <Tooltip id="tooltip-top">Remove from watched</Tooltip>
                  }
               >
                  <div onClick={() => removeMovieFromWatched(movie)}>
                     <EyeSlash />
                  </div>
               </OverlayTrigger>
            ) : (
               <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="tooltip-top">Watched</Tooltip>}
               >
                  <div onClick={() => addMovieToWatched(movie)}>
                     <Eye />
                  </div>
               </OverlayTrigger>
            ),
         ]}
         {!isCard && [
            watchedDisabled ? (
               <div
                  className="movie-menu__btn"
                  onClick={() => removeMovieFromWatched(movie)}
               >
                  <EyeSlash />
                  <div className="ms-2">Remove from watched</div>
               </div>
            ) : (
               <div
                  className="movie-menu__btn"
                  onClick={() => addMovieToWatched(movie)}
               >
                  <Eye />
                  <div className="ms-2">Watched</div>
               </div>
            ),
         ]}
      </>
   );
}

export default AddRemoveFromWatched;
