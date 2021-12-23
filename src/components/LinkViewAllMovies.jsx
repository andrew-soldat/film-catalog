import React from 'react';
import { useHistory } from 'react-router';

function LinkViewAllMovies({ collection }) {
   let router = useHistory();	

   return (
      <div
         className="view-all collection"
         onClick={() => router.push(`/collections/${collection}`)}
      >
         View all
      </div>
   );
}

export default LinkViewAllMovies;
