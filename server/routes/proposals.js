import express from "express"
const router = express.Router()
import Proposal from "../models/proposal.js"

// Get all
router.get("/", async (req, res) => {
   try {
      const proposals = await Proposal.find()
      res.json(proposals)
   } catch (err) {
      res.status(404).json({message: err.message})
   }
})

// Get one
router.get("/:id", getProposal, async (req, res) => {
   res.json(res.proposal)
})

// Creating one
router.post('/', async (req, res) => {
   const proposal = new Proposal({
     associated: req.body.associated,
     email: req.body.email,
     proposed: req.body.proposed,
     approved: req.body.approved
   })
   try {
     const newProposal = await proposal.save()
     res.status(201).json(newProposal)
   } catch (err) {
     res.status(400).json({ message: err.message })
   }
})
 
// Updating One
router.patch('/:id', getProposal, async (req, res) => {
   if (req.body.email !== null) {
     res.proposal.email = req.body.email
   }
   if (req.body.proposed !== null) {
     res.proposal.proposed = req.body.proposed
   }
   if (req.body.approved !== null) {
     res.proposal.approved = req.body.approved
   }
   try {
     const updatedProposal = await res.proposal.save()
     res.json(updatedProposal)
   } catch (err) {
     res.status(400).json({ message: err.message })
   }
})
 
// Deleting One
router.delete('/:id', getProposal, async (req, res) => {
   try {
     await res.proposal.deleteOne()
     res.json({ message: 'Deleted Proposal' })
   } catch (err) {
     res.status(500).json({ message: err.message })
   }
})


async function getProposal(req, res, next) {
   let proposal
   try {
      proposal = await Proposal.findOne({associated: req.params.id})
      if (proposal === null) {
         return res.status(404).json({ message: 'Cannot find proposal' })
      }
   } catch (err) {
      return res.status(500).json({ message: err.message })
   }
   res.proposal = proposal
   next()
}

export default router