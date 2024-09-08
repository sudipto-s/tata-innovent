import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import "dotenv/config"
import path from "path"
import otpLimiter from "./utils/otpLimiter.js"

// Models
import usersRoute from "./routes/users.js"
import proposalSchema from "./routes/proposals.js"
import emailOtpRoute from "./routes/emailOtp.js"
import genAIContent from "./routes/genAI.js"

const app = express()
const __dirname = path.resolve()

//Middlewares
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, "../client/build")))

// Routes
app.use('/api/v1/user', usersRoute)
app.use('/api/v1/proposal', proposalSchema)
app.use("/api/v1/email", otpLimiter, emailOtpRoute)
app.use("/api/v1/genai", genAIContent)

// Catches all routes
app.use("*", (req, res) => {
   res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

// Constants
const PORT = process.env.PORT || 5000

// Connect to MongoDB & start the server
mongoose.connect(process.env.DATABASE_URL)
   .then(() => {
      console.log("Connected to MongoDB")
      app.listen(PORT, () => console.log(`http://localhost:5000`))
   })
   .catch(err => console.error("Error connecting to MongoDB:", err))
