import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { MoviesService } from "../API/api";
import { useGlobalState } from "../GlobalState";
import { useFetching } from "../hooks/useFetching";
import { Search, XLg } from "react-bootstrap-icons";
import ListMovies from "./ListMovies";

const SearchHeader = () => {
   const { language } = useGlobalState();
   const [isActiveInput, setIsActiveInput] = useState(false);
   const [isActiveListMovie, setIsActiveListMovie] = useState(false);
   const [movies, setMovies] = useState([]);
   const [searchQuery, setSearchQuery] = useState("");
   const ref = useRef(null);

   const [fetchMovies] = useFetching(async () => {
      const response = await MoviesService.searchMovies(language, searchQuery);
      setMovies(response.results);
   });

   const onChange = (e) => {
      setSearchQuery(e.target.value);

      if (e.target.value.length > 1) {
         setIsActiveListMovie(true);
         fetchMovies(searchQuery);
      } else {
         setMovies([]);
         setIsActiveListMovie(false);
      }
   };

   const handleToggle = () => {
      ref.current.focus();
      setIsActiveInput(!isActiveInput);
      resetInputField();
   };

   const resetInputField = () => {
      setSearchQuery("");
      setMovies([]);
      setIsActiveListMovie(false);
   };

   useEffect(() => {
      fetchMovies();
   }, [language]);

   return (
      <>
         <div className="header-search">
            <form
               className={
                  isActiveInput
                     ? "header-search__form _active"
                     : "header-search__form"
               }
            >
               <input
                  ref={ref}
                  onChange={onChange}
                  value={searchQuery}
                  placeholder="Search..."
                  type="text"
                  required
               />
               <div className="header-search__button" onClick={handleToggle}>
                  <Search />
               </div>
               {isActiveListMovie && (
                  <div
                     className="header-search__reset"
                     onClick={resetInputField}
                  >
                     <XLg />
                  </div>
               )}
            </form>
            {isActiveListMovie && (
               <div className="search-menu">
                  <div className="search-menu__list">
                     <ListMovies
                        movies={movies}
                        isHeader={true}
                        handleToggle={handleToggle}
                     />
                  </div>
                  {movies.length > 0 && (
                     <Link
                        className="search-menu__all-results"
                        to={{
                           pathname: "/search",
                           state: searchQuery,
                        }}
                        onClick={handleToggle}
                     >
                        All results
                     </Link>
                  )}
               </div>
            )}
         </div>
         <div
            className={isActiveInput ? "overlay _active" : "overlay"}
            onClick={handleToggle}
         ></div>
      </>
   );
};
export default SearchHeader;
