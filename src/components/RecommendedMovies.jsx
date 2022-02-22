import React, { useState, useEffect } from "react";
import { MoviesService } from "../API/api";
import { useGlobalState } from "../GlobalState";
import { useFetching } from "../hooks/useFetching";
import Loader from "./UI/Loader/Loader";
import SliderMovies from "./UI/Sliders/SliderMovies";

function RecommendedMovies({ id }) {
   const { language } = useGlobalState();
   const [listOfRecommendedMovies, setListOfRecommendedMovies] = useState([]);

   const [
      fetchListOfRecommendedMoviesById,
      isListOfRecommendedMoviesByIdLoading,
      listOfRecommendedMoviesByIdError,
   ] = useFetching(async () => {
      const response = await MoviesService.getListOfRecommendedMoviesById(
         language,
         id
      );
      setListOfRecommendedMovies(response.results);
   });

   useEffect(() => {
      fetchListOfRecommendedMoviesById();
   }, [id]);

   return (
      <section className="mb-5">
         <h2 className="title">Recommendations</h2>
         {isListOfRecommendedMoviesByIdLoading && (
            <h2 className="h2">{listOfRecommendedMoviesByIdError}</h2>
         )}
         {isListOfRecommendedMoviesByIdLoading ? (
            <Loader />
         ) : (
            [
               listOfRecommendedMovies.length > 0 ? (
                  <SliderMovies listMovies={listOfRecommendedMovies} />
               ) : (
                  <div>We don't have enough data to suggest any films.</div>
               ),
            ]
         )}
      </section>
   );
}

export default RecommendedMovies;
