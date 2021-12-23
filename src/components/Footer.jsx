import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Footer = () => {
   return (
      <footer className="footer">
         <div className="container">
            <div className="footer__author">
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
            <div>© 2021</div>
         </div>
      </footer>
   );
};
export default Footer;
