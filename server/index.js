import express from "express"
import cors from "cors"
import "dotenv/config"
import path from "path"
import { MongoClient } from "mongodb"
import otpLimiter from "./utils/otpLimiter.js"
import connectDB from "./utils/connectDB.js"
import shutdown from "./utils/dbShutdown.js"

// Models
import usersRoute from "./routes/users.js"
import proposalRoute from "./routes/proposals.js"
import emailOtpRoute from "./routes/emailOtp.js"
import genAIContent from "./routes/genAI.js"

const app = express()
const __dirname = path.resolve()

//Middlewares
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, "./client/build")))

// Routes
app.use('/api/v1/user', usersRoute)
app.use('/api/v1/proposal', proposalRoute)
app.use("/api/v1/email", otpLimiter, emailOtpRoute)
app.use("/api/v1/genai", genAIContent)

// Catches all routes
app.use("*", (req, res) => {
   res.sendFile(path.join(__dirname, "./client/build/index.html"))
})

// MongoDB Connection
const client = new MongoClient(process.env.DATABASE_URL);

// Constants
const PORT = process.env.PORT || 5000
connectDB(app, client).then(() => {
   app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
});

// On server shutdown close MongoDB connection
process.on('SIGINT', () => shutdown(client));
process.on('SIGTERM', () => shutdown(client));
process.on('SIGQUIT', () => shutdown(client));