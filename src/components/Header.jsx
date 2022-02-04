import React, { useEffect, useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { MoviesService } from "../API/api";
import { useGlobalState } from "../GlobalState";
import { useFetching } from "../hooks/useFetching";
import HeaderSearch from "./UI/Inputs/HeaderSearch";
import { Search } from "react-bootstrap-icons";

const Header = () => {
   const IMG_API = "https://image.tmdb.org/t/p/w500";
   const { language, toggleLanguage } = useGlobalState();
   let router = useHistory();
   let [isActive, setIsActive] = useState(false);
   let [genre, setGenre] = useState([]);

   let [movies, setMovies] = useState([]);
   let [searchQuery, setSearchQuery] = useState("");

   const [fetchMovies, isMoviesLoading, movieError] = useFetching(async () => {
      const response = await MoviesService.searchMovies(language, searchQuery);
      setMovies(response.results);
   });

   // async function fetchListGenres() {
   //    const response = await MoviesService.getListGenres(language);
   //    setGenre(response.genres.find((i) => i.id === movie.genre_ids[0]));
   // }

   // useEffect(() => {
   //    fetchListGenres();
   // }, []);

   const onChange = (e) => {
      e.preventDefault();
      setSearchQuery(e.target.value);
      if (e.target.value.length > 1) {
         fetchMovies(searchQuery);
      } else {
         setMovies([]);
      }
   };

   const handleToggle = () => {
      setIsActive(!isActive);
   };

   useEffect(() => {}, [language]);

   useEffect(() => {
      fetchMovies();
   }, []);

   return (
      <header className="header">
         <div className="container">
            <div className="header__body">
               <Link to="/" className="header__logo">
                  <img src="./assets/img/logo.svg" alt="Logo" />
               </Link>
               <div className="header__nav">
                  <div className="header__search">
                     <form
                        class={
                           isActive ? "header-search _active" : "header-search"
                        }
                     >
                        <HeaderSearch
                           onChange={onChange}
                           value={searchQuery}
                           placeholder="Search..."
                           type="text"
                           required
                        />
                        {movies.length > 0 && isActive && (
                           <div className="search-menu">
                              {movies.map((movie) => (
                                 <div
                                    className="search-menu__item"
                                    onClick={() => {
                                       router.push(`/watch/${movie.id}`);
                                       setIsActive(false);
                                       setSearchQuery("");
                                       setMovies([]);
                                    }}
                                 >
                                    <div className="search-menu__img">
                                       <img
                                          className="img-fluid"
                                          src={
                                             movie.poster_path
                                                ? IMG_API + movie.poster_path
                                                : "assets/img/camera.jpg"
                                          }
                                          alt={movie?.title}
                                       />
                                    </div>
                                    <div className="search-menu__description p-2">
                                       <div className="search-menu__title mb-1">
                                          {movie?.title}
                                       </div>
                                       <div className="search-menu__text">
                                          {movie.release_date &&
                                             `${movie.release_date.substring(
                                                0,
                                                4
                                             )},`}{" "}
                                          {/* {genre?.name} */}
                                       </div>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        )}
                     </form>
                     <button
                        class="header__search_button"
                        onClick={handleToggle}
                     >
                        <Search />
                     </button>
                  </div>
                  <nav className="d-flex align-items-center">
                     <div className="d-flex align-items-center mr-4">
                        <div
                           className={
                              language === "en-US"
                                 ? "header__language active"
                                 : "header__language"
                           }
                           onClick={() =>
                              document.location.reload(toggleLanguage("en-US"))
                           }
                        >
                           EN
                        </div>
                        <div
                           className={
                              language === "ru-RU"
                                 ? "header__language active"
                                 : "header__language"
                           }
                           onClick={() =>
                              document.location.reload(toggleLanguage("ru-RU"))
                           }
                        >
                           RU
                        </div>
                     </div>
                     <ul className="header__list">
                        <li>
                           <NavLink to="/search" className="header__link">
                              {language === "en-US" ? "Search" : "Поиск"}
                           </NavLink>
                        </li>
                        <li>
                           <NavLink to="/movies" className="header__link">
                              {language === "en-US" ? "Movies" : "Фильмы"}
                           </NavLink>
                        </li>
                        <li>
                           <NavLink to="/watchlist" className="header__link">
                              {language === "en-US"
                                 ? "Watch List"
                                 : "Список просмотра"}
                           </NavLink>
                        </li>
                        <li>
                           <NavLink to="/watched" className="header__link">
                              {language === "en-US"
                                 ? "Watched"
                                 : "Просмотренные"}
                           </NavLink>
                        </li>
                     </ul>
                  </nav>
               </div>
            </div>
         </div>
      </header>
   );
};
export default Header;
