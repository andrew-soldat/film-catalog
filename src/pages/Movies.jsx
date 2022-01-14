import React, { useState, useEffect } from "react";
import { MoviesService } from "../API/api";
import { Spinner } from "react-bootstrap";
import { useFetching } from "../hooks/useFetching";
import LinkHeader from "../components/UI/Links/LinkHeader";
import { useGlobalState } from "../GlobalState";
import SliderMovies from "../components/UI/Sliders/SliderMovies";
import SliderGenres from "../components/UI/Sliders/SliderGenres";

function Movies() {
   let [listGenres, setListGenre] = useState([]);
   let [moviesNowPlaying, setMoviesNowPlaying] = useState([]);
   let [moviesPopular, setMoviesPopular] = useState([]);
   let [moviesTopRated, setMoviesTopRated] = useState([]);
   let { language, collections } = useGlobalState();

   const [fetchListGenresPlaying, isListGenresLoading, listGenresError] =
      useFetching(async () => {
         const response = await MoviesService.getListGenres(language);
         setListGenre(response.genres);
      });

   const [
      fetchListMoviesNowPlaying,
      isMoviesNowPlayingLoading,
      moviesNowPlayingError,
   ] = useFetching(async () => {
      const response = await MoviesService.getCollectionMovies(
         language,
         collections[0]
      );
      setMoviesNowPlaying(response.results);
   });

   const [fetchListMoviesPopular, isMoviesPopularLoading, moviesPopularError] =
      useFetching(async () => {
         const response = await MoviesService.getCollectionMovies(
            language,
            collections[1]
         );
         setMoviesPopular(response.results);
      });

   const [
      fetchListMoviesTopRated,
      isMoviesTopRatedLoading,
      moviesTopRatedError,
   ] = useFetching(async () => {
      const response = await MoviesService.getCollectionMovies(
         language,
         collections[2]
      );
      setMoviesTopRated(response.results);
   });

   useEffect(() => {
      fetchListGenresPlaying();
      fetchListMoviesNowPlaying();
      fetchListMoviesPopular();
      fetchListMoviesTopRated();
   }, []);

   return (
      <div className="container">
         <div className="mb-5">
            {isListGenresLoading && <h2 className="h2">{listGenresError}</h2>}
            {isListGenresLoading ? (
               <Spinner
                  className="mx-auto d-block"
                  animation="border"
                  variant="light"
               />
            ) : (
               [
                  moviesNowPlaying.length > 0 && (
                     <SliderGenres listGenres={listGenres} />
                  ),
               ]
            )}
         </div>
         <div className="mb-5">
            <LinkHeader collection={collections[0]}>Populars now</LinkHeader>
            {isMoviesPopularLoading && (
               <h2 className="h2">{moviesPopularError}</h2>
            )}
            {isMoviesPopularLoading ? (
               <Spinner
                  className="mx-auto d-block"
                  animation="border"
                  variant="light"
               />
            ) : (
               [
                  moviesPopular.length > 0 && (
                     <SliderMovies
                        listMovies={moviesPopular}
                        collection={collections[0]}
                     />
                  ),
               ]
            )}
         </div>
         <div className="mb-5">
            <LinkHeader collection={collections[1]}>
               Playing now in theatres
            </LinkHeader>
            {isMoviesNowPlayingLoading && (
               <h2 className="h2">{moviesNowPlayingError}</h2>
            )}
            {isMoviesNowPlayingLoading ? (
               <Spinner
                  className="mx-auto d-block"
                  animation="border"
                  variant="light"
               />
            ) : (
               [
                  moviesNowPlaying.length > 0 && (
                     <SliderMovies
                        listMovies={moviesNowPlaying}
                        collection={collections[1]}
                     />
                  ),
               ]
            )}
         </div>
         <div className="mb-5">
            <LinkHeader collection={collections[2]}>Top Rated</LinkHeader>
            {isMoviesTopRatedLoading && (
               <h2 className="h2">{moviesTopRatedError}</h2>
            )}
            {isMoviesTopRatedLoading ? (
               <Spinner
                  className="mx-auto d-block"
                  animation="border"
                  variant="light"
               />
            ) : (
               [
                  moviesTopRated.length > 0 && (
                     <SliderMovies
                        listMovies={moviesTopRated}
                        collection={collections[2]}
                     />
                  ),
               ]
            )}
         </div>
      </div>
   );
}

export default Movies;
