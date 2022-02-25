import React from 'react';
import { useGlobalState } from '../GlobalState';
import ListMovies from '../components/ListMovies';

function WatchList() {
   const { watchList } = useGlobalState();

   return (
      <section className="page-list py-5">
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
      </section>
   );
}

export default WatchList;
