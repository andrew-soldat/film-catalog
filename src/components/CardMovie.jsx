import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Col } from 'react-bootstrap';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import {
   PlayFill,
   Eye,
   EyeSlash,
} from 'react-bootstrap-icons';
import { useGlobalState } from '../GlobalState';
import setVoteClass from '../utils/setVoteClass';
import getListGenresById from '../utils/getListGenresById';
import AddRemoveFromWatchList from './AddRemoveFromWatchList';
import AddRemoveFromWatched from './AddRemoveFromWatched';

function CardMovie({ movie }) {
   const IMG_API = 'https://image.tmdb.org/t/p/w500';
   let router = useHistory();
   let { listGenres } = useGlobalState();
   let [arrayGenres, setArrayGenres] = useState([]);

	const getGenres = () => {
		if (movie.genre_ids) {
			setArrayGenres(getListGenresById(listGenres, movie.genre_ids));
		} else {
			const arr = []
			movie.genres.map(item => arr.push(item.name))
			setArrayGenres(arr)
		}
	}

   useEffect(() => {
		getGenres()
   }, []);

   return (
      <Col sm={6} md={3} lg={2} className="item-movie">
         <div className="item-movie__wrapper">
            <div className="item-movie__menu">
					<AddRemoveFromWatchList isCard={true} id={movie.id} movie={movie}/>
					<AddRemoveFromWatched isCard={true} id={movie.id} movie={movie}/>
            </div>
            <div
               className={`item-movie__vote-average ${setVoteClass(
                  movie.vote_average
               )}`}
            >
               {movie.vote_average}
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
                        : 'assets/img/camera.jpg'
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
               <div className="item-movie__date mb-1">
                  {arrayGenres.join(', ')}
               </div>
               <div className="item-movie__date">
                  {movie.release_date ? movie.release_date.substring(0, 4) : ''}
               </div>
            </div>
         </div>
      </Col>
   );
}

export default CardMovie;
