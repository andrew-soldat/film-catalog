import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import { MoviesService } from "../API/api";
import { getDate } from "../utils/getDate";
import { useGlobalState } from "../GlobalState";
import { StarFill, StopwatchFill } from "react-bootstrap-icons";
import AddRemoveFromWatchList from "../components/AddRemoveFromWatchList";
import AddRemoveFromWatched from "../components/AddRemoveFromWatched";
import ButtonPlay from "../components/UI/Buttons/ButtonPlay";
import ModalTrailer from "../components/UI/Modals/ModalTrailer";
import ModalImage from "../components/UI/Modals/ModalImage";
import { useFetching } from "../hooks/useFetching";
import SliderCastAndCrew from "../components/UI/Sliders/SliderCastAndCrew";
import SliderTrailer from "../components/UI/Sliders/SliderTrailer";
import SliderImages from "../components/UI/Sliders/SliderImages";
import SliderPosters from "../components/UI/Sliders/SliderPosters";
import Loader from "../components/UI/Loader/Loader";
import RecommendedMovies from "../components/RecommendedMovies";

function MovieDescriptionPage() {
   const IMG_API = "https://image.tmdb.org/t/p/w500";
   let params = useParams();
   let router = useHistory();
   const [movie, setMovie] = useState({});
   const [listCast, setListCast] = useState([]);
   const [listCrew, setListCrew] = useState([]);
   const [listTrailers, setListVideo] = useState([]);
   const [keyTrailer, setKeyTrailer] = useState("");
   const [listBackdrops, setListBackdrops] = useState([]);
   const [listPosters, setListPosters] = useState([]);
   const [filePath, setFilePath] = useState("");
   const [showTrailer, setShowTrailer] = useState(false);
   const [showImage, setShowImage] = useState(false);
   const { language } = useGlobalState();

   function handleShow(key) {
      setKeyTrailer(key);
      setShowTrailer(true);
   }

   function handleShowImage(file) {
      setFilePath(file);
      setShowImage(true);
   }

   const [fetchMovieById, isMovieByIdLoading, movieByIdError] = useFetching(
      async () => {
         const response = await MoviesService.getMovieById(language, params.id);
         setMovie(response);
      }
   );

   async function fetchCastAndCrewMovie() {
      const response = await MoviesService.getCastAndCrewMovieById(
         language,
         params.id
      );
      setListCast(response.cast);
      setListCrew(response.crew);
   }

   async function fetchVideosMovie() {
      const response = await MoviesService.getVideosMovieById(
         language,
         params.id
      );
      setListVideo(response.results);
   }

   async function fetchImagesMovie() {
      const response = await MoviesService.getImagesMovieById(params.id);
      setListBackdrops(response.backdrops);
      setListPosters(response.posters);
   }

   useEffect(() => {
      fetchMovieById();
      fetchCastAndCrewMovie();
      fetchVideosMovie();
      fetchImagesMovie();
   }, [params.id]);

   return (
      <div className="container">
         {isMovieByIdLoading && <h2 className="h2">{movieByIdError}</h2>}
         {isMovieByIdLoading ? (
            <Loader />
         ) : (
            [
               movie && (
                  <section className="mb-5">
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
                                 {language === "en-US"
                                    ? "Original title"
                                    : "Оригинальный заголовок"}
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
                                    onClick={() =>
                                       handleShow(listTrailers[0].key)
                                    }
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
                  </section>
               ),
            ]
         )}
         <section className="mb-5">
            <Tabs
               defaultActiveKey="1"
               id="tab-movie"
               className="nav-tab-movie mb-4"
            >
               {listCast.length > 0 && (
                  <Tab eventKey="1" title="Cast">
                     <SliderCastAndCrew list={listCast} />
                  </Tab>
               )}
               {listCrew.length > 0 && (
                  <Tab eventKey="2" title="Crew">
                     <SliderCastAndCrew list={listCrew} />
                  </Tab>
               )}
               {listTrailers.length > 0 && (
                  <Tab eventKey="3" title="Video">
                     <SliderTrailer
                        listTrailers={listTrailers}
                        handleShow={handleShow}
                     />
                  </Tab>
               )}
               {listBackdrops.length > 0 && (
                  <Tab eventKey="4" title="Backdrops">
                     <SliderImages
                        list={listBackdrops}
                        handleShowImage={handleShowImage}
                     />
                  </Tab>
               )}
               {listPosters.length > 0 && (
                  <Tab eventKey="5" title="Posters">
                     <SliderPosters
                        list={listPosters}
                        handleShowImage={handleShowImage}
                     />
                  </Tab>
               )}
            </Tabs>
         </section>
         <RecommendedMovies id={params.id} />
         {listTrailers && (
            <ModalTrailer
               keyTrailer={keyTrailer}
               showTrailer={showTrailer}
               onHide={() => setShowTrailer(false)}
            />
         )}
         {listBackdrops && listPosters && (
            <ModalImage
               filePath={filePath}
               showImage={showImage}
               onHide={() => setShowImage(false)}
            />
         )}
      </div>
   );
}

export default MovieDescriptionPage;
