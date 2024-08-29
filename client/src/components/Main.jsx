import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Chatbot from './genAI/Chatbot';
import NotFound from './NotFound';
import Dashboard from './Dashboard';
import Login from "./Login"
import Signup from "./Signup"
import Home from './Home';
import "../index.css"

const Main = ({rMe, setrMe, user, setUser}) => {
   return (
      <div className="Main">
         <div className='container'>
            <Routes>
               <Route path="/" element={ <Home user={user} setUser={setUser} /> } />
               <Route path="/login" element={ <Login rMe={rMe} setrMe={setrMe} user={user} setUser={setUser} /> } />
               <Route path="/signup" element={ <Signup rMe={rMe} setrMe={setrMe} user={user} setUser={setUser} /> } />
               <Route path="/ai" element={ <Chatbot user={user} setUser={setUser} /> } />
               <Route path="/dashboard" element={ <Dashboard user={user} setUser={setUser} /> } />
               <Route path="*" element={ <NotFound /> } />
            </Routes>
         </div>
      </div>
   );
};

export default Main;
