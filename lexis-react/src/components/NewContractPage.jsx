import React, { useState } from 'react';

const TEMPLATES = [
  { id: 'msa', name: 'Master Service Agreement', desc: 'Full MSA with SOW, payment terms, and SLA provisions.', tag: '14 clauses · Most used', icon: 'doc' },
  { id: 'nda', name: 'Non-Disclosure Agreement', desc: 'Mutual or one-way NDA for confidential information exchange.', tag: '8 clauses · Quick setup', icon: 'lock' },
  { id: 'saas', name: 'SaaS License', desc: 'Software subscription with uptime SLA, data terms, and renewal.', tag: '12 clauses · Tech', icon: 'cloud' },
  { id: 'vendor', name: 'Vendor Agreement', desc: 'Procurement-focused contract with delivery milestones and penalties.', tag: '10 clauses · Procurement', icon: 'vendor' },
  { id: 'partner', name: 'Partnership Agreement', desc: 'Joint venture or strategic partnership with profit-sharing terms.', tag: '16 clauses · Complex', icon: 'partner' },
  { id: 'consulting', name: 'Consulting Agreement', desc: 'Professional services with deliverables, IP assignment, and fees.', tag: '9 clauses · Services', icon: 'consult' },
];

const DEFAULT_CLAUSES = [
  { name: 'Scope of Services', risk: 'Standard', color: 'green', on: true },
  { name: 'Payment Terms', risk: 'Standard', color: 'green', on: true },
  { name: 'Confidentiality', risk: 'Standard', color: 'green', on: true },
  { name: 'Indemnification', risk: 'High risk', color: 'red', on: true },
  { name: 'Limitation of Liability', risk: 'High risk', color: 'red', on: true },
  { name: 'Termination Clause', risk: 'Medium', color: 'amber', on: true },
  { name: 'Force Majeure', risk: 'Standard', color: 'green', on: true },
  { name: 'Governing Law', risk: 'Standard', color: 'green', on: true },
  { name: 'Dispute Resolution', risk: 'Medium', color: 'amber', on: false },
  { name: 'Non-Compete', risk: 'High risk', color: 'red', on: false },
  { name: 'Auto-Renewal', risk: 'Medium', color: 'amber', on: false },
  { name: 'IP Assignment', risk: 'High risk', color: 'red', on: false },
];

export default function NewContractPage({ onNavigate }) {
  const [step, setStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState('msa');
  const [clauses, setClauses] = useState(DEFAULT_CLAUSES);
  const [toastMsg, setToastMsg] = useState('');
  const [form, setForm] = useState({
    name: '',
    counterparty: '',
    type: 'MSA',
    department: 'Legal',
    owner: 'Priya Sharma',
    value: '',
    startDate: '',
    expiryDate: '',
    description: '',
  });

  const steps = ['Template', 'Details', 'Clauses', 'Review'];

  const updateForm = (key, val) => setForm({ ...form, [key]: val });

  const toggleClause = (idx) => {
    const updated = [...clauses];
    updated[idx] = { ...updated[idx], on: !updated[idx].on };
    setClauses(updated);
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleCreate = () => {
    showToast('Contract created successfully — moved to Draft stage');
    setTimeout(() => onNavigate('contracts'), 2000);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <div className="form-section">
              <div className="form-section-title">Choose a template</div>
              <div className="template-grid">
                {TEMPLATES.map((t) => (
                  <div
                    key={t.id}
                    className={`template-card ${selectedTemplate === t.id ? 'tc-selected' : ''}`}
                    onClick={() => setSelectedTemplate(t.id)}
                  >
                    <div className="tc-icon">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 3h7l3 3v7H3V3z" stroke="#F5F0E8" strokeWidth="1.2" />
                        <path d="M10 3v4h3" stroke="#F5F0E8" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="tc-name">{t.name}</div>
                    <div className="tc-desc">{t.desc}</div>
                    <div className="tc-tag">{t.tag}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="form-section" style={{ borderBottom: 'none' }}>
              <div className="form-section-title">Or start from scratch</div>
              <div className="upload-zone">
                <div className="uz-icon">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M16 8v16M8 16h16" stroke="var(--faint)" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="uz-text">Upload an existing contract document</div>
                <div className="uz-sub">PDF · DOCX · Up to 25MB</div>
              </div>
            </div>
          </>
        );

      case 1:
        return (
          <div className="form-section">
            <div className="form-section-title">Contract details</div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Contract name</label>
                <input className="form-input" placeholder="e.g. Service Agreement – TechCorp" value={form.name} onChange={e => updateForm('name', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Counterparty</label>
                <input className="form-input" placeholder="e.g. TechCorp Inc." value={form.counterparty} onChange={e => updateForm('counterparty', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Contract type</label>
                <select className="form-input" value={form.type} onChange={e => updateForm('type', e.target.value)}>
                  <option>MSA</option>
                  <option>NDA</option>
                  <option>SaaS License</option>
                  <option>Vendor Agreement</option>
                  <option>Partnership</option>
                  <option>Consulting</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Department</label>
                <select className="form-input" value={form.department} onChange={e => updateForm('department', e.target.value)}>
                  <option>Legal</option>
                  <option>Procurement</option>
                  <option>Sales</option>
                  <option>Finance</option>
                  <option>Business Development</option>
                  <option>Operations</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Contract owner</label>
                <select className="form-input" value={form.owner} onChange={e => updateForm('owner', e.target.value)}>
                  <option>Priya Sharma</option>
                  <option>Raj Kumar</option>
                  <option>Arjun Kumar</option>
                  <option>Meera Patel</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Contract value</label>
                <input className="form-input" placeholder="e.g. $240,000" value={form.value} onChange={e => updateForm('value', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Start date</label>
                <input className="form-input" type="date" value={form.startDate} onChange={e => updateForm('startDate', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Expiry date</label>
                <input className="form-input" type="date" value={form.expiryDate} onChange={e => updateForm('expiryDate', e.target.value)} />
              </div>
              <div className="form-group full-width">
                <label className="form-label">Description / notes</label>
                <textarea className="form-input" placeholder="Brief description of the contract scope and purpose…" value={form.description} onChange={e => updateForm('description', e.target.value)} />
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              <div className="form-section-title">Attach documents</div>
              <div className="upload-zone">
                <div className="uz-icon">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M7 20V9l7-5 7 5v11" stroke="var(--faint)" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M12 20v-6h4v6" stroke="var(--faint)" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="uz-text">Drag & drop files or click to browse</div>
                <div className="uz-sub">PDF · DOCX · Up to 25MB per file</div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="form-section">
            <div className="form-section-title">Configure clauses — {clauses.filter(c => c.on).length} selected</div>
            <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '20px', lineHeight: '1.6' }}>
              Select which clauses to include based on the <b>{TEMPLATES.find(t => t.id === selectedTemplate)?.name}</b> template.
              High-risk clauses are flagged for legal review.
            </p>
            <div className="clause-builder">
              {clauses.map((clause, i) => (
                <div key={i} className="cb-row">
                  <div className={`cb-bar bar-${clause.color}`}></div>
                  <div className="cb-name">{clause.name}</div>
                  <span className={`cb-risk tag-${clause.color}`}>{clause.risk}</span>
                  <button className={`cb-toggle ${clause.on ? 'toggled' : ''}`} onClick={() => toggleClause(i)}></button>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '20px', padding: '14px 18px', background: 'var(--amber-pale)',
              border: '1px solid var(--amber)', display: 'flex', alignItems: 'center', gap: '10px'
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 13.5L8 2.5l6 11H2z" stroke="var(--amber)" strokeWidth="1.2" strokeLinejoin="round" />
                <path d="M8 9v2" stroke="var(--amber)" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="8" cy="12" r=".5" fill="var(--amber)" />
              </svg>
              <span style={{ fontSize: '12px', color: 'var(--amber)' }}>
                <b>{clauses.filter(c => c.on && c.color === 'red').length} high-risk clauses</b> selected — will be flagged for manual review before approval
              </span>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="form-section" style={{ borderBottom: 'none' }}>
            <div className="form-section-title">Review & create</div>
            <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '20px', lineHeight: '1.6' }}>
              Review all details before creating the contract. It will enter the <b>Draft</b> stage and be assigned to <b>{form.owner || 'Priya Sharma'}</b>.
            </p>

            <div className="review-grid">
              <div className="review-cell">
                <div className="review-label">Contract name</div>
                <div className="review-value">{form.name || 'Service Agreement – TechCorp'}</div>
              </div>
              <div className="review-cell">
                <div className="review-label">Counterparty</div>
                <div className="review-value">{form.counterparty || 'TechCorp Inc.'}</div>
              </div>
              <div className="review-cell">
                <div className="review-label">Type</div>
                <div className="review-value">{form.type}</div>
              </div>
              <div className="review-cell">
                <div className="review-label">Department</div>
                <div className="review-value">{form.department}</div>
              </div>
              <div className="review-cell">
                <div className="review-label">Owner</div>
                <div className="review-value">{form.owner}</div>
              </div>
              <div className="review-cell">
                <div className="review-label">Value</div>
                <div className="review-value">{form.value || '—'}</div>
              </div>
              <div className="review-cell">
                <div className="review-label">Template</div>
                <div className="review-value">{TEMPLATES.find(t => t.id === selectedTemplate)?.name}</div>
              </div>
              <div className="review-cell">
                <div className="review-label">Clauses</div>
                <div className="review-value">{clauses.filter(c => c.on).length} selected</div>
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              <div className="form-section-title">Clauses included</div>
              {clauses.filter(c => c.on).map((clause, i) => (
                <div key={i} className="cb-row" style={{ cursor: 'default' }}>
                  <div className={`cb-bar bar-${clause.color}`}></div>
                  <div className="cb-name">{clause.name}</div>
                  <span className={`cb-risk tag-${clause.color}`}>{clause.risk}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M4 7l2.5 2.5L10 5" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '24px', padding: '16px 20px', background: 'var(--green-pale)',
              border: '1px solid var(--green)', display: 'flex', alignItems: 'center', gap: '10px'
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6" stroke="var(--green)" strokeWidth="1.5" />
                <path d="M5.5 8l2 2 3.5-3.5" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontSize: '12px', color: 'var(--green)' }}>
                Contract is ready to create. It will be placed in <b>Draft</b> stage for review.
              </span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ background: 'var(--cream)' }}>
      <div className="new-contract-wrap">

        {/* BACK */}
        <div className="detail-back">
          <button className="back-link" onClick={() => onNavigate('contracts')}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Contracts
          </button>
          <div className="back-sep"></div>
          <span className="back-crumb">New contract</span>
        </div>

        {/* HEADER */}
        <div className="nc-header">
          <div className="nc-title">New Contract</div>
          <div className="nc-sub">Step {step + 1} of {steps.length} — {steps[step]}</div>
        </div>

        {/* STEP INDICATOR */}
        <div className="step-indicator">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`step-item ${i < step ? 'step-done' : ''} ${i === step ? 'step-active' : ''}`}
              onClick={() => { if (i <= step) setStep(i); }}
            >
              <div className="step-num">{`0${i + 1}`}</div>
              <div className="step-name">{s}</div>
            </div>
          ))}
        </div>

        {/* FORM CONTENT */}
        {renderStep()}

        {/* NAVIGATION */}
        <div className="form-nav">
          <div className="form-nav-left">
            {step > 0 && (
              <button className="btn-secondary" onClick={() => setStep(step - 1)}>
                ← Previous
              </button>
            )}
            <button className="btn-secondary" onClick={() => onNavigate('contracts')}>Cancel</button>
          </div>
          <div className="form-nav-right">
            {step < steps.length - 1 ? (
              <button className="btn-primary-lg" onClick={() => setStep(step + 1)} style={{ padding: '12px 28px' }}>
                <span>Continue</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ) : (
              <button className="btn-primary-lg" onClick={handleCreate} style={{ padding: '12px 28px' }}>
                <span>Create contract</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 8l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* TOAST */}
      {toastMsg && (
        <div className="toast">
          <div className="toast-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 8l3 3 5-5" stroke="var(--cream)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {toastMsg}
        </div>
      )}
    </div>
  );
}
