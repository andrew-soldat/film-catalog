import React from "react";
import { Modal } from "react-bootstrap";

function ModalTrailer(props) {
   return (
      <Modal
         {...props}
         show={props.showTrailer}
         size="lg"
         className="modal-video-movie"
         aria-labelledby="contained-modal-title-vcenter"
         centered
      >
         <Modal.Header closeButton>Play Trailer</Modal.Header>
         <Modal.Body>
            <iframe
               src={
                  props.keyTrailer
                     ? `https://www.youtube.com/embed/${props.keyTrailer}`
                     : null
               }
               title="YouTube video player"
               frameBorder="0"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               allowFullScreen
            ></iframe>
         </Modal.Body>
      </Modal>
   );
}

export default ModalTrailer;
