import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { getCookie, setCookie } from '../utils/userCookie'
import axios from "axios"
import md5 from "md5"
import SignupForm from './forms/SignupForm'
import OtpVerifyForm from "./forms/OtpVerifyForm"

const Signup = ({user, setUser}) => {
   document.title = "AutoGenie - Signup"
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [confirmPassword, setconfirmPassword] = useState("")
   const [error, setError] = useState("")
   const [loading, setLoading] = useState(false)
   const [registerForm, setRegisterForm] = useState(true)
   const [otp, setOtp] = useState("")
   const navigate = useNavigate()
   
   useEffect(() => {
      navigate(user?.logged && "/dashboard")
   }, [user, navigate])

   const handleRegisterSubmit = async e => {
      e.preventDefault()
      setLoading(true)

      if (password !== confirmPassword) {
         setError("Passwords do not match")
         setLoading(false)
         return
      }
      try {
         const { data: data1 } = await axios.get(process.env.REACT_APP_USER)
         let emailExists = false
         data1?.forEach(u => {
            if (u.email === email) {
               setError("Email already exists")
               setLoading(false)
               emailExists = true
               return
            }
         })
         
         if (!emailExists) {
            await axios.post(process.env.REACT_APP_SEND_OTP, { email })
            setRegisterForm(false)
         }
      } catch (err) {
         console.log(err)
         setError(err?.response?.data?.message)
      } finally {
         setLoading(false)
      }
   }

   const handleOtpSubmit = async e => {
      e.preventDefault()
      setLoading(true)

      try {
         await axios.post(process.env.REACT_APP_VERIFY_OTP, { email, otp: md5(otp) })
   
         const { data: data2 } = await axios.post(process.env.REACT_APP_USER, {
            email, password: md5(password)
         })
   
         await axios.post(process.env.REACT_APP_PROPOSAL, {
            email, associated: data2._id
         })
         
         setCookie("innovent-user", { _id: data2._id, email, rMe: true, logged: true, acStatus: "Active" })
         setUser(getCookie("innovent-user"))
         alert("Welcome to AutoGenie")
      } catch (err) {
         console.log(err)
         setOtp("")
         setError("Invalid OTP")
      } finally {
         setLoading(false)
      }
   }
   
   return (
      <div className="Signup">
         <h3 className="top-text center">{registerForm ? "Signup" : "Verify OTP" }</h3>
         { error && <p className="error-text" style={{color:"red",textAlign:"center"}}>{error}</p> }
         {registerForm ?
            <SignupForm handleRegisterSubmit={handleRegisterSubmit}
               email={email} setEmail={setEmail}
               password={password} setPassword={setPassword}
               confirmPassword={confirmPassword} setconfirmPassword={setconfirmPassword}
               loading={loading} setError={setError}
            /> :
            <OtpVerifyForm
               handleOtpSubmit={handleOtpSubmit}
               otp={otp} setOtp={setOtp}
               loading={loading} setError={setError}
            />
         }
      </div>
   );
}
 
export default Signup;