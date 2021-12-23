import React, { useState, useEffect, useRef } from 'react';
import { MoviesService } from '../API/api';
import { Spinner } from 'react-bootstrap';
import ListMovies from '../components/ListMovies';
import Input from '../components/UI/Inputs/Input';
import { useFetching } from '../hooks/useFetching';
import { useGlobalState } from '../GlobalState';

function Search() {
   let [movies, setMovies] = useState([]);
   let [searchQuery, setSearchQuery] = useState('');
   const lastElement = useRef();
   let { language } = useGlobalState();

   const [fetchMovies, isMoviesLoading, movieError] = useFetching(async () => {
      const response = await MoviesService.searchMovies(language, searchQuery);
      setMovies(response.results);
   });

   const onChange = (e) => {
      e.preventDefault();
      setSearchQuery(e.target.value);
      fetchMovies(searchQuery);
   };

   useEffect(() => {
      fetchMovies();
   }, []);

   return (
      <div className="container">
         <div className="mb-5">
            <form className="d-flex">
               <div className="me-3">
                  <Input
                     onChange={onChange}
                     value={searchQuery}
                     placeholder="Search..."
                     type="text"
                     required
                  />
               </div>
            </form>
         </div>
         <div className="mb-5">
            {/* {movieError && <h2 className="h2">{movieError}</h2>} */}
            {isMoviesLoading && (
               <Spinner
                  className="mx-auto fs-1"
                  animation="grow"
                  variant="secondary"
               />
            )}
            <ListMovies movies={movies} />
         </div>
         <div ref={lastElement}></div>
      </div>
   );
}

export default Search;
