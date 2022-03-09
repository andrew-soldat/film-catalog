import { useState, useEffect } from "react";
import { MoviesService } from "../API/api";
import { useGlobalState } from "../GlobalState";
import { useFetching } from "./useFetching";

export const useTrendingMoviesQuery = () => {
   const { language } = useGlobalState();
   const [moviesTrending, setMoviesTrending] = useState([]);

   const [
      fetchListMoviesTrending,
      isMoviesTrendingLoading,
      moviesTrendingError,
   ] = useFetching(async () => {
      const response = await MoviesService.getTrendingMovies(language);
      setMoviesTrending(response.results);
   });

   useEffect(() => {
      fetchListMoviesTrending();
   }, []);

   return [moviesTrending, isMoviesTrendingLoading, moviesTrendingError]
};
