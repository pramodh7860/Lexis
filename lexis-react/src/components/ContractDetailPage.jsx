import React, { useState } from 'react';

const CONTRACTS_DATA = {
  'techcorp': {
    ref: '#2024-0847',
    name: 'Service Agreement – TechCorp',
    party: 'TechCorp Inc. × Lexis Client Co.',
    type: 'Master Service Agreement',
    value: '$240,000',
    stage: 'Approval',
    stageIndex: 2,
    stampText: 'Approval\nPending',
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
  'novacorp': {
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
  'meridian': {
    ref: '#2024-0938',
    name: 'SaaS License – Meridian Systems',
    party: 'Meridian Systems Inc. × Lexis Client Co.',
    type: 'SaaS License Agreement',
    value: '$36,000/yr',
    stage: 'Review',
    stageIndex: 1,
    stampText: 'Stalled\n9 Days',
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
};

export default function ContractDetailPage({ contractId, onNavigate }) {
  const [commentText, setCommentText] = useState('');
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const contract = CONTRACTS_DATA[contractId] || CONTRACTS_DATA['techcorp'];

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleApprove = () => {
    setShowApproveModal(false);
    showToast('Contract approved successfully');
  };

  return (
    <div style={{ background: 'var(--cream)' }}>
      <div className="detail-wrap">

        {/* BREADCRUMB */}
        <div className="detail-back">
          <button className="back-link" onClick={() => onNavigate('contracts')}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Contracts
          </button>
          <div className="back-sep"></div>
          <span className="back-crumb">{contract.name}</span>
        </div>

        {/* HEADER */}
        <div className="detail-header">
          <div className="dh-left">
            <div className="dh-ref">REF {contract.ref} · {contract.type.toUpperCase()}</div>
            <div className="dh-title">{contract.name}</div>
            <div className="dh-party">{contract.party}</div>
            <div className="dh-tags">
              <span className={`stage-pill sp-${contract.urgency}`}>{contract.stage}</span>
              <span className="eyebrow-tag">{contract.department}</span>
              <span className="eyebrow-tag">{contract.owner}</span>
            </div>
          </div>
          <div className="dh-right">
            <div className={`dh-stamp ${contract.stampClass}`}>
              <div className="dh-stamp-text">{contract.stampText}</div>
            </div>
            <div className="dh-actions">
              <button className="btn-secondary" onClick={() => onNavigate('contracts')}>Edit</button>
              <button className="btn-primary-lg" onClick={() => setShowApproveModal(true)} style={{padding: '10px 24px', fontSize: '12px'}}>
                <span>Approve</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* LIFECYCLE STAGES */}
        <div className="detail-lifecycle">
          {contract.stages.map((s, i) => (
            <div key={i} className={`dl-stage ${s.done ? 'dl-done' : ''} ${s.current ? 'dl-current' : ''}`}>
              <div className="dl-check">
                {s.done ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" fill="var(--green-pale)" stroke="var(--green)" strokeWidth="1"/>
                    <path d="M5 8l2 2 4-4" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : s.current ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="var(--red)" strokeWidth="1.5" strokeDasharray="3 2"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="var(--cream3)" strokeWidth="1.5"/>
                  </svg>
                )}
              </div>
              <div className="dl-stage-num">{`0${i + 1}`}</div>
              <div className="dl-stage-name">{s.name}</div>
              <div className="dl-stage-date">{s.date}</div>
            </div>
          ))}
        </div>

        {/* BODY — TWO COLUMN */}
        <div className="detail-body">

          {/* LEFT — MAIN CONTENT */}
          <div className="detail-main">

            {/* KEY INFORMATION */}
            <div className="ds-section">
              <div className="ds-head">
                <div className="ds-title">Key information</div>
              </div>
              <div className="ds-content" style={{padding: 0}}>
                <div className="ki-grid">
                  <div className="ki-cell">
                    <div className="ki-label">Contract Value</div>
                    <div className="ki-value">{contract.value}</div>
                  </div>
                  <div className="ki-cell">
                    <div className="ki-label">Expiry Date</div>
                    <div className={`ki-value ${contract.urgency === 'red' ? 'v-red' : ''}`}>{contract.expires}</div>
                  </div>
                  <div className="ki-cell">
                    <div className="ki-label">Time Remaining</div>
                    <div className={`ki-value ${contract.urgency === 'red' ? 'v-red' : ''}`}>{contract.expiresIn}</div>
                  </div>
                  <div className="ki-cell">
                    <div className="ki-label">Created</div>
                    <div className="ki-value">{contract.created}</div>
                  </div>
                  <div className="ki-cell">
                    <div className="ki-label">Owner</div>
                    <div className="ki-value">{contract.owner}</div>
                  </div>
                  <div className="ki-cell">
                    <div className="ki-label">Department</div>
                    <div className="ki-value">{contract.department}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* RISK ALERTS */}
            <div className="ds-section">
              <div className="ds-head">
                <div className="ds-title">Risk alerts — {contract.risks.length} issues</div>
                <span className={`alert-tag tag-${contract.urgency}`}>{contract.risks.length} flagged</span>
              </div>
              <div className="ds-content">
                {contract.risks.map((risk, i) => (
                  <div key={i} className="risk-item">
                    <div className={`risk-bar bar-${risk.color}`}></div>
                    <div>
                      <div className="risk-title">{risk.title}</div>
                      <div className="risk-desc">{risk.desc}</div>
                    </div>
                    <button className="risk-action" onClick={() => showToast(`Action taken: ${risk.action}`)}>{risk.action}</button>
                  </div>
                ))}
              </div>
            </div>

            {/* CLAUSES */}
            <div className="ds-section">
              <div className="ds-head">
                <div className="ds-title">Clauses — {contract.clauses.length} total</div>
              </div>
              <div className="ds-content">
                {contract.clauses.map((clause, i) => (
                  <div key={i} className="clause-row">
                    <div className="clause-num">{clause.num}</div>
                    <div className="clause-name">{clause.name}</div>
                    <span className={`clause-status tag-${clause.color}`}>{clause.status}</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{cursor: 'pointer', color: 'var(--faint)'}}>
                      <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            {/* DOCUMENTS */}
            <div className="ds-section">
              <div className="ds-head">
                <div className="ds-title">Documents — {contract.documents.length} files</div>
                <button className="ph-action">+ Upload</button>
              </div>
              <div className="ds-content">
                {contract.documents.map((doc, i) => (
                  <div key={i} className="doc-row">
                    <div className="doc-left">
                      <div className="doc-icon">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M3 2h5l3 3v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" stroke="var(--muted)" strokeWidth="1.2"/>
                          <path d="M8 2v4h4" stroke="var(--muted)" strokeWidth="1.2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div>
                        <div className="doc-name">{doc.name}</div>
                        <div className="doc-meta">{doc.size} · {doc.date}</div>
                      </div>
                    </div>
                    <button className="doc-action">Download</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — SIDEBAR */}
          <div className="detail-side">

            {/* APPROVAL CHAIN */}
            <div className="ds-section">
              <div className="ds-head">
                <div className="ds-title">Approval chain</div>
              </div>
              <div className="approval-chain">
                {contract.approvalChain.map((step, i) => (
                  <div key={i} className="ac-step">
                    <div className={`ac-icon ava-${step.color}`} style={{
                      background: step.color === 'faint' ? 'var(--cream3)' : undefined
                    }}>
                      {step.initials}
                    </div>
                    <div className="ac-info">
                      <div className="ac-name">{step.name}</div>
                      <div className="ac-role">{step.role}</div>
                    </div>
                    <span className={`ac-status tag-${step.color === 'faint' ? 'amber' : step.color}`}
                      style={step.color === 'faint' ? { background: 'var(--cream3)', color: 'var(--muted)' } : {}}>
                      {step.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTIVITY TIMELINE */}
            <div className="ds-section">
              <div className="ds-head">
                <div className="ds-title">Activity</div>
              </div>
              {contract.timeline.map((entry, i) => (
                <div key={i} className="timeline-entry">
                  <div className={`tl-ava ava-${entry.color}`}>{entry.initials}</div>
                  <div className="tl-body">
                    <div className="tl-text" dangerouslySetInnerHTML={{ __html: entry.text }}></div>
                    <div className="tl-time">{entry.time}</div>
                    {entry.comment && (
                      <div className="tl-comment">{entry.comment}</div>
                    )}
                  </div>
                </div>
              ))}

              {/* ADD COMMENT */}
              <div className="add-comment">
                <textarea
                  className="comment-input"
                  placeholder="Add a comment or note…"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  rows={2}
                />
                <button className="comment-submit" onClick={() => { if (commentText.trim()) { showToast('Comment added'); setCommentText(''); } }}>
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ACTION BAR */}
        <div className="detail-action-bar">
          <div className="dab-left">
            <button className="btn-danger">Reject contract</button>
            <button className="btn-secondary">Send back for review</button>
          </div>
          <div className="dab-right">
            <button className="btn-ghost-lg" onClick={() => onNavigate('contracts')}>Save & close</button>
            <button className="btn-primary-lg" onClick={() => setShowApproveModal(true)} style={{padding: '12px 28px'}}>
              <span>Approve & advance</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* APPROVE MODAL */}
      {showApproveModal && (
        <div className="modal-overlay" onClick={() => setShowApproveModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-title">Approve this contract?</div>
            <div className="modal-desc">
              You are approving <b>{contract.name}</b> ({contract.ref}).
              This will advance the contract to the next stage in the lifecycle and notify the next approver.
              {contract.risks.length > 0 && (
                <div style={{marginTop: '12px', padding: '10px 14px', background: 'var(--red-pale)', border: '1px solid var(--red)', fontSize: '12px', color: 'var(--red)'}}>
                  ⚠ {contract.risks.length} risk alert(s) are still active. Proceeding will acknowledge these risks.
                </div>
              )}
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowApproveModal(false)}>Cancel</button>
              <button className="btn-primary-lg" onClick={handleApprove} style={{padding: '10px 24px', fontSize: '12px'}}>
                <span>Confirm approval</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toastMsg && (
        <div className="toast">
          <div className="toast-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 8l3 3 5-5" stroke="var(--cream)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {toastMsg}
        </div>
      )}
    </div>
  );
}
