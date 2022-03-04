import React from "react";

function ButtonShowMore({ children, ...props }) {
   return (
      <button {...props} className="show-more">
         {children}
      </button>
   );
}

export default ButtonShowMore;
