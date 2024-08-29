import Cookies from "js-cookie"
import axios from "axios"

export const getCookie = (key, _id) => {
   if (_id) {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/${_id}`)
      .then(response => {
         console.log(response)
      })
      .catch(err => console.log(err))
   }
   const cookies = Cookies.get(key, {secure:true})
   return cookies && JSON.parse(cookies)
}

export const setCookie = (key, value) => {
   Cookies.set(key, JSON.stringify(value), {expires:1, secure:true})
}

export const removeCookie = (key) => {
   Cookies.remove(key, {secure:true})
}