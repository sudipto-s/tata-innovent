import express from "express"
const router = express.Router()
import User from "../models/user.js"

// Get all
router.get("/", async (req, res) => {
   try {
      const users = await User.find()
      res.json(users)
   } catch (err) {
      res.status(404).json({message: err.message})
   }
})

// Get one
router.get("/:id", getUser, async (req, res) => {
   res.json(res.user)
})

// Creating one
router.post('/', async (req, res) => {
   const user = new User({
     email: req.body.email,
     password: req.body.password
   })
   try {
     const newUser = await user.save()
     res.status(201).json(newUser)
   } catch (err) {
     res.status(400).json({ message: err.message })
   }
})
 
// Updating One
router.patch('/:id', getUser, async (req, res) => {
   if (req.body.email !== null) {
     res.user.email = req.body.email
   }
   if (req.body.password !== null) {
     res.user.password = req.body.password
   }
   try {
     const updatedUser = await res.user.save()
     res.json(updatedUser)
   } catch (err) {
     res.status(400).json({ message: err.message })
   }
})
 
// Deleting One
router.delete('/:id', getUser, async (req, res) => {
   try {
     await res.user.deleteOne()
     res.json({ message: 'Deleted User' })
   } catch (err) {
     res.status(500).json({ message: err.message })
   }
})


async function getUser(req, res, next) {
   let user
   try {
      user = await User.findById(req.params.id)
      if (user === null) {
         return res.status(404).json({ message: 'Cannot find user' })
      }
   } catch (err) {
      return res.status(500).json({ message: err.message })
   }
   res.user = user
   next()
}

export default router