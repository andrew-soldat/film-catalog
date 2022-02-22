import React from "react";
import { useGlobalState } from "../GlobalState";
import ListMovies from "../components/ListMovies";

function Watched() {
   const { watched } = useGlobalState();

   return (
      <section className="page-list">
         <div className="page-list__body container">
            <h1 className="title">Watched</h1>
            {watched.length > 0 ? (
               <ListMovies movies={watched} />
            ) : (
               <div className="no-movies">
                  <h2 className="no-movies__title">No movies</h2>
               </div>
            )}
         </div>
      </section>
   );
}

export default Watched;
