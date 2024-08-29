import React from 'react'
import { Link } from "react-router-dom"

const LoginForm = ({ handleSubmit, email, setEmail, password, setPassword, setError, loading, rMe, setrMe }) => {
   return (
      <form onSubmit={handleSubmit}>
         <div className="row form-inner">
            <div className="input-field col s12">
               <input id="email" type="email" value={email} required
                  onChange={e => {
                     setEmail(e.target.value)
                     setError("")
                  }}
               />
               <label htmlFor="email">Email:</label>
            </div>
            <div className="input-field col s12">
               <input id="password" type="password" value={password} required
                  onChange={e => {
                     setPassword(e.target.value)
                     setError("")
                  }}
               />
               <label htmlFor="password">Password:</label>
            </div>
            <div className="col s12 login-btn-div form-btn">
               <button className="btn login-btn" type="submit">
                  {loading ? <i className="material-icons login-signup-rotate large">refresh</i> : "Login"}
               </button>
            </div>
            <div className="rMe-forgot-pass">
               <label>
                  <input type="checkbox" checked={rMe}
                     onChange={e => setrMe(e.target.checked)}
                  />
                  <span>Remember me</span>
               </label>
               <Link to="/login">Forgot password?</Link>
            </div>
            <div className="col s12 signup-link-div form-link">
               <span>Don't have an account? </span>
               <Link className="signup-link" to="/signup">Signup</Link>
            </div>
         </div>
      </form>
   );
}
 
export default LoginForm;