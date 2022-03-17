import React from "react";
import { useHistory } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { StarFill, StopwatchFill } from "react-bootstrap-icons";
import Loader from "../UI/Loader/Loader";
import { getDate } from "../../utils/getDate";
import AddRemoveFromWatchList from "../AddRemoveFromWatchList";
import AddRemoveFromWatched from "../AddRemoveFromWatched";
import ButtonPlay from "../UI/Buttons/ButtonPlay";

function DescriptionMovie({ movie, loading, error, listTrailers, handleShow }) {
   const IMG_API = "https://image.tmdb.org/t/p/w500";
   let router = useHistory();

   return (
      <section className="mb-5">
         {loading && <h2 className="h2">{error}</h2>}
         {loading ? (
            <Loader />
         ) : (
            [
               movie && (
                  <Row className="g-4">
                     <Col sm={4}>
                        <div>
                           <img
                              className="img-fluid"
                              src={
                                 movie.poster_path
                                    ? IMG_API + movie.poster_path
                                    : "assets/img/camera.jpg"
                              }
                              alt={movie.title}
                           />
                        </div>
                     </Col>
                     <Col sm={8}>
                        <h1 className="h1 mb-2">{movie?.title}</h1>
                        <div className="movie__runtime mb-4">
                           <StopwatchFill />
                           {movie?.runtime} min
                        </div>
                        <div className="rating mb-3">
                           <StarFill />
                           <div>
                              <div className="rating__average">
                                 {movie?.vote_average}
                              </div>
                              <div className="rating__count">
                                 {movie.vote_count && [
                                    movie?.vote_count.toString().length > 3
                                       ? `${movie.vote_count
                                            .toString()
                                            .slice(0, -3)}K`
                                       : movie.vote_count,
                                 ]}
                              </div>
                           </div>
                        </div>
                        <Row className="g-2 g-sm-4 mb-3">
                           <Col sm={3} className="movie__subtitle">
                              Original title
                           </Col>
                           <Col sm={9} className="movie__info">
                              {movie?.original_title}
                           </Col>
                        </Row>
                        <Row className="g-2 g-sm-4 mb-3">
                           <Col sm={3} className="movie__subtitle">
                              Tagline
                           </Col>
                           <Col sm={9} className="movie__info fst-italic">
                              "{movie.tagline ? movie.tagline : "-"}"
                           </Col>
                        </Row>
                        <Row className="g-2 g-sm-4 mb-3">
                           <Col sm={3} className="movie__subtitle">
                              Country
                           </Col>
                           <Col sm={9} className="movie__info">
                              {movie.production_countries &&
                                 movie.production_countries
                                    .map((item) => item.name)
                                    .join(", ")}
                           </Col>
                        </Row>
                        <Row className="g-2 g-sm-4 mb-3">
                           <Col sm={3} className="movie__subtitle">
                              Genre
                           </Col>
                           <Col sm={9} className="movie__info">
                              {movie.genres &&
                                 movie.genres.map((item, i, arr) => (
                                    <span
                                       key={item.name}
                                       className="link-small"
                                       onClick={() =>
                                          router.push(
                                             `/movies/${item.name
                                                .toLowerCase()
                                                .replace(/\s/g, "_")}`
                                          )
                                       }
                                    >
                                       {item.name}
                                       {i !== arr.length - 1 ? ", " : ""}
                                    </span>
                                 ))}
                           </Col>
                        </Row>
                        <Row className="g-2 g-sm-4 mb-3">
                           <Col sm={3} className="movie__subtitle">
                              Release date
                           </Col>
                           <Col sm={9} className="movie__info">
                              {movie.release_date
                                 ? getDate(movie.release_date)
                                 : "-"}
                           </Col>
                        </Row>
                        <Row className="g-2 g-sm-4 mb-3">
                           <Col sm={3} className="movie__subtitle">
                              Budget
                           </Col>
                           <Col sm={9} className="movie__info">
                              {movie.budget
                                 ? `$ ${movie.budget
                                      .toString()
                                      .replace(
                                         /(\d)(?=(\d{3})+(\D|$))/g,
                                         "$1 "
                                      )}`
                                 : "-"}
                           </Col>
                        </Row>
                        <div className="mb-3">
                           <div className="movie__subtitle mb-2">
                              Description:
                           </div>
                           <div className="movie__description">
                              {movie?.overview}
                           </div>
                        </div>
                        {listTrailers.length > 0 && (
                           <div className="mb-3">
                              <ButtonPlay
                                 variant="primary"
                                 onClick={() => handleShow(listTrailers[0].key)}
                              >
                                 Watch The Trailer
                              </ButtonPlay>
                           </div>
                        )}
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
               ),
            ]
         )}
      </section>
   );
}

export default DescriptionMovie;
