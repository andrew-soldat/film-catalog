import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalState } from '../GlobalState';
import { MoviesService } from '../API/api';
import ListMovies from '../components/ListMovies';
import { useFetching } from '../hooks/useFetching';
import { useObserver } from '../hooks/useObserver';
import { Spinner } from 'react-bootstrap';

function CollectionsMovies() {
   let [movies, setMovies] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(0);
   let params = useParams();
   const lastElement = useRef();
	let { language} = useGlobalState();

   const [fetchListMovies, isMoviesLoading, moviesError] = useFetching(
      async () => {
         const response = await MoviesService.getSortListMovie(
				language,
            params.collection,
            currentPage
         );
         setMovies([...movies, ...response.results]);
         setTotalPages(response.total_pages);	
      }
   );

   useObserver(lastElement, currentPage < totalPages, isMoviesLoading, () => {
      setCurrentPage(currentPage + 1);
   });

   useEffect(() => {
      fetchListMovies();
   }, [currentPage]);

   return (
      <div className="container">
         <div className="title mb-3">{params.collection === 'vote_count' ? 'Best movies' : 'Populars now'}</div>
         {moviesError && <h2 className="h2">{moviesError}</h2>}
         {isMoviesLoading && (
            <Spinner
               className="mx-auto d-block fs-1"
               animation="grow"
               variant="secondary"
            />
         )}
         <ListMovies movies={movies} />
         <div ref={lastElement}></div>
      </div>
   );
}

export default CollectionsMovies;
