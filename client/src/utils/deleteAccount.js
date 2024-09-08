import axios from "axios"
import $ from "jquery"
import { removeCookie } from "./userCookie"

const deleteAccount = async (_id, setUser) => {
   const consent = prompt("Sure delete your account? Type 'delete my account'.")?.trim().toLocaleLowerCase()
   if (consent === "delete my account") {
      $(".account-delete-btn").text("Deleting account...")
      try {
         const { data: deleteProposal } = await axios.delete(`${process.env.REACT_APP_PROPOSAL || "/api/v1/proposal"}/${_id}`)
         console.log(deleteProposal)

         const { data: deleteUser } = await axios.delete(`${process.env.REACT_APP_USER || "/api/v1/user"}/${_id}`)
         console.log(deleteUser)
         removeCookie("innovent-user")
         setUser(null)

         alert("Account deleted successfully!")
      } catch (err) {
         console.log(err)
         $(".account-delete-btn").text("DELETE MY ACCOUNT")
         alert("Account deletion unsuccess!")
      }
   } else
      alert("Account deletion unsuccess!")
}

export default deleteAccount