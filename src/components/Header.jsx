import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useGlobalState } from '../GlobalState';

const Header = () => {
   const { language, toggleLanguage } = useGlobalState();

   useEffect(() => {}, [language]);

   return (
      <header className="header">
         <div className="container">
            <div className="header__nav">
               <Link to="/" className="header__logo">
                  {language === 'en-US' ? 'Film Catalog' : 'Каталог Фильмов'}
               </Link>
               <nav className="d-flex align-items-center">
                  <div className="d-flex align-items-center mr-4">
                     <div
                        className={
                           language === 'en-US'
                              ? 'header__language active'
                              : 'header__language'
                        }
                        onClick={() =>
                           document.location.reload(toggleLanguage('en-US'))
                        }
                     >
                        EN
                     </div>
                     <div
                        className={
                           language === 'ru-RU'
                              ? 'header__language active'
                              : 'header__language'
                        }
                        onClick={() =>
                           document.location.reload(toggleLanguage('ru-RU'))
                        }
                     >
                        RU
                     </div>
                  </div>
                  <ul className="header__list">
                     <li>
                        <NavLink to="/search" className="header__link">
                           {language === 'en-US' ? 'Search' : 'Поиск'}
                        </NavLink>
                     </li>
                     <li>
                        <NavLink to="/movies" className="header__link">
                           {language === 'en-US' ? 'Movies' : 'Фильмы'}
                        </NavLink>
                     </li>
                     <li>
                        <NavLink to="/watchlist" className="header__link">
                           {language === 'en-US'
                              ? 'Watch List'
                              : 'Список просмотра'}
                        </NavLink>
                     </li>
                     <li>
                        <NavLink to="/watched" className="header__link">
                           {language === 'en-US' ? 'Watched' : 'Просмотренные'}
                        </NavLink>
                     </li>
                  </ul>
               </nav>
            </div>
         </div>
      </header>
   );
};
export default Header;
