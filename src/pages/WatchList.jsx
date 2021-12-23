import React from 'react';
import { useGlobalState } from '../GlobalState';
import ListMovies from '../components/ListMovies';

function WatchList() {
   let { watchList } = useGlobalState();

   return (
      <div className="page-list">
         <div className="page-list__body container">
            <h1 className="title">My Watch List</h1>
            {watchList.length > 0 ? (
               <ListMovies movies={watchList} />
            ) : (
               <div className="no-movies">
                  <h2 className="no-movies__title">
                     No movies in your list, add some!
                  </h2>
               </div>
            )}
         </div>
      </div>
   );
}

export default WatchList;
