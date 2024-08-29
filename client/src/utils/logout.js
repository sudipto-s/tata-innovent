import { removeCookie } from "./userCookie"

export const logout = (user, setUser) => {
   if (user?.logged) {
      removeCookie("innovent-user")
      setUser(null)
   }
}