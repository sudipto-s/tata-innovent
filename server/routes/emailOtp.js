import express from "express"
import sendOtp from "../helper/otpSender.js"
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
      await client.connect()
      await client.db("innovent").collection('otp').deleteOne({ _id: email })
      const messageId = await sendOtp(email, otp)
      await client.db("innovent").collection('otp').insertOne({
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
      await client.connect()
      const response = await client.db("innovent").collection("otp").findOne({ _id: email })
      if (response) {
         if (otp === response.otp) {
            await client.db("innovent").collection("otp").deleteOne({ _id: email })
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