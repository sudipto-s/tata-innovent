// Graceful Shutdown
const shutdown = async client => {
   console.log("Closing MongoDB connection and shutting down server...")
   await client.close()
   process.exit(0)
}

export default shutdown