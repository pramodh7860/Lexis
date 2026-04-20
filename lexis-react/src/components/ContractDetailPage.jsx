import React, { useState, useEffect } from 'react';

export default function ContractDetailPage({ contractId, onNavigate, userRole }) {
  const [commentText, setCommentText] = useState('');
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!contractId) return;
    setLoading(true);
    fetch(`http://localhost:5000/api/contracts/${contractId}`)
      .then(res => res.json())
      .then(data => {
        setContract(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [contractId]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleApprove = () => {
    setShowApproveModal(false);
    showToast('Contract approved successfully');
    
    // In a fully functional app, we would make a PUT request to update the backend:
    // fetch(`http://localhost:5000/api/contracts/${contractId}`, { method: 'PUT', ... })
  };

  if (loading) {
    return <div style={{ padding: '40px', background: 'var(--cream)', height: '100vh', color: 'var(--muted)' }}>Loading real-time contract details...</div>;
  }

  if (!contract) {
    return <div style={{ padding: '40px', background: 'var(--cream)', height: '100vh', color: 'var(--muted)' }}>Contract not found.</div>;
  }

  // Fallbacks for missing array fields just in case
  const risks = contract.risks || [];
  const clauses = contract.clauses || [];
  const documents = contract.documents || [];
  const approvalChain = contract.approvalChain || [];
  const timeline = contract.timeline || [];
  const stages = contract.stages || [];

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
            <div className="dh-ref">REF {contract.ref} · {(contract.type || '').toUpperCase()}</div>
            <div className="dh-title">{contract.name}</div>
            <div className="dh-party">{contract.party}</div>
            <div className="dh-tags">
              <span className={`stage-pill sp-${contract.urgency}`}>{contract.stage}</span>
              <span className="eyebrow-tag">{contract.department}</span>
              <span className="eyebrow-tag">{contract.owner}</span>
            </div>
          </div>
          <div className="dh-right">
            <div className={`dh-stamp ${contract.stampClass || ''}`}>
              <div className="dh-stamp-text">{contract.stampText}</div>
            </div>
            <div className="dh-actions">
              <button className="btn-secondary" onClick={() => onNavigate('contracts')}>Edit</button>
              {(userRole === 'Admin' || userRole === 'Manager') && (
                <button className="btn-primary-lg" onClick={() => setShowApproveModal(true)} style={{padding: '10px 24px', fontSize: '12px'}}>
                  <span>Approve</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* LIFECYCLE STAGES */}
        <div className="detail-lifecycle">
          {stages.map((s, i) => (
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
                <div className="ds-title">Risk alerts — {risks.length} issues</div>
                <span className={`alert-tag tag-${contract.urgency}`}>{risks.length} flagged</span>
              </div>
              <div className="ds-content">
                {risks.map((risk, i) => (
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
                <div className="ds-title">Clauses — {clauses.length} total</div>
              </div>
              <div className="ds-content">
                {clauses.map((clause, i) => (
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

            {/* DOCUMENTS & PREVIEW */}
            <div className="ds-section">
              <div className="ds-head">
                <div className="ds-title">Document viewer</div>
                <button className="ph-action">+ Upload new version</button>
              </div>
              <div className="ds-content" style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 2 }}>
                  <div style={{ 
                    border: '1px solid var(--line2)', background: 'white', 
                    borderRadius: '4px', height: '400px', display: 'flex', 
                    flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--faint)'
                  }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{ marginBottom: '16px' }}>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                      <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                    </svg>
                    <div style={{ fontSize: '14px', color: 'var(--ink)' }}>{documents[0]?.name || 'Document Prefix'}</div>
                    <div style={{ marginTop: '8px', fontSize: '12px' }}>Pages 1-28 • PDF Preview</div>
                  </div>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)' }}>
                    Version History
                  </div>
                  {documents.map((doc, i) => (
                    <div key={i} className="doc-row" style={{ padding: '12px', background: i === 0 ? 'var(--cream2)' : 'none', border: i === 0 ? '1px solid var(--line2)' : '1px dashed var(--line)' }}>
                      <div className="doc-left">
                        <div className="doc-icon">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M3 2h5l3 3v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" stroke={i === 0 ? "var(--ink)" : "var(--muted)"} strokeWidth="1.2"/>
                          </svg>
                        </div>
                        <div>
                          <div className="doc-name" style={{ color: i === 0 ? 'var(--ink)' : 'var(--muted)' }}>v{documents.length - i}.0</div>
                          <div className="doc-meta">{doc.date}</div>
                        </div>
                      </div>
                      <button className="doc-action">↓</button>
                    </div>
                  ))}
                </div>
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
                {approvalChain.map((step, i) => (
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
              {timeline.map((entry, i) => (
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
            {(userRole === 'Admin' || userRole === 'Manager') && (
              <button className="btn-primary-lg" onClick={() => setShowApproveModal(true)} style={{padding: '12px 28px'}}>
                <span>Approve & advance</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
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
              {risks.length > 0 && (
                <div style={{marginTop: '12px', padding: '10px 14px', background: 'var(--red-pale)', border: '1px solid var(--red)', fontSize: '12px', color: 'var(--red)'}}>
                  ⚠ {risks.length} risk alert(s) are still active. Proceeding will acknowledge these risks.
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
