import React from "react";
import { Modal } from "react-bootstrap";

function ModalImage(props) {
   const IMG_API = "https://image.tmdb.org/t/p/original/";

   return (
      <Modal
         {...props}
         show={props.showImage}
         dialogClassName="modal-fullscreen"
         className="modal-image-movie"
      >
         <Modal.Header closeButton></Modal.Header>
         <Modal.Body>
            <img src={props.filePath && IMG_API + props.filePath} alt="Foto" />
         </Modal.Body>
      </Modal>
   );
}

export default ModalImage;
