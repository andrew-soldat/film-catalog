import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalState } from "../GlobalState";
import { MoviesService } from "../API/api";
import ListMovies from "../components/ListMovies";
import { useFetching } from "../hooks/useFetching";
import { Spinner } from "react-bootstrap";

function CollectionsMovies() {
   const listHeader = [
      { name: "Populars now", collection: "popular" },
      { name: "Playing now in theatres", collection: "now_playing" },
      { name: "Top Rated", collection: "top_rated" },
   ];
   let [movies, setMovies] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(0);
   let params = useParams();
   let currentHeader = listHeader.find(
      (item) => item.collection === params.collection
   );
   let { language } = useGlobalState();

   const [fetchListMovies, isMoviesLoading, moviesError] = useFetching(
      async () => {
         const response = await MoviesService.getCollectionMovies(
            language,
            params.collection,
            currentPage
         );
         console.log(response.results);
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
         <div className="container">
            <h1 className="title mb-3">{currentHeader.name}</h1>
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

export default CollectionsMovies;
