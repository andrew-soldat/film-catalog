import React from "react";
import CardMovie from "./CardMovie";
import { Row } from "react-bootstrap";

function ListMovies({ movies, isHeader, handleToggle }) {
   return (
      <>
         {isHeader ? (
            [
               movies.length > 0 ? (
                  movies.map((movie) => (
                     <CardMovie
                        key={movie.id}
                        movie={movie}
                        handleToggle={handleToggle}
                        isHeader
                     />
                  ))
               ) : (
                  <div className="search-menu__no-results">Nothing found</div>
               ),
            ]
         ) : (
            <Row className="g-4">
               {movies.map((movie) => (
                  <CardMovie key={movie.id} movie={movie} />
               ))}
            </Row>
         )}
      </>
   );
}

export default ListMovies;
