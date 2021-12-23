import React from 'react';
import { useGlobalState } from '../GlobalState';
import ListMovies from '../components/ListMovies';

function Watched() {
   let { watched } = useGlobalState();

   return (
         <div className="page-list">
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
         </div>
   );
}

export default Watched;
