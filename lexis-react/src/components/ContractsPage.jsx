import React, { useState } from 'react';

export default function ContractsPage({ onNavigate }) {
  const [activeFilter, setActiveFilter] = useState('All (48)');

  const filters = ['All (48)', 'Expiring (5)', 'Approval (7)', 'Active (19)', 'Draft (8)', 'Executed (14)'];

  return (
    <div id="page-contracts">
      <div className="contracts-wrap">

        <div className="ct-header">
          <div>
            <div className="ct-title">Contracts</div>
            <div className="ct-sub">48 total &nbsp;·&nbsp; 5 expiring &nbsp;·&nbsp; 7 pending approval &nbsp;·&nbsp;
              $2.4M total value</div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button className="btn-ghost-lg">↑ Import</button>
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

          <div className="ct-row" onClick={() => onNavigate('contract-detail', 'techcorp')} style={{cursor: 'pointer'}}>
            <div className="cr-urgency-bar ub-red"></div>
            <div className="cr-name-cell">
              <div className="cr-contract-name">Service Agreement – TechCorp</div>
              <div className="cr-contract-party">Legal · Priya Sharma · Ref #2024-0847</div>
            </div>
            <div className="cr-stage-cell"><span className="stage-pill sp-red">Expiring</span></div>
            <div className="cr-val-cell">$240K</div>
            <div className="cr-expiry-cell"><span className="expiry-text exp-red">Apr 22 · 2 days</span></div>
            <div className="cr-cta-cell"><button>Review now</button></div>
          </div>
          <div className="ct-row" onClick={() => onNavigate('contract-detail', 'novacorp')} style={{cursor: 'pointer'}}>
            <div className="cr-urgency-bar ub-red"></div>
            <div className="cr-name-cell">
              <div className="cr-contract-name">Vendor MSA – NovaCorp</div>
              <div className="cr-contract-party">Procurement · Raj Kumar · Overdue 4 days</div>
            </div>
            <div className="cr-stage-cell"><span className="stage-pill sp-red">Overdue</span></div>
            <div className="cr-val-cell">$80K</div>
            <div className="cr-expiry-cell"><span className="expiry-text exp-gray">Jun 15</span></div>
            <div className="cr-cta-cell"><button>Approve</button></div>
          </div>
          <div className="ct-row" onClick={() => onNavigate('contract-detail', 'meridian')} style={{cursor: 'pointer'}}>
            <div className="cr-urgency-bar ub-amber"></div>
            <div className="cr-name-cell">
              <div className="cr-contract-name">SaaS License – Meridian Systems</div>
              <div className="cr-contract-party">Procurement · Assigned: Priya Sharma</div>
            </div>
            <div className="cr-stage-cell"><span className="stage-pill sp-amber">Stalled</span></div>
            <div className="cr-val-cell">$36K/yr</div>
            <div className="cr-expiry-cell"><span className="expiry-text exp-gray">Sep 1</span></div>
            <div className="cr-cta-cell"><button>Follow up</button></div>
          </div>
          <div className="ct-row" style={{cursor: 'pointer'}}>
            <div className="cr-urgency-bar ub-amber"></div>
            <div className="cr-name-cell">
              <div className="cr-contract-name">NDA – Orbit Labs</div>
              <div className="cr-contract-party">Business Development</div>
            </div>
            <div className="cr-stage-cell"><span className="stage-pill sp-amber">Renew soon</span></div>
            <div className="cr-val-cell">—</div>
            <div className="cr-expiry-cell"><span className="expiry-text exp-amber">May 2 · 12 days</span></div>
            <div className="cr-cta-cell"><button>Start renewal</button></div>
          </div>
          <div className="ct-row">
            <div className="cr-urgency-bar ub-blue"></div>
            <div className="cr-name-cell">
              <div className="cr-contract-name">Partnership Agreement – Stealth Co.</div>
              <div className="cr-contract-party">Legal · 2 unresolved comments</div>
            </div>
            <div className="cr-stage-cell"><span className="stage-pill sp-blue">In review</span></div>
            <div className="cr-val-cell">$1.2M</div>
            <div className="cr-expiry-cell"><span className="expiry-text exp-gray">May 30</span></div>
            <div className="cr-cta-cell"><button>View comments</button></div>
          </div>
          <div className="ct-row">
            <div className="cr-urgency-bar ub-green"></div>
            <div className="cr-name-cell">
              <div className="cr-contract-name">Enterprise License – Apex Corp</div>
              <div className="cr-contract-party">Sales · Completed · Ref #2024-0312</div>
            </div>
            <div className="cr-stage-cell"><span className="stage-pill sp-green">Executed</span></div>
            <div className="cr-val-cell">$420K</div>
            <div className="cr-expiry-cell"><span className="expiry-text exp-gray">Dec 31</span></div>
            <div className="cr-cta-cell"><button>View</button></div>
          </div>
          <div className="ct-row">
            <div className="cr-urgency-bar ub-blue"></div>
            <div className="cr-name-cell">
              <div className="cr-contract-name">Supply Agreement – Vantage Manufacturing</div>
              <div className="cr-contract-party">Operations · Legal review in progress</div>
            </div>
            <div className="cr-stage-cell"><span className="stage-pill sp-blue">In review</span></div>
            <div className="cr-val-cell">$180K</div>
            <div className="cr-expiry-cell"><span className="expiry-text exp-gray">Jul 14</span></div>
            <div className="cr-cta-cell"><button>Review</button></div>
          </div>
          <div className="ct-row">
            <div className="cr-urgency-bar ub-gray"></div>
            <div className="cr-name-cell">
              <div className="cr-contract-name">Consulting Agreement – BlueSky Partners</div>
              <div className="cr-contract-party">Finance · Draft stage</div>
            </div>
            <div className="cr-stage-cell"><span className="stage-pill" style={{ background: 'var(--cream3)', color: 'var(--muted)' }}>Draft</span></div>
            <div className="cr-val-cell">$55K</div>
            <div className="cr-expiry-cell"><span className="expiry-text exp-gray">TBD</span></div>
            <div className="cr-cta-cell"><button>Continue</button></div>
          </div>
        </div>
      </div>
    </div>
  );
}
