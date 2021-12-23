import React from 'react';
import { useHistory } from 'react-router';

function LinkViewAllMoviesByGenres({ name }) {
   let router = useHistory();

   return (
      <div
         className="view-all"
         onClick={() => router.push(`/movies/${name.toLowerCase().replace(/\s/g, '_')}`)}
      >
			<div>
				<img className="img-fluid" src={`assets/img/icons/${name}.png`} alt={name} />
			</div>
			<div className="link-genre__name mt-3"> {name}</div>
        
      </div>
   );
}

export default LinkViewAllMoviesByGenres;
