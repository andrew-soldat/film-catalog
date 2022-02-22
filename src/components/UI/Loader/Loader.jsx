import React from "react";
import { Spinner } from "react-bootstrap";

function Loader() {
   return (
      <Spinner className="mx-auto d-block" animation="border" variant="light" />
   );
}

export default Loader;
