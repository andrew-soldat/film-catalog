import React, { useEffect, useState } from "react";
import { XLg } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { MoviesService } from "../API/api";
import Input from "../components/UI/Inputs/Input";
import Loader from "../components/UI/Loader/Loader";
import SliderMovies from "../components/UI/Sliders/SliderMovies";
import { useGlobalState } from "../GlobalState";
import { useFetching } from "../hooks/useFetching";

function Main() {
   const { language } = useGlobalState();
   const [moviesTrending, setMoviesTrending] = useState([]);
   const [searchQuery, setSearchQuery] = useState("");
   const [isActiveInput, setIsActiveInput] = useState(false);

   const onChange = (e) => {
      setSearchQuery(e.target.value);

      if (e.target.value.length > 1) {
         setIsActiveInput(true);
      } else {
         setIsActiveInput(false);
      }
   };

   const resetInputField = () => {
      setSearchQuery("");
      setIsActiveInput(false);
   };

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

   return (
      <div className="container">
         <div className="welcome-block mb-5">
            <div className="welcome-block__greetings">
               <h1 className="welcome-block__title mb-3">Welcome.</h1>
               <h1 className="title">
                  Millions of movies to discover. Explore now.
               </h1>
            </div>
            <div className="welcome-block__search">
               <form className="main-search-form">
                  <div className="main-search-form__input">
                     <Input
                        onChange={onChange}
                        value={searchQuery}
                        placeholder="Search..."
                        type="text"
                        required
                     />
                     {isActiveInput && (
                        <div
                           className="main-search-form__reset"
                           onClick={resetInputField}
                        >
                           <XLg />
                        </div>
                     )}
                  </div>
                  <Link
                     className="main-search-form__btn"
                     to={{
                        pathname: "/search",
                        state: searchQuery,
                     }}
                  >
                     Search
                  </Link>
               </form>
            </div>
         </div>
         <section className="mb-5">
            <h2 className="title mb-3">Trending today</h2>
            {isMoviesTrendingLoading && (
               <h2 className="h2">{moviesTrendingError}</h2>
            )}
            {isMoviesTrendingLoading ? (
               <Loader />
            ) : (
               [
                  moviesTrending.length > 0 && (
                     <SliderMovies
                        listMovies={moviesTrending}
                     />
                  ),
               ]
            )}
         </section>
      </div>
   );
}

export default Main;
