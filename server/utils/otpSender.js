import nodemailer from "nodemailer"
import "dotenv/config"

const sendOtp = async (to, otp) => {
   const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
         user: process.env.EMAIL,
         pass: process.env.EMAIL_APP_PASS,
      }
   })

   try {
      const response = await transporter.sendMail({
         from: `AutoGenie <${process.env.EMAIL}>`,
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