import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MoviesService } from "../API/api";
import ListMovies from "../components/ListMovies";
import { useFetching } from "../hooks/useFetching";
import { useGlobalState } from "../GlobalState";
import { getGenre } from "../utils/getGenre";
import Loader from "../components/UI/Loader/Loader";
import ButtonShowMore from "../components/UI/Buttons/ButtonShowMore";

function GenresMovies() {
   const [movies, setMovies] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(0);
   let params = useParams();
   const { language, listGenres } = useGlobalState();
   const genre = getGenre(listGenres, params.name);

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
      fetchListMovies();
   }, [currentPage]);

   return (
      <section>
         <div className="container py-5">
            <h1 className="title mb-3">{genre && genre.name}</h1>
            {moviesError && <h2 className="h2">{moviesError}</h2>}
            {isMoviesLoading && <Loader />}
            <ListMovies movies={movies} />
            {currentPage !== totalPages && (
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
      </section>
   );
}

export default GenresMovies;
