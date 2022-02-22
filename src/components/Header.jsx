import React from "react";
import { Link, NavLink } from "react-router-dom";
import SearchHeader from "./SearchHeader";

const Header = () => {
   return (
      <header className="header">
         <div className="container">
            <div className="header__body">
               <Link to="/" className="header__logo">
                  <img src="./assets/img/logo.svg" alt="Logo" />
               </Link>
               <div className="header__nav">
                  <SearchHeader />
                  <nav className="d-flex align-items-center">
                     <ul className="header__list">
                        <li>
                           <NavLink to="/movies" className="header__link">
                              Movies
                           </NavLink>
                        </li>
                        <li>
                           <NavLink to="/watchlist" className="header__link">
                              Watch List
                           </NavLink>
                        </li>
                        <li>
                           <NavLink to="/watched" className="header__link">
                              Watched
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
