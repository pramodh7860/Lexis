import React, { useState, useEffect } from 'react';
import { TemplatesView, CounterpartiesView, ObligationsView, AnalyticsView, AuditLogView } from './DashboardViews';

export default function DashboardPage({ onNavigate, currentUser }) {
  const [activeSbItem, setActiveSbItem] = useState('Overview');
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

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

  const handleSbClick = (name) => {
    // Override routing for external routes
    if (name === 'All contracts' || name === 'Pending approval' || name === 'Expiring soon') {
      return onNavigate('contracts');
    }
    if (name === 'Team') {
      if (currentUser?.role === 'Admin') {
        return onNavigate('admin-users');
      } else {
        return showToast('Admin access required for Team management');
      }
    }
    // Otherwise just update the internal dashboard tab layout
    setActiveSbItem(name);
  };

  const activeCount = contracts.length;
  const pendingCount = contracts.filter(c => c.status && c.status.toLowerCase().includes('approval')).length;
  const expiringCount = contracts.filter(c => c.status && c.status.toLowerCase().includes('expiring')).length;
  const totalValue = contracts.reduce((acc, c) => {
    const vStr = c.value ? c.value.replace(/[^0-9.-]+/g,"") : "0";
    return acc + Number(vStr);
  }, 0);
  
  const formattedValue = totalValue >= 1000000 
    ? `$${(totalValue/1000000).toFixed(1)}M` 
    : `$${(totalValue/1000).toFixed(0)}K`;

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
              <span className="sb-badge b-ink">{activeCount}</span>
            </div>
            <div className={`sb-item ${activeSbItem === 'Pending approval' ? 'active' : ''}`} onClick={() => handleSbClick('Pending approval')}>
              <div className="sb-item-left">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M7 4.5v2.5l1.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Pending approval
              </div>
              <span className="sb-badge b-red">{pendingCount}</span>
            </div>
            <div className={`sb-item ${activeSbItem === 'Expiring soon' ? 'active' : ''}`} onClick={() => handleSbClick('Expiring soon')}>
              <div className="sb-item-left">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 12V7l4-3.5L11 7v5" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                  <path d="M5.5 12V9h3v3" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                </svg>
                Expiring soon
              </div>
              <span className="sb-badge b-red">{expiringCount}</span>
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
              <div className="sb-avatar" style={{ textTransform: 'uppercase' }}>
                {currentUser?.name?.charAt(0) || 'A'}
              </div>
              <div>
                <div className="sb-user-name">{currentUser?.name || 'Arjun Kumar'}</div>
                <div className="sb-user-role" style={{ textTransform: 'capitalize' }}>
                  {currentUser?.role || 'Admin'} Level
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div className="dash-main">
          {activeSbItem === 'Overview' && (
            <>
              <div className="command-bar">
                <div>
                  <div className="command-greeting">Good evening, {currentUser?.name?.split(' ')[0] || 'Arjun'}.</div>
                  <div className="command-sub">{new Date().toDateString()} &nbsp;·&nbsp; {pendingCount} contracts need a decision today</div>
                </div>
                <button className="btn-ink" onClick={() => onNavigate('new-contract')} style={{ fontSize: '12px', padding: '10px 22px' }}>+ New contract</button>
              </div>

              {/* KPIs */}
              <div className="kpi-strip">
                <div className="kpi-cell k-black">
                  <div className="kpi-label">Active contracts</div>
                  <div className="kpi-val">{activeCount}</div>
                  <div className="kpi-delta up">↑ Tracked in system</div>
                </div>
                <div className="kpi-cell k-red">
                  <div className="kpi-label">Expiring within 30d</div>
                  <div className="kpi-val">{expiringCount}</div>
                  <div className="kpi-delta down">Requires review</div>
                </div>
                <div className="kpi-cell k-amber">
                  <div className="kpi-label">Pending approval</div>
                  <div className="kpi-val">{pendingCount}</div>
                  <div className="kpi-delta warn">Bottlenecks found</div>
                </div>
                <div className="kpi-cell k-green">
                  <div className="kpi-label">Total contract value</div>
                  <div className="kpi-val">{formattedValue}</div>
                  <div className="kpi-delta up">Estimated gross volume</div>
                </div>
              </div>

              {/* ATTENTION SPLIT */}
              <div className="attention-section">
                <div className="attention-main">
                  <div className="panel-head">
                    <div className="ph-title">Needs your decision — {contracts.slice(0, 5).length} items</div>
                    <button className="ph-action" onClick={() => onNavigate('contracts')}>View all contracts →</button>
                  </div>

                  {loading ? (
                    <div style={{ padding: '24px', textAlign: 'center', color: 'var(--muted)' }}>Fetching live data from MongoDB...</div>
                  ) : contracts.slice(0, 5).map(c => {
                    const isOverdue = c.status === 'OVERDUE' || c.status === 'EXPIRING';
                    const isAmber = c.status === 'STALLED' || c.status === 'REVIEW' || c.status === 'APPROVAL';
                    return (
                      <div key={c._id} className="contract-entry" onClick={() => onNavigate('contract-detail', c._id)} style={{cursor: 'pointer'}}>
                        <div className={`ce-urgency ${isOverdue ? 'ce-urg-red' : isAmber ? 'ce-urg-amber' : 'ce-urg-blue'}`}></div>
                        <div className="ce-body">
                          <div className="ce-name">{c.title}</div>
                          <div className="ce-sub">{c.party} · {c.type}</div>
                        </div>
                        <div className="ce-stage"><span className={`stage-pill ${isOverdue ? 'sp-red' : isAmber ? 'sp-amber' : 'sp-blue'}`}>{c.status || 'ACTIVE'}</span></div>
                        <div className="ce-date">{c.timeline?.expiryDate ? new Date(c.timeline.expiryDate).toLocaleDateString(undefined, {month: 'short', day: 'numeric'}) : 'N/A'}</div>
                        <div className="ce-cta"><button className="cta-pill">Review now</button></div>
                      </div>
                    );
                  })}
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
            </>
          )}

          {activeSbItem === 'Templates' && <TemplatesView />}
          {activeSbItem === 'Counterparties' && <CounterpartiesView />}
          {activeSbItem === 'Obligations' && <ObligationsView />}
          {activeSbItem === 'Analytics' && <AnalyticsView />}
          {activeSbItem === 'Audit log' && <AuditLogView />}

        </div>
      </div>

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
