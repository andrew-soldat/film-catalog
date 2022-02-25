import axios from "axios";

const instance = axios.create({
   baseURL: "https://api.themoviedb.org/3/",
});

const apiKey = "076fc865efeb5c33f6c3d84f0496217d";

export const MoviesService = {
   async getTrendingMovies(language) {
      const response = await instance.get(
         `trending/movie/day?api_key=${apiKey}&language=${language}`
      );
      return response.data;
   },

   async getCollectionMovies(language, collection, page = 1) {
      const response = await instance.get(
         `movie/${collection}?api_key=${apiKey}&language=${language}&page=${page}`
      );
      return response.data;
   },

   async getListGenres(language) {
      const response = await instance.get(
         `genre/movie/list?api_key=${apiKey}&language=${language}`
      );
      return response.data;
   },

   async getListMoviesByGenre(language, id, page = 1) {
      const response = await instance.get(
         `discover/movie?api_key=${apiKey}&language=${language}&with_genres=${id}&include_adult=false&include_video=false&page=${page}`
      );
      return response.data;
   },

   async searchMovies(language, query, page = 1) {
      const response = await instance.get(
         `search/movie?api_key=${apiKey}&language=${language}&page=${page}&include_adult=false&query=${query}`
      );
      return response.data;
   },

   async getMovieById(language, id) {
      const response = await instance.get(
         `movie/${id}?api_key=${apiKey}&language=${language}`
      );
      return response.data;
   },

   async getVideosMovieById(language, id) {
      const response = await instance.get(
         `movie/${id}/videos?api_key=${apiKey}&language=${language}`
      );
      return response.data;
   },

   async getCastAndCrewMovieById(language, id) {
      const response = await instance.get(
         `movie/${id}/credits?api_key=${apiKey}&language=${language}`
      );
      return response.data;
   },

   async getImagesMovieById(id) {
      const response = await instance.get(
         `movie/${id}/images?api_key=${apiKey}`
      );
      return response.data;
   },

   async getListOfRecommendedMoviesById(language, id) {
      const response = await instance.get(
         `movie/${id}/recommendations?api_key=${apiKey}&language=${language}`
      );
      return response.data;
   },
};
