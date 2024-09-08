import express from "express"
const router = express.Router()
import { ObjectId } from "mongodb"

// Get all
router.post("/getall", async (req, res) => {
   try {
      const user_collec = req.app.locals.db.collection("users")
      const users = await user_collec.find().toArray()
      res.json(users)
   } catch (err) {
      res.status(404).json({message: err.message})
   }
})

// Get one
router.post("/get/:id", getUser, async (req, res) => {
   res.json(res.user)
})

// Creating one
router.post('/create', async (req, res) => {
   const { email, password } = req.body
   const user = {
     email, password,
     acStatus: "Active",
     created: new Date().toISOString()
   }
   try {
     const user_collec = req.app.locals.db.collection("users")
     await user_collec.insertOne(user)
     const newUser = await user_collec.findOne({email})
     res.status(201).json(newUser)
   } catch (err) {
     res.status(400).json({ message: err.message })
   }
})
 
// Updating One(fix needed)
router.patch('/update/:id', getUser, async (req, res) => {
   const { email,  password } = req.body
   if (email) {
     res.user.email = email
   }
   if (password) {
     res.user.password = password
   }
   try {
     const updatedUser = await res.user.save()
     res.json(updatedUser)
   } catch (err) {
     res.status(400).json({ message: err.message })
   }
})
 
// Deleting One
router.delete('/:id', async (req, res) => {
   try {
     const user_collec = req.app.locals.db.collection("users")
     const { deletedCount } = await user_collec.deleteOne({_id: new ObjectId(req.params.id)})
     if (!deletedCount) {
       return res.status(404).json({ message: 'User not found' });
     }
     res.json({ message: 'Deleted User' })
   } catch (err) {
     res.status(500).json({ message: err.message })
   }
})


async function getUser(req, res, next) {
   let user
   try {
      const user_collec = req.app.locals.db.collection("users")
      user = await user_collec.findOne({_id: new ObjectId(req.params.id)})
      if (!user) {
         return res.status(404).json({ message: 'Cannot find user' })
      }
   } catch (err) {
      return res.status(500).json({ message: err.message })
   }
   res.user = user
   next()
}

export default router