import mongoose from "mongoose";

const proposalSchema = new mongoose.Schema({
   associated: {
      type: String,
      unique: true
   },
   email: {
      type: String,
      unique: true
   },
   proposed: {
      type: Number,
      default: 0
   },
   approved: {
      type: Number,
      default: 0,
   }
})

export default mongoose.model("Proposal", proposalSchema)