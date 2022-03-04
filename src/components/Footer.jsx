import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
   return (
      <footer className="footer">
         <div className="container">
            <div className="footer__body">
               <div className="d-flex flex-sm-row flex-column align-items-center justify-content-center justify-content-sm-between mb-3">
                  <Link to="/" className="footer__logo">
                     <img src="assets/img/logo-02.svg" alt="Logo" />
                  </Link>
                  <div className="footer__author mt-3 mt-sm-0">
                     Created by{" "}
                     <a href="https://github.com/andrew-soldat" target="blank">
                        ANDREW BLISHCH
                     </a>
                  </div>
               </div>
               <div className="text-center">Copyright © 2022</div>
            </div>
         </div>
      </footer>
   );
};
export default Footer;
