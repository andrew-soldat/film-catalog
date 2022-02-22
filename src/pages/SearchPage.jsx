import React, { useState, useEffect } from "react";
import { MoviesService } from "../API/api";
import ListMovies from "../components/ListMovies";
import Input from "../components/UI/Inputs/Input";
import { useFetching } from "../hooks/useFetching";
import { useGlobalState } from "../GlobalState";
import Loader from "../components/UI/Loader/Loader";
import { useLocation } from "react-router-dom";
import { Search, XLg } from "react-bootstrap-icons";
import ButtonShowMore from "../components/UI/Buttons/ButtonShowMore";

function SearchPage() {
   let { state } = useLocation();
   const [searchQuery, setSearchQuery] = useState(state || "");
   const [movies, setMovies] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(0);
   const [isActive, setIsActive] = useState(state ? true : false);
   const { language } = useGlobalState();

   const [fetchMovies, isMoviesLoading, movieError] = useFetching(async () => {
      const response = await MoviesService.searchMovies(
         language,
         searchQuery,
         currentPage
      );
      setMovies([...movies, ...response.results]);
      setTotalPages(response.total_pages);
   });

   const onChange = (e) => {
      setSearchQuery(e.target.value);

      if (e.target.value.length > 1) {
         setIsActive(true);
         fetchMovies();
      } else {
         setMovies([]);
         setIsActive(false);
         setCurrentPage(1);
         setTotalPages(0);
      }
   };

   const resetInputField = () => {
      setSearchQuery("");
      setMovies([]);
      setIsActive(false);
      setCurrentPage(1);
      setTotalPages(0);
   };

   const showMore = () => {
      if (currentPage < totalPages) {
         setCurrentPage((prevState) => prevState + 1);
      }
   };

   useEffect(() => {
      fetchMovies();
   }, [currentPage]);

   return (
      <div className="container">
         <div className="mb-5">
            <form className="search-form">
               <div className="search-form__icon">
                  <Search />
               </div>
               <Input
                  onChange={onChange}
                  value={searchQuery}
                  placeholder="Search..."
                  type="text"
                  required
               />
               {isActive && (
                  <div className="search-form__reset" onClick={resetInputField}>
                     <XLg />
                  </div>
               )}
            </form>
         </div>
         {searchQuery.length > 1 &&
            (isMoviesLoading ? (
               <Loader />
            ) : movies.length > 0 ? (
               <div className="mb-5">
                  <ListMovies movies={movies} />
               </div>
            ) : (
               <div className="no-movies">
                  <h2 className="no-movies__title">Nothing found</h2>
               </div>
            ))}
         {totalPages > 1 && currentPage !== totalPages && (
            <ButtonShowMore
               onClick={showMore}
               currentPage={currentPage}
               totalPages={totalPages}
               type="button"
            >
               Show more
            </ButtonShowMore>
         )}
      </div>
   );
}

export default SearchPage;
