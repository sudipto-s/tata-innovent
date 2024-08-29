import React, { useEffect, useState } from 'react'
import Header from "./components/Header"
import Footer from "./components/Footer"
import Main from './components/Main';
import { BrowserRouter as Route } from 'react-router-dom';
import { getCookie, removeCookie } from './utils/userCookie';
import { getSessionStrg } from './utils/sessionStrg';

   const App = () => {
   const [user, setUser] = useState(getSessionStrg() || getCookie("innovent-user"))
   const [rMe, setrMe] = useState(true)

   useEffect(() => {
      if (!rMe) {
         window.addEventListener("beforeunload", handleTabClose)
      }
      return () => window.removeEventListener("beforeunload", handleTabClose)
   })

   const handleTabClose = () => {
      if (!rMe) {
         removeCookie("innovent-user")
         setUser(null)
      }
   }

   return (
      <Route>
         <Header rMe={rMe} user={user} setUser={setUser} />
         <Main rMe={rMe} setrMe={setrMe} user={user} setUser={setUser} />
         <Footer />
      </Route>
   );
}
 
export default App;