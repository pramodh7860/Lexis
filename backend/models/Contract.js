import mongoose from 'mongoose';

const ClauseSchema = new mongoose.Schema({
  num: String,
  name: String,
  status: { type: String, enum: ['Approved', 'Flagged', 'Review', 'Draft'] },
  color: { type: String, enum: ['green', 'red', 'amber', 'gray'] }
});

const RiskSchema = new mongoose.Schema({
  title: String,
  desc: String,
  color: { type: String, enum: ['green', 'red', 'amber'] },
  action: String
});

const DocumentSchema = new mongoose.Schema({
  name: String,
  size: String,
  date: String
});

const ApprovalStepSchema = new mongoose.Schema({
  name: String,
  role: String,
  status: String,
  color: String,
  initials: String
});

const TimelineEntrySchema = new mongoose.Schema({
  initials: String,
  color: String,
  text: String,
  time: String,
  comment: String
});

const StageSchema = new mongoose.Schema({
  name: String,
  date: String,
  done: Boolean,
  current: Boolean
});

const ContractSchema = new mongoose.Schema({
  ref: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  party: { type: String, required: true },
  type: { type: String, required: true },
  value: String,
  stage: { type: String, required: true },
  stageIndex: Number,
  stampText: String,
  stampClass: String,
  urgency: { type: String, enum: ['red', 'amber', 'green', 'blue', 'gray'] },
  created: String,
  expires: String,
  expiresIn: String,
  owner: String,
  department: String,
  clauses: [ClauseSchema],
  risks: [RiskSchema],
  documents: [DocumentSchema],
  approvalChain: [ApprovalStepSchema],
  timeline: [TimelineEntrySchema],
  stages: [StageSchema]
}, { timestamps: true });

export default mongoose.model('Contract', ContractSchema);
