import nodemailer from "nodemailer"
import "dotenv/config"

const sendOtp = async (to, otp) => {
   const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
         user: process.env.GMAIL,
         pass: process.env.GMAIL_APP_PASS,
      }
   })

   try {
      const response = await transporter.sendMail({
         to,
         subject: "AutoGenie Registration OTP",
         text: `Your verification OTP is: ${otp}`
      })
      return response.messageId
   } catch (err) {
      console.log(err)
      return null
   }
}

export default sendOtp