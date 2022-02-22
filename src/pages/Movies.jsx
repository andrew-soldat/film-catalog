import React, { useState, useEffect } from "react";
import { MoviesService } from "../API/api";
import { useFetching } from "../hooks/useFetching";
import LinkHeader from "../components/UI/Links/LinkHeader";
import { useGlobalState } from "../GlobalState";
import SliderMovies from "../components/UI/Sliders/SliderMovies";
import SliderGenres from "../components/UI/Sliders/SliderGenres";
import Loader from "../components/UI/Loader/Loader";

function Movies() {
   const [listGenres, setListGenre] = useState([]);
   const [moviesNowPlaying, setMoviesNowPlaying] = useState([]);
   const [moviesPopular, setMoviesPopular] = useState([]);
   const [moviesTopRated, setMoviesTopRated] = useState([]);
   const { language, collections } = useGlobalState();

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
         <section className="mb-5">
            {isListGenresLoading && <h2 className="h2">{listGenresError}</h2>}
            {isListGenresLoading ? (
               <Loader />
            ) : (
               [
                  moviesNowPlaying.length > 0 && (
                     <SliderGenres listGenres={listGenres} />
                  ),
               ]
            )}
         </section>
         <section className="mb-5">
            <LinkHeader collection={collections[0]}>Populars now</LinkHeader>
            {isMoviesPopularLoading && (
               <h2 className="h2">{moviesPopularError}</h2>
            )}
            {isMoviesPopularLoading ? (
               <Loader />
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
         </section>
         <section className="mb-5">
            <LinkHeader collection={collections[1]}>
               Playing now in theatres
            </LinkHeader>
            {isMoviesNowPlayingLoading && (
               <h2 className="h2">{moviesNowPlayingError}</h2>
            )}
            {isMoviesNowPlayingLoading ? (
               <Loader />
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
         </section>
         <section className="mb-5">
            <LinkHeader collection={collections[2]}>Top Rated</LinkHeader>
            {isMoviesTopRatedLoading && (
               <h2 className="h2">{moviesTopRatedError}</h2>
            )}
            {isMoviesTopRatedLoading ? (
               <Loader />
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
         </section>
      </div>
   );
}

export default Movies;
