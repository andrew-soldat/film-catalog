import React, { useState } from "react";
import { XLg } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Input from "../components/UI/Inputs/Input";
import SliderMovies from "../components/UI/Sliders/SliderMovies";
import { useTrendingMoviesQuery } from "../hooks/useTrendingMoviesQuery";

function Main() {
   const [items, loading, error] = useTrendingMoviesQuery();
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
            <SliderMovies listMovies={items} loading={loading} error={error} />
         </section>
      </div>
   );
}

export default Main;
