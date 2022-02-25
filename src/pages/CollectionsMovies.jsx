import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalState } from "../GlobalState";
import { MoviesService } from "../API/api";
import ListMovies from "../components/ListMovies";
import { useFetching } from "../hooks/useFetching";
import Loader from "../components/UI/Loader/Loader";
import ButtonShowMore from "../components/UI/Buttons/ButtonShowMore";

function CollectionsMovies() {
   const listHeader = [
      { name: "Populars now", collection: "popular" },
      { name: "Playing now in theatres", collection: "now_playing" },
      { name: "Top Rated", collection: "top_rated" },
   ];
   const [movies, setMovies] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(0);
   let params = useParams();
   const currentHeader = listHeader.find(
      (item) => item.collection === params.collection
   );
   const { language } = useGlobalState();

   const [fetchListMovies, isMoviesLoading, moviesError] = useFetching(
      async () => {
         const response = await MoviesService.getCollectionMovies(
            language,
            params.collection,
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
            <h1 className="title mb-3">{currentHeader.name}</h1>
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

export default CollectionsMovies;
