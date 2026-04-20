import React, { useState, useEffect } from 'react';

export default function ContractsPage({ onNavigate, userRole }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/contracts')
      .then(res => res.json())
      .then(data => {
        setContracts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filters = ['All', 'Expiring', 'Approval', 'Active', 'Draft', 'Executed'];

  const filteredContracts = activeFilter === 'All'
    ? contracts
    : contracts.filter(c => c.stage === activeFilter || (activeFilter === 'Expiring' && c.urgency === 'red'));

  return (
    <div id="page-contracts">
      <div className="contracts-wrap">

        <div className="ct-header">
          <div>
            <div className="ct-title">Contracts</div>
            <div className="ct-sub">
              {contracts.length} total &nbsp;·&nbsp; 
              {contracts.filter(c => c.urgency === 'red').length} expiring &nbsp;·&nbsp; 
              {contracts.filter(c => c.stage === 'Approval').length} pending approval
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button className="btn-primary-lg" onClick={() => onNavigate('new-contract')}><span>+ New contract</span></button>
          </div>
        </div>

        <div className="filter-row">
          <div className="ct-filters">
            {filters.map((f) => (
              <button
                key={f}
                className={`ct-filter ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="search-field">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="6" cy="6" r="4" stroke="var(--faint)" strokeWidth="1.2" />
              <path d="M9.5 9.5l2 2" stroke="var(--faint)" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <input type="text" placeholder="Search contracts, parties…" />
          </div>
        </div>

        <div className="ct-table">
          <div className="ct-thead">
            <div></div>
            <div className="ct-th">Contract / Party</div>
            <div className="ct-th">Stage</div>
            <div className="ct-th">Value</div>
            <div className="ct-th">Expiry date</div>
            <div className="ct-th">Action</div>
          </div>

          {loading ? (
            <div style={{ padding: '20px', color: 'var(--muted)' }}>Loading contracts in real-time...</div>
          ) : filteredContracts.length === 0 ? (
            <div style={{ padding: '20px', color: 'var(--muted)' }}>No contracts found.</div>
          ) : (
            filteredContracts.map(c => (
              <div key={c._id} className="ct-row" onClick={() => onNavigate('contract-detail', c._id)} style={{cursor: 'pointer'}}>
                <div className={`cr-urgency-bar ub-${c.urgency || 'gray'}`}></div>
                <div className="cr-name-cell">
                  <div className="cr-contract-name">{c.name}</div>
                  <div className="cr-contract-party">{c.department} · {c.owner} · Ref {c.ref}</div>
                </div>
                <div className="cr-stage-cell">
                  <span className={`stage-pill sp-${c.urgency || 'gray'}`}>{c.stage}</span>
                </div>
                <div className="cr-val-cell">{c.value || '—'}</div>
                <div className="cr-expiry-cell">
                  <span className={`expiry-text exp-${c.urgency || 'gray'}`}>
                    {c.expires} {c.expiresIn ? `· ${c.expiresIn}` : ''}
                  </span>
                </div>
                <div className="cr-cta-cell">
                  <button>
                    {c.stage === 'Approval' ? 'Approve' : c.stage === 'Review' ? 'Review now' : 'View'}
                  </button>
                </div>
              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
}
