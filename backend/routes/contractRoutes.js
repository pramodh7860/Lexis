import express from 'express';
import multer from 'multer';
import path from 'path';
import Contract from '../models/Contract.js';

const router = express.Router();

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// GET all contracts
router.get('/', async (req, res) => {
  const { userId, userRole } = req.query;
  let query = {};
  
  if (userRole === 'User' && userId) {
    query = { createdBy: userId };
  }

  try {
    const contracts = await Contract.find(query).sort({ createdAt: -1 });
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
  console.log('Creating new contract:', req.body.name);
  console.log('Attached documents:', req.body.documents?.length || 0);
  const contract = new Contract(req.body);
  try {
    const newContract = await contract.save();
    console.log('Successfully created contract:', newContract._id);
    res.status(201).json(newContract);
  } catch (err) {
    console.error('Error creating contract:', err.message);
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a contract (e.g., move stages, add activity, approve)
router.put('/:id', async (req, res) => {
  console.log('Updating contract:', req.params.id);
  try {
    const updatedContract = await Contract.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedContract) {
      console.log('Contract not found for update:', req.params.id);
      return res.status(404).json({ message: 'Contract not found' });
    }
    console.log('Successfully updated contract:', updatedContract._id);
    res.json(updatedContract);
  } catch (err) {
    console.error('Error updating contract:', err.message);
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

// UPLOAD a file
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  res.json({ 
    url: fileUrl, 
    name: req.file.originalname,
    size: `${(req.file.size / 1024).toFixed(1)} KB`,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  });
});

export default router;
