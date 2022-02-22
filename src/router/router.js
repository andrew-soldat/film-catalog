import Main from '../pages/Main'
import SearchPage from '../pages/SearchPage'
import Movies from '../pages/Movies'
import CollectionsMovies from '../pages/CollectionsMovies'
import GenresMovies from '../pages/GenresMovies'
import MovieDescriptionPage from '../pages/MovieDescriptionPage'
import WatchList from '../pages/WatchList'
import Watched from '../pages/Watched'
// import Error from '../pages/Error';

export const routes = [
   { component: Main, path: "/", exact: true },
   { component: SearchPage, path: "/search", exact: true },
   { component: Movies, path: "/movies", exact: true },
   {
      component: CollectionsMovies,
      path: "/collections/:collection",
      exact: true,
   },
   { component: GenresMovies, path: "/movies/:name", exact: true },
   { component: MovieDescriptionPage, path: "/watch/:id", exact: true },
   { component: WatchList, path: "/watchlist", exact: true },
   { component: Watched, path: "/watched", exact: true },
];
