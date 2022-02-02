import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { MoviesService } from "../API/api";
import ListMovies from "../components/ListMovies";
import { useFetching } from "../hooks/useFetching";
import { Spinner } from "react-bootstrap";
import { useGlobalState } from "../GlobalState";
import { getGenre } from "../utils/getGenre";

function GenresMovies() {
   let [movies, setMovies] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(0);
   let params = useParams();
   let { language, listGenres } = useGlobalState();
   let genre = getGenre(listGenres, params.name);
   // let [genre, setGenres] = useState({});

   // async function fetchListGenres() {
   //    const response = await MoviesService.getListGenres(language);
   //    setGenres(getGenre(response.genres, params.name));
   // }

   const [fetchListMovies, isMoviesLoading, moviesError] = useFetching(
      async () => {
         const response = await MoviesService.getListMoviesByGenre(
            language,
            genre.id,
            currentPage
         );
         setMovies([...movies, ...response.results]);
         setTotalPages(response.total_pages);
      }
   );

   const showMore = () => {
      if (currentPage < totalPages) {
         setCurrentPage((prevState) => prevState + 1);
      }
   };

   useEffect(() => {
      // fetchListGenres();
      fetchListMovies();
   }, [currentPage]);

   return (
      <section>
         <div className="container">
            <h1 className="title mb-3">{genre && genre.name}</h1>
            {moviesError && <h2 className="h2">{moviesError}</h2>}
            {isMoviesLoading && (
               <Spinner
                  className="mx-auto d-block fs-1"
                  animation="grow"
                  variant="secondary"
               />
            )}
            <ListMovies movies={movies} />
            <button
               type="button"
               onClick={() => showMore()}
               className={
                  currentPage === totalPages ? "show-more hide" : "show-more"
               }
            >
               Show more
            </button>
         </div>
      </section>
   );
}

export default GenresMovies;
