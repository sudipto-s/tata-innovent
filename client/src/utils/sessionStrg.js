export const getSessionStrg = () => {
   const lt = sessionStorage.getItem("innovent-user")
   return lt
}

export const setSessionStrg = (value) => {
   return sessionStorage.setItem("innovent-user", JSON.stringify(value))
}

export const removeSessionStrg = () => {
   return sessionStorage.removeItem("innovent-user")
}