import React, { useReducer, useContext, useEffect } from "react";
import AppReducer from "./AppReducer";

const initialState = {
   language: localStorage.getItem("language")
      ? JSON.parse(localStorage.getItem("language"))
      : "en-US",
   collections: ["popular", "now_playing", "top_rated"],
   listGenres: [
      {
         id: 28,
         name: 'Action',
      },
      {
         id: 12,
         name: 'Adventure',
      },
      {
         id: 16,
         name: 'Animation',
      },
      {
         id: 35,
         name: 'Comedy',
      },
      {
         id: 80,
         name: 'Crime',
      },
      {
         id: 99,
         name: 'Documentary',
      },
      {
         id: 18,
         name: 'Drama',
      },
      {
         id: 10751,
         name: 'Family',
      },
      {
         id: 14,
         name: 'Fantasy',
      },
      {
         id: 36,
         name: 'History',
      },
      {
         id: 27,
         name: 'Horror',
      },
      {
         id: 10402,
         name: 'Music',
      },
      {
         id: 9648,
         name: 'Mystery',
      },
      {
         id: 10749,
         name: 'Romance',
      },
      {
         id: 878,
         name: 'Science Fiction',
      },
      {
         id: 10770,
         name: 'TV Movie',
      },
      {
         id: 53,
         name: 'Thriller',
      },
      {
         id: 10752,
         name: 'War',
      },
      {
         id: 37,
         name: 'Western',
      },
   ],
   watchList: localStorage.getItem("watchList")
      ? JSON.parse(localStorage.getItem("watchList"))
      : [],
   watched: localStorage.getItem("watched")
      ? JSON.parse(localStorage.getItem("watched"))
      : [],
};

const StateContext = React.createContext();

export const useGlobalState = () => {
   return useContext(StateContext);
};

export const GlobalProvider = ({ children }) => {
   let [state, dispatch] = useReducer(AppReducer, initialState);

   const addMovieToWatchList = (movie) => {
      dispatch({ type: "ADD_MOVIE_TO_WATCH_LIST", payload: movie });
   };
   const removeMovieFromWatchList = (movie) => {
      dispatch({ type: "REMOVE_MOVIE_FROM_WATCH_LIST", payload: movie });
   };
   const addMovieToWatched = (movie) => {
      dispatch({ type: "ADD_MOVIE_TO_WATCHED", payload: movie });
   };
   const removeMovieFromWatched = (movie) => {
      dispatch({ type: "REMOVE_MOVIE_FROM_WATCHED", payload: movie });
   };

   const toggleLanguage = (language) => {
      dispatch({ type: "TOGGLE_LANGUAGE", payload: language });
   };

   useEffect(() => {
      localStorage.setItem("watchList", JSON.stringify(state.watchList));
      localStorage.setItem("watch", JSON.stringify(state.watched));
      localStorage.setItem("language", JSON.stringify(state.language));
   }, [state]);

   return (
      <StateContext.Provider
         value={{
            language: state.language,
            collections: state.collections,
            listGenres: state.listGenres,
            watchList: state.watchList,
            watched: state.watched,
            addMovieToWatchList,
            removeMovieFromWatchList,
            addMovieToWatched,
            removeMovieFromWatched,
            toggleLanguage,
         }}
      >
         {children}
      </StateContext.Provider>
   );
};
