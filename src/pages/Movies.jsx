import React, { useState, useEffect } from 'react';
import { MoviesService } from '../API/api';
import { Spinner } from 'react-bootstrap';
import { useFetching } from '../hooks/useFetching';
import LinkHeader from '../components/UI/Links/LinkHeader';
import { useGlobalState } from '../GlobalState';
import SliderMovies from '../components/UI/Sliders/SliderMovies';
import SliderGenres from '../components/UI/Sliders/SliderGenres';

function Movies() {
   let [moviesPopularity, setMoviesPopularity] = useState([]);
   let [moviesVoteCount, setMoviesVoteCount] = useState([]);
   let { language, collections, listGenres } = useGlobalState();

   const [
      fetchListMoviesPopularity,
      isMoviesPopularityLoading,
      moviesPopularityError,
   ] = useFetching(async () => {
      const response = await MoviesService.getSortListMovie(language, collections[0]);
      setMoviesPopularity(response.results);
   });

   const [
      fetchListMoviesVoteCount,
      isMoviesVoteCountLoading,
      moviesVoteCountError,
   ] = useFetching(async () => {
      const response = await MoviesService.getSortListMovie(language, collections[1]);
      setMoviesVoteCount(response.results);
   });

   useEffect(() => {
      fetchListMoviesPopularity();
      fetchListMoviesVoteCount();
   }, []);

   return (
      <div className="container">
         <div className="mb-5">
            <SliderGenres listGenres={listGenres} />
         </div>
         <div className="mb-5">
            <LinkHeader collection={collections[0]}>Populars now</LinkHeader>
            {isMoviesPopularityLoading && (
               <h2 className="h2">{moviesPopularityError}</h2>
            )}
            {isMoviesPopularityLoading ? (
               <Spinner
                  className="mx-auto d-block"
                  animation="border"
                  variant="light"
               />
            ) : (
               [
                  moviesPopularity.length > 0 && (
                     <SliderMovies
                        listMovies={moviesPopularity}
                        collection={collections[0]}
                     />
                  ),
               ]
            )}
         </div>
         <div className="mb-5">
            <LinkHeader collection={collections[1]}>Best Movies</LinkHeader>
            {isMoviesVoteCountLoading && (
               <h2 className="h2">{moviesVoteCountError}</h2>
            )}
            {isMoviesVoteCountLoading ? (
               <Spinner
                  className="mx-auto d-block"
                  animation="border"
                  variant="light"
               />
            ) : (
               [
                  moviesVoteCount.length > 0 && (
                     <SliderMovies
                        listMovies={moviesVoteCount}
                        collection={collections[1]}
                     />
                  ),
               ]
            )}
         </div>
      </div>
   );
}

export default Movies;
