import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MoviesService } from "../API/api";
import { useGlobalState } from "../GlobalState";
import ModalTrailer from "../components/UI/Modals/ModalTrailer";
import ModalImage from "../components/UI/Modals/ModalImage";
import { useFetching } from "../hooks/useFetching";
import RecommendedMovies from "../components/RecommendedMovies";
import DescriptionMovie from "../components/AboutMovie/DescriptionMovie";
import TabInfoMovie from "../components/AboutMovie/TabInfoMovie";

function MovieDescriptionPage() {
   let params = useParams();
   const [movie, setMovie] = useState({});
   const [listCast, setListCast] = useState([]);
   const [listCrew, setListCrew] = useState([]);
   const [listTrailers, setListVideo] = useState([]);
   const [keyTrailer, setKeyTrailer] = useState("");
   const [listBackdrops, setListBackdrops] = useState([]);
   const [listPosters, setListPosters] = useState([]);
   const [filePath, setFilePath] = useState("");
   const [showTrailer, setShowTrailer] = useState(false);
   const [showImage, setShowImage] = useState(false);
   const { language } = useGlobalState();

   function handleShow(key) {
      setKeyTrailer(key);
      setShowTrailer(true);
   }

   function handleShowImage(file) {
      setFilePath(file);
      setShowImage(true);
   }

   const [fetchMovieById, isMovieByIdLoading, movieByIdError] = useFetching(
      async () => {
         const response = await MoviesService.getMovieById(language, params.id);
         setMovie(response);
      }
   );

   async function fetchCastAndCrewMovie() {
      const response = await MoviesService.getCastAndCrewMovieById(
         language,
         params.id
      );
      setListCast(response.cast);
      setListCrew(response.crew);
   }

   async function fetchVideosMovie() {
      const response = await MoviesService.getVideosMovieById(
         language,
         params.id
      );
      setListVideo(response.results);
   }

   async function fetchImagesMovie() {
      const response = await MoviesService.getImagesMovieById(params.id);
      setListBackdrops(response.backdrops);
      setListPosters(response.posters);
   }

   useEffect(() => {
      fetchMovieById();
      fetchCastAndCrewMovie();
      fetchVideosMovie();
      fetchImagesMovie();
   }, [params.id]);

   return (
      <div className="container py-5">
         <DescriptionMovie
            movie={movie}
            loading={isMovieByIdLoading}
            error={movieByIdError}
            listTrailers={listTrailers}
            handleShow={handleShow}
         />
         <TabInfoMovie
            listCast={listCast}
            listCrew={listCrew}
            listTrailers={listTrailers}
            listBackdrops={listBackdrops}
            listPosters={listPosters}
            handleShow={handleShow}
            handleShowImage={handleShowImage}
         />
         <RecommendedMovies id={params.id} />
         {listTrailers && (
            <ModalTrailer
               keyTrailer={keyTrailer}
               showTrailer={showTrailer}
               onHide={() => setShowTrailer(false)}
            />
         )}
         {listBackdrops && listPosters && (
            <ModalImage
               filePath={filePath}
               showImage={showImage}
               onHide={() => setShowImage(false)}
            />
         )}
      </div>
   );
}

export default MovieDescriptionPage;
