import React from "react";

const Footer = () => {
   return (
      <footer className="footer">
         <div className="container">
            <div className="footer__body">
               <div className="footer__author mb-2">
                  <a
                     className="footer__author_link"
                     href="https://github.com/andrew-soldat"
                     target="blank"
                  >
                     <img
                        className="footer__author_icon"
                        src="assets/img/icon-github.svg"
                        alt=""
                     />
                     Andrew Blishch
                  </a>
               </div>
               <div>© 2022</div>
            </div>
         </div>
      </footer>
   );
};
export default Footer;
