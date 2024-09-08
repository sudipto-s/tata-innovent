import express from "express"
import sendOtp from "../utils/otpSender.js"
import { MongoClient } from "mongodb";
import md5 from "md5";

const router = express.Router()
const client = new MongoClient(process.env.DATABASE_URL)

router.post("/sendotp", async (req, res) => {
   const { email } = req.body
   let otp = ""
   for (let i = 0; i < 6; i++) {
      otp += Math.floor(Math.random() * 10)
   }
   try {
      const otp_collec = req.app.locals.db.collection("otp")
      await otp_collec.deleteOne({ _id: email })
      const messageId = await sendOtp(email, otp)
      await otp_collec.insertOne({
         _id: email, messageId: messageId.substring(1, 14), otp: md5(otp)
      })
      res.json({ message: "OTP sent successfully" })
   } catch (err) {
      console.error(err)
      res.status(500).json({ message: "Error sending OTP" })
   } finally {
      await client.close(0)
   }
})

router.post("/verifyotp", async (req, res) => {
   const { otp, email } = req.body
   try {
      const otp_collec = req.app.locals.db.collection("otp")
      const response = await otp_collec.findOne({ _id: email })
      if (response) {
         if (otp === response.otp) {
            await otp_collec.deleteOne({ _id: email })
            res.json({ message: "OTP verified successfully" })
         } else {
            res.status(401).json({ message: "Invalid OTP" })
         }
      } else {
         res.status(500).json({ message: "Error verifying OTP" })
      }
   } catch (err) {
      console.error(err)
      res.status(500).json({ message: "Error verifying OTP" })
   } finally {
      await client.close(0)
   }
})

export default router