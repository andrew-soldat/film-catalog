import React, { useState, useEffect } from "react";
import { MoviesService } from "../API/api";
import { useFetching } from "../hooks/useFetching";
import LinkHeader from "../components/UI/Links/LinkHeader";
import { useGlobalState } from "../GlobalState";
import SliderMovies from "../components/UI/Sliders/SliderMovies";
import SliderGenres from "../components/UI/Sliders/SliderGenres";

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
      <div className="container py-5">
         <section className="mb-5">
            <SliderGenres listGenres={listGenres} loading={isListGenresLoading} error={listGenresError} />
         </section>
         <section className="mb-5">
            <LinkHeader collection={collections[0]}>Populars now</LinkHeader>
            <SliderMovies
               listMovies={moviesPopular}
               loading={isMoviesPopularLoading}
               error={moviesPopularError}
               collection={collections[0]}
            />
         </section>
         <section className="mb-5">
            <LinkHeader collection={collections[1]}>
               Playing now in theatres
            </LinkHeader>
            <SliderMovies
               listMovies={moviesNowPlaying}
               loading={isMoviesNowPlayingLoading}
               error={moviesNowPlayingError}
               collection={collections[1]}
            />
         </section>
         <section className="mb-5">
            <LinkHeader collection={collections[2]}>Top Rated</LinkHeader>
            <SliderMovies
               listMovies={moviesTopRated}
               loading={isMoviesTopRatedLoading}
               error={moviesTopRatedError}
               collection={collections[2]}
            />
         </section>
      </div>
   );
}

export default Movies;
