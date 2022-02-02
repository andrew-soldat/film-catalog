import React from 'react'
import CardMovie from './CardMovie';
import { Row } from 'react-bootstrap'

function ListMovies({movies}) {

	return (
		<Row className="g-4">
			{movies.map(movie =>
				<CardMovie key={movie.id} movie={movie} />
			)}
		</Row>
	)
}

export default ListMovies
