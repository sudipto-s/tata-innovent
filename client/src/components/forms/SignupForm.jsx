import React from 'react'
import { Link } from 'react-router-dom';

const SignupForm = ({ handleRegisterSubmit, email, setEmail, password, setPassword, confirmPassword, setconfirmPassword, setError, loading }) => {
   return (
      <form onSubmit={handleRegisterSubmit}>
         <div className="row form-inner">
            <div className="input-field col s12">
               <input id="email" type="email" value={email} required
                  onChange={e => {
                     setEmail(e.target.value);
                     setError("")
                  }}
               />
               <label htmlFor="email">Email:</label>
            </div>
            <div className="input-field col s12">
               <input id="password" type="password" value={password} required
                  onChange={e => {
                     setPassword(e.target.value);
                     setError("")
                  }}
               />
               <label htmlFor="password">Password:</label>
            </div>
            <div className="input-field col s12">
               <input id="confirmPassword" type="password" value={confirmPassword} required
                  onChange={e => {
                     setconfirmPassword(e.target.value)
                     setError("")
                  }}
               />
               <label htmlFor="confirmPassword">Confirm password:</label>
            </div>
            <div className="col s12 signup-btn-div form-btn">
               <button className="btn login-btn" type="submit">
                  {loading ? <i className="material-icons login-signup-rotate large">refresh</i> : "Signup"}
               </button>
            </div>
            <div className="col s12 login-link-div form-link">
               <span>Already have an account? </span>
               <Link className="signup-link" to="/login">Login</Link>
            </div>
         </div>
      </form>
   );
}
 
export default SignupForm;