const connectDB = async client => {
   try {
      await client.connect()
   } catch (err) {
      console.log(err)
   }
}

export default connectDB