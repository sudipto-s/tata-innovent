import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import "dotenv/config"
import path from "path"
import { fileURLToPath } from "url"

// Models
import usersRoute from "./routes/users.js"
import proposalSchema from "./routes/proposals.js"
import emailOtpRoute from "./routes/emailOtp.js"

const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

//Middlewares
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/user', usersRoute)
app.use('/api/proposal', proposalSchema)
app.use("/api/email", emailOtpRoute)

// Constants
const PORT = process.env.PORT || 5000

// Connect to MongoDB & start the server
mongoose.connect(process.env.DATABASE_URL)
   .then(() => {
      console.log("Connected to MongoDB")
      app.listen(PORT, () => console.log(`http://localhost:5000`))
   })
   .catch(err => console.error("Error connecting to MongoDB:", err))
