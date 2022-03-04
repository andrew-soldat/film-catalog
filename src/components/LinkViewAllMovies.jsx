import React from "react";
import { useHistory } from "react-router";

function LinkViewAllMovies({ collection }) {
   let router = useHistory();

   return (
      <button
         type="button"
         className="view-all collection"
         onClick={() => router.push(`/collections/${collection}`)}
      >
         View all
      </button>
   );
}

export default LinkViewAllMovies;
