const connectDB = async(app, client) => {
   try {
      await client.connect();
      console.log("Connected to MongoDB");
      app.locals.db = client.db("innovent"); // Store the db instance in app.locals
   } catch (err) {
      console.error("Failed to connect to MongoDB", err);
      process.exit(1);
   }
}

export default connectDB