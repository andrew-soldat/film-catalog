import axios from 'axios';

const instance = axios.create({
   baseURL: 'https://api.themoviedb.org/3/',
});

const apiKey = '076fc865efeb5c33f6c3d84f0496217d'

export const MoviesService = {

	async getSortListMovie(language, sort, page = 1) {
		const response = await instance.get(`discover/movie?api_key=${apiKey}&language=${language}&sort_by=${sort}.desc&include_adult=false&include_video=false&page=${page}`)
		return response.data;
	},

	// async getListGenres() {
	// 	const response = await instance.get(`genre/movie/list?api_key=${apiKey}&language=en-US`)
	// 	return response.data;
	// },

	async getListMoviesByGenre(language, id, page = 1) {
		const response = await instance.get(`discover/movie?api_key=${apiKey}&language=${language}&with_genres=${id}&include_adult=false&include_video=false&page=${page}`)
		return response.data;
	},

	async searchMovies(language, query, page = 1) {
		const response = await instance.get(`search/movie?api_key=${apiKey}&language=${language}&page=${page}&include_adult=false&query=${query}`)
		return response.data;
	},

	async getMovieById(language, id) {
		const response = await instance.get(`movie/${id}?api_key=${apiKey}&language=${language}`)
		return response.data;
	},

	// async getVideoMovieById(id) {
	// 	const response = await instance.get(`movie/{id}/videos?api_key=${apiKey}&language=en-US`)
	// 	return response.data;
	// }
}