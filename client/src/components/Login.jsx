import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { setCookie } from '../utils/userCookie'
import { setSessionStrg } from "../utils/sessionStrg"
import axios from "axios"
import md5 from "md5"
import LoginForm from './forms/LoginForm'

const Login = ({rMe, setrMe, user, setUser}) => {
   document.title = "AutoGenie - Login"
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [error, setError] = useState("")
   const [loading, setLoading] = useState(false)
   const navigate = useNavigate()
   
   useEffect(() => {
      navigate(user?.logged && "/dashboard")
   }, [user, navigate])

   const handleSubmit = async e => {
      e.preventDefault()
      setLoading(true)
      
      try {
         const { data } = await axios.post((process.env.REACT_APP_USER || "/api/v1/user") + "/getall")
         const fromDB = data.find(u => u.email === email)
         const passwordMatched = md5(password) === fromDB?.password
         if (!fromDB) {
            setError("Invalid email")
         } else if (!passwordMatched) {
            setError("Invalid passowrd")
         } else {
            const userData = { _id: fromDB._id, email, rMe, logged: true, acStatus: fromDB.acStatus }
            if (rMe)
               setCookie("innovent-user", userData)
            else
               setSessionStrg(userData)
            setUser(userData)
            console.log('Login success')
         }
      } catch (err) {
         console.log(err)
      } finally {
         setLoading(false)
      }
   }

   return (
      <div className="Login">
         <h3 className="top-text center">Login</h3>
         { error && <p className="error-text" style={{color:"red",textAlign:"center"}}>{error}</p> }
         <LoginForm handleSubmit={handleSubmit}
            email={email} setEmail={setEmail}
            password={password} setPassword={setPassword}
            setError={setError} loading={loading}
            rMe={rMe} setrMe={setrMe}
         />
      </div>
   );
}
 
export default Login;