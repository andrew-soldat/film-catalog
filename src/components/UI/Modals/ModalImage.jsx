import React from "react";
import { Modal } from "react-bootstrap";

function ModalImage(props) {
   const IMG_API = "https://image.tmdb.org/t/p/original/";
   console.log(props.filePath);

   return (
      <Modal
         {...props}
         show={props.showImage}
         dialogClassName="modal-fullscreen"
         className="modal-image-movie"
      >
         <Modal.Header closeButton></Modal.Header>
         <Modal.Body>
            <img
               src={props.filePath && IMG_API + props.filePath}
               alt="No photo"
            />
         </Modal.Body>
      </Modal>
   );
}

export default ModalImage;
