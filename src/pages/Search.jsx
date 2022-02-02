import React, { useState, useEffect } from "react";
import { MoviesService } from "../API/api";
import { Spinner } from "react-bootstrap";
import ListMovies from "../components/ListMovies";
import Input from "../components/UI/Inputs/Input";
import { useFetching } from "../hooks/useFetching";
import { useGlobalState } from "../GlobalState";

function Search() {
   let [movies, setMovies] = useState([]);
   let [searchQuery, setSearchQuery] = useState("");
   let { language } = useGlobalState();

   const [fetchMovies, isMoviesLoading, movieError] = useFetching(async () => {
      const response = await MoviesService.searchMovies(language, searchQuery);
      setMovies(response.results);
   });

   const onChange = (e) => {
      e.preventDefault();
      setSearchQuery(e.target.value);
      if (e.target.value.length > 1) {
         fetchMovies(searchQuery);
      } else {
         setMovies([]);
      }
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
         {movies.length > 0 && (
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
         )}
      </div>
   );
}

export default Search;
