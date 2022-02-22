import React from "react";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Bookmark, BookmarkFill } from "react-bootstrap-icons";
import { useGlobalState } from "../GlobalState";
import getMovieById from "../utils/getMovieById";

function AddRemoveFromWatchList({ isCard, id, movie }) {
   const { watchList, addMovieToWatchList, removeMovieFromWatchList } =
      useGlobalState();

   const storedMovie = getMovieById(watchList, id);
   const watchListDisabled = storedMovie ? true : false;

   return (
      <>
         {isCard && [
            watchListDisabled ? (
               <OverlayTrigger
                  placement="top"
                  overlay={
                     <Tooltip id="tooltip-top">Remove from watchList</Tooltip>
                  }
               >
                  <div
                     className="mb-2"
                     onClick={() => removeMovieFromWatchList(movie)}
                  >
                     <BookmarkFill />
                  </div>
               </OverlayTrigger>
            ) : (
               <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="tooltip-top">Add to WatchList</Tooltip>}
               >
                  <div
                     className="mb-2"
                     onClick={() => addMovieToWatchList(movie)}
                  >
                     <Bookmark />
                  </div>
               </OverlayTrigger>
            ),
         ]}
         {!isCard && [
            watchListDisabled ? (
               <div
                  className="movie-menu__btn"
                  onClick={() => removeMovieFromWatchList(movie)}
               >
                  <BookmarkFill />
                  <div className="ms-2">Remove from watchList</div>
               </div>
            ) : (
               <div
                  className="movie-menu__btn"
                  onClick={() => addMovieToWatchList(movie)}
               >
                  {" "}
                  <Bookmark />
                  <div className="ms-2">Add to WatchList</div>
               </div>
            ),
         ]}
      </>
   );
}

export default AddRemoveFromWatchList;
