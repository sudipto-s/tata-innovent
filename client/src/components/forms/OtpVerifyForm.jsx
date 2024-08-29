import React from 'react'

const OtpVerifyForm = ({ handleOtpSubmit, otp, setOtp, loading, setError }) => {
   return (
      <div className="OtpVerifyForm">
         <form onSubmit={handleOtpSubmit}>
            <div className="row form-inner">
               <div className="input-field col s12">
                  <input type="number" value={otp}
                     onChange={e => {
                        setOtp(e.target.value)
                        setError("")
                     }}
                  />
                  <label htmlFor="">Enter otp</label>
               </div>
               <div className="col s12 signup-btn-div form-btn">
                  <button className="btn login-btn" type="submit">
                     {loading ? <i className="material-icons login-signup-rotate large">refresh</i> : "Verify"}
                  </button>
               </div>
            </div>
         </form>
      </div>
   );
}
 
export default OtpVerifyForm;