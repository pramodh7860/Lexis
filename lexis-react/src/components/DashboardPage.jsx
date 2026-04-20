import React, { useState } from 'react';

export default function DashboardPage({ onNavigate }) {
  const [activeSbItem, setActiveSbItem] = useState('Overview');

  const handleSbClick = (name) => {
    setActiveSbItem(name);
  };

  return (
    <div id="page-dashboard">
      <div className="dash-wrap">

        {/* SIDEBAR */}
        <div className="sidebar">
          <div className="sb-section">
            <div className="sb-label">Command</div>
            <div className={`sb-item ${activeSbItem === 'Overview' ? 'active' : ''}`} onClick={() => handleSbClick('Overview')}>
              <div className="sb-item-left">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1.5" y="1.5" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.2" />
                  <rect x="8" y="1.5" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.2" />
                  <rect x="1.5" y="8" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.2" />
                  <rect x="8" y="8" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                Overview
              </div>
            </div>
            <div className={`sb-item ${activeSbItem === 'All contracts' ? 'active' : ''}`} onClick={() => handleSbClick('All contracts')}>
              <div className="sb-item-left">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 4h10M2 7h7M2 10h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                All contracts
              </div>
              <span className="sb-badge b-ink">48</span>
            </div>
            <div className={`sb-item ${activeSbItem === 'Pending approval' ? 'active' : ''}`} onClick={() => handleSbClick('Pending approval')}>
              <div className="sb-item-left">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M7 4.5v2.5l1.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Pending approval
              </div>
              <span className="sb-badge b-red">7</span>
            </div>
            <div className={`sb-item ${activeSbItem === 'Expiring soon' ? 'active' : ''}`} onClick={() => handleSbClick('Expiring soon')}>
              <div className="sb-item-left">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 12V7l4-3.5L11 7v5" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                  <path d="M5.5 12V9h3v3" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                </svg>
                Expiring soon
              </div>
              <span className="sb-badge b-red">5</span>
            </div>
          </div>

          <div className="sb-divider"></div>

          <div className="sb-section">
            <div className="sb-label">Workspace</div>
            <div className={`sb-item ${activeSbItem === 'Templates' ? 'active' : ''}`} onClick={() => handleSbClick('Templates')}>
              <div className="sb-item-left">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 2h5l3 3v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M8 2v4h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                Templates
              </div>
            </div>
            <div className={`sb-item ${activeSbItem === 'Counterparties' ? 'active' : ''}`} onClick={() => handleSbClick('Counterparties')}>
              <div className="sb-item-left">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="4.5" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="9.5" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                Counterparties
              </div>
            </div>
            <div className={`sb-item ${activeSbItem === 'Obligations' ? 'active' : ''}`} onClick={() => handleSbClick('Obligations')}>
              <div className="sb-item-left">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="2" y="2" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M5 7h4M7 5v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                Obligations
              </div>
            </div>
            <div className={`sb-item ${activeSbItem === 'Analytics' ? 'active' : ''}`} onClick={() => handleSbClick('Analytics')}>
              <div className="sb-item-left">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 10l3-4 3 3L11 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Analytics
              </div>
            </div>
          </div>

          <div className="sb-divider"></div>

          <div className="sb-section">
            <div className="sb-label">Account</div>
            <div className={`sb-item ${activeSbItem === 'Team' ? 'active' : ''}`} onClick={() => handleSbClick('Team')}>
              <div className="sb-item-left">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M2 12c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                Team
              </div>
            </div>
            <div className={`sb-item ${activeSbItem === 'Audit log' ? 'active' : ''}`} onClick={() => handleSbClick('Audit log')}>
              <div className="sb-item-left">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1l1.3 2.6 2.9.4-2.1 2 .5 2.9L7 7.5 4.4 9l.5-2.9L3 4.1l2.9-.4L7 1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                </svg>
                Audit log
              </div>
            </div>
          </div>

          <div className="sb-bottom">
            <div className="sb-user">
              <div className="sb-avatar">AK</div>
              <div>
                <div className="sb-user-name">Arjun Kumar</div>
                <div className="sb-user-role">General Counsel <span style={{ opacity: 0.5 }}>· Admin</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div className="dash-main">

          <div className="command-bar">
            <div>
              <div className="command-greeting">Good evening, Arjun.</div>
              <div className="command-sub">Mon 20 Apr 2026 &nbsp;·&nbsp; 3 contracts need a decision today
                &nbsp;·&nbsp; 2 approvals are overdue</div>
            </div>
            <button className="btn-ink" onClick={() => onNavigate('new-contract')} style={{ fontSize: '12px', padding: '10px 22px' }}>+ New
              contract</button>
          </div>

          {/* KPIs */}
          <div className="kpi-strip">
            <div className="kpi-cell k-black">
              <div className="kpi-label">Active contracts</div>
              <div className="kpi-val">19</div>
              <div className="kpi-delta up">↑ 3 this month</div>
            </div>
            <div className="kpi-cell k-red">
              <div className="kpi-label">Expiring within 30d</div>
              <div className="kpi-val">5</div>
              <div className="kpi-delta down">2 critical this week</div>
            </div>
            <div className="kpi-cell k-amber">
              <div className="kpi-label">Pending approval</div>
              <div className="kpi-val">7</div>
              <div className="kpi-delta warn">2 overdue 4d+</div>
            </div>
            <div className="kpi-cell k-green">
              <div className="kpi-label">Total contract value</div>
              <div className="kpi-val">$2.4M</div>
              <div className="kpi-delta up">↑ 18% QoQ</div>
            </div>
          </div>

          {/* ATTENTION SPLIT */}
          <div className="attention-section">

            <div className="attention-main">
              <div className="panel-head">
                <div className="ph-title">Needs your decision — 5 items</div>
                <button className="ph-action" onClick={() => onNavigate('contracts')}>View all contracts →</button>
              </div>

              <div className="contract-entry" onClick={() => onNavigate('contract-detail', 'techcorp')} style={{cursor: 'pointer'}}>
                <div className="ce-urgency ce-urg-red"></div>
                <div className="ce-body">
                  <div className="ce-name">Service Agreement – TechCorp</div>
                  <div className="ce-sub">Legal · Priya Sharma · Ref #2024-0847</div>
                </div>
                <div className="ce-stage"><span className="stage-pill sp-red">Expiring</span></div>
                <div className="ce-date">Apr 22</div>
                <div className="ce-cta"><button className="cta-pill">Review now</button></div>
              </div>
              <div className="contract-entry" onClick={() => onNavigate('contract-detail', 'novacorp')} style={{cursor: 'pointer'}}>
                <div className="ce-urgency ce-urg-red"></div>
                <div className="ce-body">
                  <div className="ce-name">Vendor MSA – NovaCorp</div>
                  <div className="ce-sub">Procurement · Raj Kumar · Overdue 4 days</div>
                </div>
                <div className="ce-stage"><span className="stage-pill sp-red">Overdue</span></div>
                <div className="ce-date">Apr 16</div>
                <div className="ce-cta"><button className="cta-pill">Approve</button></div>
              </div>
              <div className="contract-entry" onClick={() => onNavigate('contract-detail', 'meridian')} style={{cursor: 'pointer'}}>
                <div className="ce-urgency ce-urg-amber"></div>
                <div className="ce-body">
                  <div className="ce-name">SaaS License – Meridian Systems</div>
                  <div className="ce-sub">Procurement · Assigned: Priya · Stalled 9 days</div>
                </div>
                <div className="ce-stage"><span className="stage-pill sp-amber">Stalled</span></div>
                <div className="ce-date">Apr 11</div>
                <div className="ce-cta"><button className="cta-pill">Follow up</button></div>
              </div>
              <div className="contract-entry" style={{cursor: 'pointer'}}>
                <div className="ce-urgency ce-urg-amber"></div>
                <div className="ce-body">
                  <div className="ce-name">NDA – Orbit Labs</div>
                  <div className="ce-sub">Business Dev · Renewal not started · Exp. May 2</div>
                </div>
                <div className="ce-stage"><span className="stage-pill sp-amber">Renew soon</span></div>
                <div className="ce-date">May 2</div>
                <div className="ce-cta"><button className="cta-pill">Start renewal</button></div>
              </div>
              <div className="contract-entry">
                <div className="ce-urgency ce-urg-blue"></div>
                <div className="ce-body">
                  <div className="ce-name">Partnership Agreement – Stealth Co.</div>
                  <div className="ce-sub">Legal · 2 unresolved comments</div>
                </div>
                <div className="ce-stage"><span className="stage-pill sp-blue">In review</span></div>
                <div className="ce-date">May 30</div>
                <div className="ce-cta"><button className="cta-pill">View comments</button></div>
              </div>
            </div>

            <div className="attention-side">
              <div className="panel-head">
                <div className="ph-title">Activity</div>
              </div>
              <div className="activity-feed">
                <div className="act-entry">
                  <div className="act-ava ava-green">AK</div>
                  <div>
                    <div className="act-text">You approved <b>NDA – Global Partners</b></div>
                    <div className="act-time">Today · 4:12 PM</div>
                  </div>
                </div>
                <div className="act-entry">
                  <div className="act-ava ava-blue">PS</div>
                  <div>
                    <div className="act-text"><b>Meridian SaaS License</b> moved to Legal Review</div>
                    <div className="act-time">Today · 2:45 PM</div>
                  </div>
                </div>
                <div className="act-entry">
                  <div className="act-ava ava-blue">PS</div>
                  <div>
                    <div className="act-text">Priya commented on <b>Stealth Co Partnership</b></div>
                    <div className="act-time">Today · 11:30 AM</div>
                  </div>
                </div>
                <div className="act-entry">
                  <div className="act-ava ava-amber">RK</div>
                  <div>
                    <div className="act-text"><b>NovaCorp Vendor MSA</b> sent for approval</div>
                    <div className="act-time">Yesterday · 5:00 PM</div>
                  </div>
                </div>
                <div className="act-entry">
                  <div className="act-ava ava-green">AK</div>
                  <div>
                    <div className="act-text">You created <b>Service Agreement – TechCorp</b></div>
                    <div className="act-time">Apr 15 · 10:14 AM</div>
                  </div>
                </div>
              </div>

              <div className="panel-head" style={{ borderTop: '1px solid var(--line)' }}>
                <div className="ph-title">Quick actions</div>
              </div>
              <div className="quick-panel">
                <div className="qa-row" onClick={() => onNavigate('new-contract')} style={{cursor: 'pointer'}}>
                  <div className="qa-row-left">+ New contract</div>
                  <div className="qa-row-right">From template →</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
