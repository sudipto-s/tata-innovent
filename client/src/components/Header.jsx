import React, { useEffect } from 'react'
import { Link } from "react-router-dom"
import spark from "../assets/autogenie-512.png"
import { logout } from '../utils/logout'
import $ from "jquery"
import M from "materialize-css"

const flex = {display:"flex",alignItems:"center",justifyContent:"space-between"};

const Header = ({user, setUser}) => {
   const logged = user?.logged ?? false
   $(function() {
      $('.header-navlink').on('click', e => {
         M.Sidenav.getInstance($('.sidenav')).close()
      })
   })
   useEffect(() => {
      M.AutoInit()
   }, [])

   return (
      <header className="header grey lighten-1" style={flex}>
         <div className="app-logo-text">
            <img src={spark} alt="app logo" />
            <p><Link to="/">AutoGenie</Link></p>
         </div>
         <div>
            <a href='#!' data-target="slide-nav" className="sidenav-trigger">
               <i className="material-icons brown-text text-darken-1 small">menu</i>
            </a>
         </div>
         <ul className="sidenav" id="slide-nav">
            <li><a className="subheader" href="#!">More options</a></li>
            { !logged ? <li><Link className="header-navlink navlink-home" to="/">Home</Link></li> : null }
            { !logged ? <li><Link className="header-navlink navlink-login" to="/login">Login</Link></li> : null }
            { !logged ? <li><Link className="header-navlink navlink-signup" to="/signup">Signup</Link></li> : null }
            { logged ? <li><Link className="header-navlink navlink-dashhboard" to="/dashboard">Dashboard</Link></li> : null }
            { logged ? <li><Link className="header-navlink navlink-ai" to="/ai">AutoGenie</Link></li> : null }
            { logged ? <li><a className="header-navlink navlink-logout" href="#!"
               onClick={e => logout(user, setUser)}
            >Logout</a></li> : null }
         </ul>
      </header>
   );
}

export default Header;