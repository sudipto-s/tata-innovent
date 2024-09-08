import express from "express"
const router = express.Router()

// Get all
router.post("/getall", async (req, res) => {
   try {
      const proposal_collec = req.app.locals.db.collection("proposals")
      const proposals = await proposal_collec.find().toArray()
      res.json(proposals)
   } catch (err) {
      res.status(404).json({message: err.message})
   }
})

// Get one
router.post("/get/:id", getProposal, async (req, res) => {
   res.json(res.proposal)
})

// Creating one
router.post('/create', async (req, res) => {
   const { email, associated } = req.body
   const proposal = {
     associated, email, proposed: 0, approved: 0
   }
   try {
     const proposal_collec = req.app.locals.db.collection("proposals")
     await proposal_collec.insertOne(proposal)
     const newProposal = await proposal_collec.findOne({associated})
     res.status(201).json(newProposal)
   } catch (err) {
     res.status(400).json({ message: err.message })
   }
})
 
// Updating One(fix needed)
router.patch('/update/:id', getProposal, async (req, res) => {
   const { email, proposed, approved } = req.body
   if (email) {
     res.proposal.email = email
   }
   if (proposed) {
     res.proposal.proposed = proposed
   }
   if (approved) {
     res.proposal.approved = approved
   }
   try {
     const updatedProposal = await res.proposal.save()
     res.json(updatedProposal)
   } catch (err) {
     res.status(400).json({ message: err.message })
   }
})
 
// Deleting One
router.delete('/:id', async (req, res) => {
   try {
     const proposal_collec = req.app.locals.db.collection("proposals")
     const { deletedCount } = await proposal_collec.deleteOne({associated: req.params.id})
     if (!deletedCount) {
      return res.status(404).json({ message: "Proposal not found" })
     }
     res.json({ message: 'Deleted Proposal' })
   } catch (err) {
     res.status(500).json({ message: err.message })
   }
})


async function getProposal(req, res, next) {
   let proposal
   try {
      const proposal_collec = req.app.locals.db.collection("proposals")
      proposal = await proposal_collec.findOne({associated: req.params.id})
      if (!proposal) {
         return res.status(404).json({ message: 'Cannot find proposal' })
      }
   } catch (err) {
      return res.status(500).json({ message: err.message })
   }
   res.proposal = proposal
   next()
}

export default router