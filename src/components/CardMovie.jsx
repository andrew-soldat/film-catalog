import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Col } from "react-bootstrap";
import { PlayFill } from "react-bootstrap-icons";
import { useGlobalState } from "../GlobalState";
import setVoteClass from "../utils/setVoteClass";
import AddRemoveFromWatchList from "./AddRemoveFromWatchList";
import AddRemoveFromWatched from "./AddRemoveFromWatched";
import { MoviesService } from "./../API/api";

function CardMovie({ movie }) {
   const IMG_API = "https://image.tmdb.org/t/p/w500";
   let router = useHistory();
   let { language } = useGlobalState();
   let [genre, setGenre] = useState({});

   async function fetchListGenres() {
      const response = await MoviesService.getListGenres(language);
      setGenre(response.genres.find((i) => i.id === movie.genre_ids[0]));
   }

   useEffect(() => {
      fetchListGenres();
   }, []);

   return (
      <Col sm={6} md={3} lg={2} className="item-movie">
         <div className="item-movie__wrapper">
            <div className="item-movie__menu">
               <AddRemoveFromWatchList
                  isCard={true}
                  id={movie.id}
                  movie={movie}
               />
               <AddRemoveFromWatched
                  isCard={true}
                  id={movie.id}
                  movie={movie}
               />
            </div>
            <div
               className={`item-movie__vote-average ${setVoteClass(
                  movie.vote_average
               )}`}
            >
               {movie.vote_average.toFixed(1)}
            </div>
            <div
               className="item-movie__img"
               onClick={() => router.push(`/watch/${movie.id}`)}
            >
               <img
                  className="img-fluid"
                  src={
                     movie.poster_path
                        ? IMG_API + movie.poster_path
                        : "assets/img/camera.jpg"
                  }
                  alt={movie.title}
               />
               <div className="item-movie__overlay">
                  <div>
                     <PlayFill />
                  </div>
                  <div>Watch</div>
               </div>
            </div>
            <div className="item-movie__description p-2">
               <div
                  className="item-movie__title h6 mb-1"
                  onClick={() => router.push(`/watch/${movie.id}`)}
               >
                  {movie.title}
               </div>
               <div className="item-movie__date">
                  {movie.release_date &&
                     `${movie.release_date.substring(0, 4)},`}{" "}
                  {genre?.name}
               </div>
            </div>
         </div>
      </Col>
   );
}

export default CardMovie;
