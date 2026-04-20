import express from 'express';
import Contract from '../models/Contract.js';

const router = express.Router();

// GET all contracts
router.get('/', async (req, res) => {
  try {
    const contracts = await Contract.find().sort({ createdAt: -1 });
    res.json(contracts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific contract
router.get('/:id', async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract) return res.status(404).json({ message: 'Contract not found' });
    res.json(contract);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE a new contract
router.post('/', async (req, res) => {
  const contract = new Contract(req.body);
  try {
    const newContract = await contract.save();
    res.status(201).json(newContract);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a contract (e.g., move stages, add activity, approve)
router.put('/:id', async (req, res) => {
  try {
    const updatedContract = await Contract.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedContract) return res.status(404).json({ message: 'Contract not found' });
    res.json(updatedContract);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a contract
router.delete('/:id', async (req, res) => {
  try {
    const deletedContract = await Contract.findByIdAndDelete(req.params.id);
    if (!deletedContract) return res.status(404).json({ message: 'Contract not found' });
    res.json({ message: 'Contract deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
