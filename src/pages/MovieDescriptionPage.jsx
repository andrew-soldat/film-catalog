import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { MoviesService } from '../API/api';
import { getDate } from '../utils/getDate';
import { useGlobalState } from '../GlobalState';
import { StarFill, StopwatchFill } from 'react-bootstrap-icons';
import AddRemoveFromWatchList from '../components/AddRemoveFromWatchList';
import AddRemoveFromWatched from '../components/AddRemoveFromWatched';

function MovieDescriptionPage() {
   const IMG_API = 'https://image.tmdb.org/t/p/w500';
   let params = useParams();
   let router = useHistory();

   let { language } = useGlobalState();

   let [movie, setMovie] = useState({});

   async function fetchMoviesById() {
      const response = await MoviesService.getMovieById(language, params.id);
      setMovie(response);
   }

   useEffect(() => {
      fetchMoviesById();
   }, []);

   return (
      <div className="">
         <div className="container">
            <div className="mb-5">
               <Row className="g-4">
                  <Col sm={4}>
                     <div>
                        <img
                           className="img-fluid"
                           src={
                              movie.poster_path
                                 ? IMG_API + movie.poster_path
                                 : 'assets/img/camera.jpg'
                           }
                           alt={movie.title}
                        />
                     </div>
                  </Col>
                  <Col sm={8}>
                     <h2 className="h2 mb-2">
                        {movie.title ? movie.title : null}
                     </h2>
                     <div className="movie__runtime mb-4">
                        <StopwatchFill />
                        {movie.runtime ? movie.runtime : null} min
                     </div>
                     <div className="rating mb-3">
                        <StarFill />
                        <div>
                           <div className="rating__average">
                              {movie.vote_average ? movie.vote_average : null}
                           </div>
                           <div className="rating__count">
                              {movie.vote_count
                                 ? [
                                      movie.vote_count.toString().length > 3
                                         ? `${movie.vote_count
                                              .toString()
                                              .slice(0, -3)}K`
                                         : movie.vote_count,
                                   ]
                                 : null}
                           </div>
                        </div>
                     </div>
                     <Row className="g-4 mb-3">
                        <Col sm={3} className="movie__subtitle">
                           {language === 'en-US'
                              ? 'Original title'
                              : 'Оригинальный заголовок'}
                        </Col>
                        <Col sm={9} className="movie__info">
                           {movie.original_title}
                        </Col>
                     </Row>
                     <Row className="g-4 mb-3">
                        <Col sm={3} className="movie__subtitle">
                           Tagline
                        </Col>
                        <Col sm={9} className="movie__info">
                           {movie.tagline ? movie.tagline : null}
                        </Col>
                     </Row>
                     <Row className="g-4 mb-3">
                        <Col sm={3} className="movie__subtitle">
                           Countrie
                        </Col>
                        <Col sm={9} className="movie__info">
                           {movie.production_countries
                              ? movie.production_countries
                                   .map((item) => item.name)
                                   .join(', ')
                              : null}
                        </Col>
                     </Row>
                     <Row className="g-4 mb-3">
                        <Col sm={3} className="movie__subtitle">
                           Genre
                        </Col>
                        <Col sm={9} className="movie__info">
                           {movie.genres
                              ? movie.genres.map((item, i, arr) => (
                                   <span
                                      key={item.name}
                                      className="link-small"
                                      onClick={() =>
                                         router.push(
                                            `/movies/${item.name
                                               .toLowerCase()
                                               .replace(/\s/g, '_')}`
                                         )
                                      }
                                   >
                                      {item.name}
                                      {i !== arr.length - 1 ? ', ' : ''}
                                   </span>
                                ))
                              : null}
                        </Col>
                     </Row>
                     <Row className="g-4 mb-3">
                        <Col sm={3} className="movie__subtitle">
                           Release date
                        </Col>
                        <Col sm={9} className="movie__info">
                           {movie.release_date
                              ? getDate(movie.release_date)
                              : null}
                        </Col>
                     </Row>
                     <Row className="g-4 mb-3">
                        <Col sm={3} className="movie__subtitle">
                           Budget
                        </Col>
                        <Col sm={9} className="movie__info">
                           {movie.budget
                              ? `$ ${movie.budget
                                   .toString()
                                   .replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}`
                              : '-'}
                        </Col>
                     </Row>
                     <div className="mb-3">
                        <div className="movie__subtitle mb-2">Description:</div>
                        <div className="movie__description">
                           {movie.overview ? movie.overview : null}
                        </div>
                     </div>
                     <div className="movie-menu">
                        <AddRemoveFromWatchList
                           isCard={false}
                           id={movie.id}
                           movie={movie}
                        />
                        <AddRemoveFromWatched
                           isCard={false}
                           id={movie.id}
                           movie={movie}
                        />
                     </div>
                  </Col>
               </Row>
            </div>
         </div>
      </div>
   );
}

export default MovieDescriptionPage;
