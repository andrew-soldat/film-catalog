import React, { useState } from "react";

function ButtonShowMore({ children, ...props }) {
   return (
      <button {...props} className="show-more">
         Show more
      </button>
   );
}

export default ButtonShowMore;
