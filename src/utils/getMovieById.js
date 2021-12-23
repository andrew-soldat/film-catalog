export default function getMovieById (array, id) {
	return array.find((movie) => movie.id === id);
}