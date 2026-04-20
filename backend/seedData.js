import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Contract from './models/Contract.js';

dotenv.config();

const mockContracts = [
  {
    ref: '#2024-0847',
    name: 'Service Agreement – TechCorp',
    party: 'TechCorp Inc. × Lexis Client Co.',
    type: 'Master Service Agreement',
    value: '$240,000',
    stage: 'Approval',
    stageIndex: 2,
    stampText: 'Approval\\nPending',
    stampClass: '',
    urgency: 'red',
    created: 'Apr 2, 2026',
    expires: 'Apr 22, 2026',
    expiresIn: '2 days',
    owner: 'Priya Sharma',
    department: 'Legal',
    clauses: [
      { num: '§1', name: 'Scope of Services', status: 'Approved', color: 'green' },
      { num: '§2', name: 'Payment Terms (Net-30)', status: 'Approved', color: 'green' },
      { num: '§3', name: 'Indemnification', status: 'Flagged', color: 'red' },
      { num: '§4', name: 'Limitation of Liability', status: 'Flagged', color: 'red' },
      { num: '§5', name: 'Confidentiality & NDA', status: 'Approved', color: 'green' },
      { num: '§6', name: 'Termination Clause', status: 'Review', color: 'amber' },
      { num: '§7', name: 'Force Majeure', status: 'Approved', color: 'green' },
      { num: '§8', name: 'Governing Law', status: 'Approved', color: 'green' },
    ],
    risks: [
      { title: 'Indemnity clause missing mutual coverage', desc: 'Clause §3 only covers provider liability — client exposure uncapped', color: 'red', action: 'Fix clause' },
      { title: 'Liability cap below industry standard', desc: '$500K cap on $240K contract — typically 2x contract value', color: 'red', action: 'Review' },
      { title: 'Auto-renewal hidden in termination', desc: '§6 contains 60-day auto-renewal — may need explicit opt-out', color: 'amber', action: 'Flag' },
    ],
    documents: [
      { name: 'MSA_TechCorp_v3.1.pdf', size: '2.4 MB', date: 'Apr 15, 2026' },
      { name: 'Exhibit_A_SOW.pdf', size: '890 KB', date: 'Apr 10, 2026' },
      { name: 'Redline_v2_to_v3.docx', size: '1.1 MB', date: 'Apr 12, 2026' },
    ],
    approvalChain: [
      { name: 'Priya Sharma', role: 'Legal Analyst', status: 'Approved', color: 'green', initials: 'PS' },
      { name: 'Arjun Kumar', role: 'General Counsel', status: 'Pending', color: 'amber', initials: 'AK' },
      { name: 'Meera Patel', role: 'CFO', status: 'Waiting', color: 'faint', initials: 'MP' },
    ],
    timeline: [
      { initials: 'PS', color: 'blue', text: '<b>Priya Sharma</b> approved and forwarded to General Counsel', time: 'Today · 3:45 PM' },
      { initials: 'PS', color: 'blue', text: '<b>Priya</b> flagged §3 Indemnification clause', time: 'Today · 2:15 PM', comment: '"The indemnity clause only protects the provider. We need mutual indemnification or the client bears unlimited risk exposure. Recommend adding reciprocal coverage with a reasonable cap."' },
      { initials: 'AK', color: 'green', text: '<b>Arjun Kumar</b> requested review of liability cap', time: 'Yesterday · 4:30 PM' },
      { initials: 'TC', color: 'amber', text: 'TechCorp sent <b>Draft v3.1</b> with updated payment terms', time: 'Apr 15 · 10:14 AM' },
      { initials: 'PS', color: 'blue', text: '<b>Priya Sharma</b> created initial draft from MSA template', time: 'Apr 2 · 9:00 AM' },
    ],
    stages: [
      { name: 'Draft', date: 'Apr 2', done: true },
      { name: 'Review', date: 'Apr 10', done: true },
      { name: 'Approval', date: 'In progress', done: false, current: true },
      { name: 'Execution', date: 'Pending', done: false },
      { name: 'Active', date: 'Pending', done: false },
    ]
  },
  {
    ref: '#2024-0912',
    name: 'Vendor MSA – NovaCorp',
    party: 'NovaCorp Ltd. × Lexis Client Co.',
    type: 'Vendor Master Service Agreement',
    value: '$80,000',
    stage: 'Approval',
    stageIndex: 2,
    stampText: 'Overdue',
    stampClass: '',
    urgency: 'red',
    created: 'Mar 20, 2026',
    expires: 'Jun 15, 2026',
    expiresIn: '56 days',
    owner: 'Raj Kumar',
    department: 'Procurement',
    clauses: [
      { num: '§1', name: 'Vendor Obligations', status: 'Approved', color: 'green' },
      { num: '§2', name: 'Pricing & Payment', status: 'Approved', color: 'green' },
      { num: '§3', name: 'SLA Guarantees', status: 'Review', color: 'amber' },
      { num: '§4', name: 'Data Protection', status: 'Approved', color: 'green' },
      { num: '§5', name: 'Termination for Cause', status: 'Approved', color: 'green' },
    ],
    risks: [
      { title: 'Approval overdue by 4 days', desc: 'Submitted for approval Apr 16 — SLA requires 48h response', color: 'red', action: 'Approve now' },
      { title: 'SLA penalty clause under review', desc: '§3 uptime guarantee at 99.5% — industry standard is 99.9%', color: 'amber', action: 'Negotiate' },
    ],
    documents: [
      { name: 'VendorMSA_NovaCorp_v2.pdf', size: '1.8 MB', date: 'Apr 16, 2026' },
      { name: 'SLA_Appendix.pdf', size: '540 KB', date: 'Apr 14, 2026' },
    ],
    approvalChain: [
      { name: 'Raj Kumar', role: 'Procurement Lead', status: 'Approved', color: 'green', initials: 'RK' },
      { name: 'Arjun Kumar', role: 'General Counsel', status: 'Overdue', color: 'red', initials: 'AK' },
    ],
    timeline: [
      { initials: 'RK', color: 'amber', text: '<b>Raj Kumar</b> sent reminder — approval overdue 4 days', time: 'Today · 10:00 AM' },
      { initials: 'RK', color: 'amber', text: '<b>NovaCorp Vendor MSA</b> submitted for approval', time: 'Apr 16 · 5:00 PM' },
      { initials: 'RK', color: 'amber', text: '<b>Raj Kumar</b> completed legal review', time: 'Apr 14 · 3:30 PM' },
    ],
    stages: [
      { name: 'Draft', date: 'Mar 20', done: true },
      { name: 'Review', date: 'Apr 14', done: true },
      { name: 'Approval', date: 'Overdue', done: false, current: true },
      { name: 'Execution', date: 'Pending', done: false },
      { name: 'Active', date: 'Pending', done: false },
    ]
  },
  {
    ref: '#2024-0938',
    name: 'SaaS License – Meridian Systems',
    party: 'Meridian Systems Inc. × Lexis Client Co.',
    type: 'SaaS License Agreement',
    value: '$36,000/yr',
    stage: 'Review',
    stageIndex: 1,
    stampText: 'Stalled\\n9 Days',
    stampClass: 'stamp-amber',
    urgency: 'amber',
    created: 'Apr 1, 2026',
    expires: 'Sep 1, 2026',
    expiresIn: '134 days',
    owner: 'Priya Sharma',
    department: 'Procurement',
    clauses: [
      { num: '§1', name: 'License Grant', status: 'Review', color: 'amber' },
      { num: '§2', name: 'Subscription Fees', status: 'Approved', color: 'green' },
      { num: '§3', name: 'Data Ownership', status: 'Flagged', color: 'red' },
      { num: '§4', name: 'Uptime SLA', status: 'Review', color: 'amber' },
    ],
    risks: [
      { title: 'Contract stalled in review for 9 days', desc: 'No activity since Apr 11 — average review cycle is 3 days', color: 'amber', action: 'Follow up' },
      { title: 'Data ownership clause needs revision', desc: '§3 grants vendor broad data usage rights — conflicts with DPA', color: 'red', action: 'Revise' },
    ],
    documents: [
      { name: 'SaaS_License_Meridian.pdf', size: '1.5 MB', date: 'Apr 1, 2026' },
    ],
    approvalChain: [
      { name: 'Priya Sharma', role: 'Legal Analyst', status: 'In Progress', color: 'amber', initials: 'PS' },
      { name: 'Arjun Kumar', role: 'General Counsel', status: 'Waiting', color: 'faint', initials: 'AK' },
    ],
    timeline: [
      { initials: 'PS', color: 'blue', text: '<b>Meridian SaaS License</b> moved to Legal Review', time: 'Today · 2:45 PM' },
      { initials: 'PS', color: 'blue', text: '<b>Priya</b> flagged data ownership clause §3', time: 'Apr 11 · 11:00 AM', comment: '"Data ownership clause is too broad. Vendor retains rights to anonymized usage data which could include proprietary business metrics. Need to restrict scope."'},
    ],
    stages: [
      { name: 'Draft', date: 'Apr 1', done: true },
      { name: 'Review', date: 'Stalled', done: false, current: true },
      { name: 'Approval', date: 'Pending', done: false },
      { name: 'Execution', date: 'Pending', done: false },
      { name: 'Active', date: 'Pending', done: false },
    ]
  }
];

export const seedDatabase = async () => {
  try {
    const count = await Contract.countDocuments();
    if (count === 0) {
      console.log('Seeding initial data...');
      await Contract.insertMany(mockContracts);
      console.log('Database seeded successfully');
    }
  } catch (error) {
    console.error('Error seeding DB:', error);
  }
};
