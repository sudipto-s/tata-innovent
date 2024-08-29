import React from 'react'
import { Link } from 'react-router-dom';
import spark from "../assets/autogenie-512.png"

const Footer = () => {
   return (
      <footer className='page-footer grey lighten-1 brown-text text-darken-2'>
         <div className='footer-main container'>
            <div className="row">
               <div className="col l6 s12 footer-heading">
                  <div className="footer-heading-top">
                     <img src={spark} alt="app icon" />
                     <h5 className="footer-app-name"><Link to="/">AutoGenie</Link></h5>
                  </div>
                  <p className="details">An application that uses AI to personalize proposals for customers</p>
               </div>
               <div className="col l4 offset-l2 s12">
                  <h5 className="">Links</h5>
                  <ul className="">
                     <li><a className="brown-text text-darken-2" rel="noreferrer" target="_blank" href="//materializecss.com">Materialize CSS</a></li>
                  </ul>
               </div>
            </div>
         </div>
         <div className="footer-copyright">
            <div className="container brown-text text-darken-2 center">
               © { new Date().getFullYear() } Copyright | The AI Garage
            </div>
         </div>
      </footer>
   );
}

export default Footer;
