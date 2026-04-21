import React, { useState, useEffect } from 'react';

export default function ContractDetailPage({ contractId, onNavigate, userRole }) {
  const [commentText, setCommentText] = useState('');
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    if (!contractId) return;
    setLoading(true);
    fetch(`http://localhost:5000/api/contracts/${contractId}`)
      .then(res => res.json())
      .then(data => {
        setContract(data);
        setEditForm(data);
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

  const handleApprove = async () => {
    try {
      // Logic to advance stage
      const nextStageIndex = (contract.stageIndex || 0) + 1;
      const stages = [...(contract.stages || [])];
      if (stages[contract.stageIndex]) {
        stages[contract.stageIndex].done = true;
        stages[contract.stageIndex].current = false;
      }
      if (stages[nextStageIndex]) {
        stages[nextStageIndex].current = true;
      }

      const nextStageName = stages[nextStageIndex]?.name || 'Executed';
      const isFinal = nextStageIndex >= stages.length - 1;

      // Update approval chain if needed
      const approvalChain = [...(contract.approvalChain || [])];
      const myStepIdx = approvalChain.findIndex(s => s.status === 'Pending' || s.status === 'In Progress');
      if (myStepIdx !== -1) {
        approvalChain[myStepIdx].status = 'Approved';
        approvalChain[myStepIdx].color = 'green';
        if (approvalChain[myStepIdx + 1]) {
          approvalChain[myStepIdx + 1].status = 'Pending';
          approvalChain[myStepIdx + 1].color = 'amber';
        }
      }

      const res = await fetch(`http://localhost:5000/api/contracts/${contractId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          stage: nextStageName, 
          stageIndex: nextStageIndex,
          stampText: isFinal ? 'Approved' : nextStageName,
          urgency: isFinal ? 'green' : 'blue',
          stages,
          approvalChain,
          $push: { 
            timeline: {
              initials: userRole === 'Admin' ? 'AK' : 'PS',
              color: 'green',
              text: `<b>${userRole}</b> approved the contract and advanced it to <b>${nextStageName}</b>`,
              time: 'Just now'
            }
          }
        })
      });
      if (res.ok) {
        const updated = await res.json();
        setContract(updated);
        setShowApproveModal(false);
        showToast('Contract approved successfully');
      }
    } catch (err) {
      console.error(err);
      showToast('Error approving contract');
    }
  };

  const handleReject = async () => {
    if (!window.confirm('Are you sure you want to reject this contract?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/contracts/${contractId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          stage: 'Rejected', 
          urgency: 'red',
          stampText: 'Rejected',
          $push: { 
            timeline: {
              initials: userRole === 'Admin' ? 'AK' : 'PS',
              color: 'red',
              text: `<b>${userRole}</b> rejected the contract`,
              time: 'Just now'
            }
          }
        })
      });
      if (res.ok) {
        const updated = await res.json();
        setContract(updated);
        showToast('Contract rejected');
      }
    } catch (err) {
      console.error(err);
      showToast('Error rejecting contract');
    }
  };

  const handleSendBack = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/contracts/${contractId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          stage: 'Review', 
          stageIndex: 1,
          urgency: 'amber',
          stampText: 'Revision\\nNeeded',
          $push: { 
            timeline: {
              initials: userRole === 'Admin' ? 'AK' : 'PS',
              color: 'amber',
              text: `<b>${userRole}</b> sent the contract back for review`,
              time: 'Just now'
            }
          }
        })
      });
      if (res.ok) {
        const updated = await res.json();
        setContract(updated);
        showToast('Sent back for review');
      }
    } catch (err) {
      console.error(err);
      showToast('Error sending back contract');
    }
  };

  const handlePostComment = async () => {
    if (!commentText.trim()) return;
    try {
      const newEntry = {
        initials: userRole === 'Admin' ? 'AK' : 'PS',
        color: 'blue',
        text: `<b>${userRole}</b> added a comment`,
        time: 'Just now',
        comment: commentText
      };
      const res = await fetch(`http://localhost:5000/api/contracts/${contractId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          $push: { timeline: newEntry }
        })
      });
      if (res.ok) {
        const updated = await res.json();
        setContract(updated);
        setCommentText('');
        showToast('Comment added');
      }
    } catch (err) {
      console.error(err);
      showToast('Error posting comment');
    }
  };

  const handleResolveRisk = async (riskIndex) => {
    try {
      const updatedRisks = contract.risks.filter((_, idx) => idx !== riskIndex);
      const res = await fetch(`http://localhost:5000/api/contracts/${contractId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          risks: updatedRisks,
          urgency: updatedRisks.length === 0 ? 'green' : 'amber',
          $push: { 
            timeline: {
              initials: userRole === 'Admin' ? 'AK' : 'PS',
              color: 'blue',
              text: `<b>${userRole}</b> resolved a risk alert`,
              time: 'Just now'
            }
          }
        })
      });
      if (res.ok) {
        const updated = await res.json();
        setContract(updated);
        showToast('Risk resolved');
      }
    } catch (err) {
      console.error(err);
      showToast('Error resolving risk');
    }
  };

  const handleSaveChanges = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/contracts/${contractId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      if (res.ok) {
        const updated = await res.json();
        setContract(updated);
        setIsEditing(false);
        showToast('Contract updated successfully');
      }
    } catch (err) {
      console.error(err);
      showToast('Error saving changes');
    }
  };

  const handleVersionUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const uploadRes = await fetch('http://localhost:5000/api/contracts/upload', {
        method: 'POST',
        body: formData
      });
      if (uploadRes.ok) {
        const fileData = await uploadRes.json();
        
        // Update contract with new document
        const res = await fetch(`http://localhost:5000/api/contracts/${contractId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            $push: { 
              documents: { $each: [fileData], $position: 0 },
              timeline: {
                initials: userRole === 'Admin' ? 'AK' : 'PS',
                color: 'blue',
                text: `<b>${userRole}</b> uploaded a new version: <b>${fileData.name}</b>`,
                time: 'Just now'
              }
            }
          })
        });
        if (res.ok) {
          const updated = await res.json();
          setContract(updated);
          showToast('New version uploaded');
        }
      }
    } catch (err) {
      console.error(err);
      showToast('Upload failed');
    }
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
            <div className="dh-ref">REF {contract.ref} · {isEditing ? <input value={editForm.type} onChange={e => setEditForm({...editForm, type: e.target.value})} className="edit-input-inline" /> : (contract.type || '').toUpperCase()}</div>
            <div className="dh-title">{isEditing ? <input value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="edit-input-inline title-edit" /> : contract.name}</div>
            <div className="dh-party">{isEditing ? <input value={editForm.party} onChange={e => setEditForm({...editForm, party: e.target.value})} className="edit-input-inline" /> : contract.party}</div>
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
              {isEditing ? (
                <>
                  <button className="btn-secondary" onClick={() => { setIsEditing(false); setEditForm(contract); }}>Cancel</button>
                  <button className="btn-primary-lg" onClick={handleSaveChanges} style={{padding: '10px 24px', fontSize: '12px'}}>Save Changes</button>
                </>
              ) : (
                <>
                  {userRole === 'User' && <button className="btn-secondary" onClick={() => setIsEditing(true)}>Edit</button>}
                  {(userRole === 'Admin' || userRole === 'Manager') && (
                    <button className="btn-primary-lg" onClick={() => setShowApproveModal(true)} style={{padding: '10px 24px', fontSize: '12px'}}>
                      <span>Approve to {contract.stages && contract.stages[contract.stageIndex + 1] ? contract.stages[contract.stageIndex + 1].name : 'Final'}</span>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 7l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  )}
                </>
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
                    <div className="ki-value">{isEditing ? <input value={editForm.value} onChange={e => setEditForm({...editForm, value: e.target.value})} className="edit-input-inline" /> : contract.value}</div>
                  </div>
                  <div className="ki-cell">
                    <div className="ki-label">Expiry Date</div>
                    <div className={`ki-value ${contract.urgency === 'red' ? 'v-red' : ''}`}>{isEditing ? <input type="date" value={editForm.expires} onChange={e => setEditForm({...editForm, expires: e.target.value})} className="edit-input-inline" /> : contract.expires}</div>
                  </div>
                  <div className="ki-cell">
                    <div className="ki-label">Time Remaining</div>
                    <div className={`ki-value ${contract.urgency === 'red' ? 'v-red' : ''}`}>{isEditing ? <input value={editForm.expiresIn} onChange={e => setEditForm({...editForm, expiresIn: e.target.value})} className="edit-input-inline" /> : contract.expiresIn}</div>
                  </div>
                  <div className="ki-cell">
                    <div className="ki-label">Created</div>
                    <div className="ki-value">{contract.created}</div>
                  </div>
                  <div className="ki-cell">
                    <div className="ki-label">Owner</div>
                    <div className="ki-value">{isEditing ? <input value={editForm.owner} onChange={e => setEditForm({...editForm, owner: e.target.value})} className="edit-input-inline" /> : contract.owner}</div>
                  </div>
                  <div className="ki-cell">
                    <div className="ki-label">Department</div>
                    <div className="ki-value">{isEditing ? <input value={editForm.department} onChange={e => setEditForm({...editForm, department: e.target.value})} className="edit-input-inline" /> : contract.department}</div>
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
                    <button className="risk-action" onClick={() => handleResolveRisk(i)}>{risk.action}</button>
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
                <input 
                  type="file" 
                  id="version-upload" 
                  style={{ display: 'none' }} 
                  onChange={handleVersionUpload} 
                />
                <button className="ph-action" onClick={() => document.getElementById('version-upload').click()}>
                  + Upload new version
                </button>
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
                    <div style={{ fontSize: '14px', color: 'var(--ink)' }}>{documents[0]?.name || 'No Document Attached'}</div>
                    <div style={{ marginTop: '8px', fontSize: '12px' }}>{documents[0]?.size || '0 KB'} • PDF Preview</div>
                    {documents[0]?.url && (
                      <a href={documents[0].url} target="_blank" rel="noreferrer" className="btn-secondary" style={{ marginTop: '20px', textDecoration: 'none', fontSize: '12px', padding: '6px 12px' }}>
                        Download Current Version
                      </a>
                    )}
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
                          <div className="doc-name" style={{ color: i === 0 ? 'var(--ink)' : 'var(--muted)' }}>{doc.name}</div>
                          <div className="doc-meta">{doc.date} · {doc.size}</div>
                        </div>
                      </div>
                      {doc.url && <a href={doc.url} target="_blank" rel="noreferrer" className="doc-action" style={{ textDecoration: 'none' }}>↓</a>}
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
                <button className="comment-submit" onClick={handlePostComment}>
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ACTION BAR */}
        <div className="detail-action-bar">
          <div className="dab-left">
            <button className="btn-danger" onClick={handleReject}>Reject contract</button>
            <button className="btn-secondary" onClick={handleSendBack}>Send back for review</button>
          </div>
          <div className="dab-right">
            <button className="btn-ghost-lg" onClick={() => onNavigate('contracts')}>Close</button>
            {(userRole === 'Admin' || userRole === 'Manager') && (
              <button className="btn-primary-lg" onClick={() => setShowApproveModal(true)} style={{padding: '12px 28px'}}>
                <span>Approve to {contract.stages && contract.stages[contract.stageIndex + 1] ? contract.stages[contract.stageIndex + 1].name : 'Final'}</span>
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
