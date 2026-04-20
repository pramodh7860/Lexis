import React, { useEffect, useRef } from 'react';

export default function HomePage({ onNavigate }) {
  const revealRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRevealRef = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <>
      {/* TICKER */}
      <div className="ticker-bar">
        <div className="ticker-track">
          <div className="ticker-item">
            <div className="ticker-dot td-r"></div> TechCorp MSA — EXPIRES IN 2 DAYS
          </div>
          <div className="ticker-item">
            <div className="ticker-dot td-a"></div> NovaCorp MSA — APPROVAL OVERDUE 4 DAYS
          </div>
          <div className="ticker-item">
            <div className="ticker-dot td-g"></div> NDA Global Partners — EXECUTED TODAY
          </div>
          <div className="ticker-item">
            <div className="ticker-dot td-r"></div> Meridian SaaS — STALLED IN REVIEW 9 DAYS
          </div>
          <div className="ticker-item">
            <div className="ticker-dot td-a"></div> Orbit Labs NDA — RENEWAL DUE IN 12 DAYS
          </div>
          <div className="ticker-item">
            <div className="ticker-dot td-g"></div> Apex Enterprise — $420K CONTRACT CLOSED
          </div>
          {/* duplicate for seamless loop */}
          <div className="ticker-item">
            <div className="ticker-dot td-r"></div> TechCorp MSA — EXPIRES IN 2 DAYS
          </div>
          <div className="ticker-item">
            <div className="ticker-dot td-a"></div> NovaCorp MSA — APPROVAL OVERDUE 4 DAYS
          </div>
          <div className="ticker-item">
            <div className="ticker-dot td-g"></div> NDA Global Partners — EXECUTED TODAY
          </div>
          <div className="ticker-item">
            <div className="ticker-dot td-r"></div> Meridian SaaS — STALLED IN REVIEW 9 DAYS
          </div>
          <div className="ticker-item">
            <div className="ticker-dot td-a"></div> Orbit Labs NDA — RENEWAL DUE IN 12 DAYS
          </div>
          <div className="ticker-item">
            <div className="ticker-dot td-g"></div> Apex Enterprise — $420K CONTRACT CLOSED
          </div>
        </div>
      </div>

      {/* HERO SPLIT */}
      <div className="hero-section">
        <div className="hero-left">
          {/* Ruled lines decoration */}
          <div className="hero-rules">
            <div className="rule-h" style={{ top: '14%' }}></div>
            <div className="rule-h" style={{ top: '28%' }}></div>
            <div className="rule-h" style={{ top: '56%' }}></div>
            <div className="rule-h" style={{ top: '72%' }}></div>
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="hero-eyebrow stagger-1">
              <div className="eyebrow-tag">Contract Intelligence</div>
              <div className="eyebrow-line"></div>
            </div>

            <h1 className="hero-headline stagger-2">
              Every deal,<br />
              <em>accounted for.</em><br />
              <span className="redline">Nothing</span><br />missed.
            </h1>

            <p className="hero-body stagger-3">
              Lexis gives legal teams the precision instruments to draft, track, approve and close contracts —
              without losing control at any stage. Trusted by GCs at companies managing $500M+ in annual
              contract value.
            </p>

            <div className="hero-actions stagger-4">
              <button className="btn-primary-lg" onClick={() => onNavigate('dashboard')}>
                <span>Open the platform</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="btn-ghost-lg" onClick={() => onNavigate('contracts')}>Browse contracts</button>
            </div>
          </div>

          <div className="hero-stats stagger-5">
            <div className="hero-stat">
              <div className="hs-number">48<span className="hs-unit">K</span></div>
              <div className="hs-label">Contracts managed</div>
            </div>
            <div className="hero-stat">
              <div className="hs-number">99<span className="hs-unit">%</span></div>
              <div className="hs-label">On-time rate</div>
            </div>
            <div className="hero-stat">
              <div className="hs-number">$2.1<span className="hs-unit">B</span></div>
              <div className="hs-label">Annual value tracked</div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: LIVE PREVIEW */}
        <div className="hero-right">
          <div className="hero-right-top">
            <div className="contract-visual">
              <div className="cv-stamp">
                <div className="cv-stamp-text">Under<br />Review</div>
              </div>
              <div className="cv-meta">CONTRACT · REF #2024-0847 · DRAFT 3.1</div>
              <div className="cv-title">Master Service Agreement</div>
              <div className="cv-party">TechCorp Inc. &nbsp;×&nbsp; Lexis Client Co.</div>

              <div className="cv-ruler">
                <div className="cv-ruler-labels">
                  <span>Lifecycle progress</span>
                  <span style={{ color: 'var(--red)' }}>65% — Approval pending</span>
                </div>
                <div className="cv-ruler-track">
                  <div className="cv-ruler-fill"></div>
                </div>
                <div className="cv-ruler-ticks">
                  <div className="cv-tick active"></div>
                  <div className="cv-tick active"></div>
                  <div className="cv-tick active"></div>
                  <div className="cv-tick active"></div>
                  <div className="cv-tick active"></div>
                  <div className="cv-tick active"></div>
                  <div className="cv-tick"></div>
                  <div className="cv-tick"></div>
                  <div className="cv-tick"></div>
                  <div className="cv-tick"></div>
                </div>
              </div>

              <div className="cv-stages">
                <div className="cv-stage done">Draft</div>
                <div className="cv-stage done">Review</div>
                <div className="cv-stage current">Approve</div>
                <div className="cv-stage">Execute</div>
                <div className="cv-stage">Archive</div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1px',
                background: 'var(--line)',
                border: '1px solid var(--line)',
                marginTop: '1px'
              }}>
                <div style={{ background: 'var(--cream)', padding: '10px 12px' }}>
                  <div style={{
                    fontFamily: 'var(--f-mono)',
                    fontSize: '9px',
                    color: 'var(--faint)',
                    marginBottom: '4px',
                    letterSpacing: '.05em'
                  }}>EXPIRES</div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--red)' }}>Apr 22 · 2d</div>
                </div>
                <div style={{ background: 'var(--cream)', padding: '10px 12px' }}>
                  <div style={{
                    fontFamily: 'var(--f-mono)',
                    fontSize: '9px',
                    color: 'var(--faint)',
                    marginBottom: '4px',
                    letterSpacing: '.05em'
                  }}>VALUE</div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink)' }}>$240,000</div>
                </div>
                <div style={{ background: 'var(--cream)', padding: '10px 12px' }}>
                  <div style={{
                    fontFamily: 'var(--f-mono)',
                    fontSize: '9px',
                    color: 'var(--faint)',
                    marginBottom: '4px',
                    letterSpacing: '.05em'
                  }}>CLAUSES</div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink)' }}>14</div>
                </div>
              </div>
            </div>
          </div>

          {/* ALERT LIST */}
          <div className="hero-right-bottom">
            <div className="alert-header">
              <div className="alert-header-text">Live alerts</div>
              <div className="alert-count">5 active</div>
            </div>
            <div className="alert-item">
              <div className="alert-bar bar-red"></div>
              <div className="alert-body">
                <div className="alert-name">Service Agreement – TechCorp</div>
                <div className="alert-detail">Expires Apr 22 &nbsp;·&nbsp; Legal pending</div>
              </div>
              <div className="alert-tag tag-red">2 days</div>
            </div>
            <div className="alert-item">
              <div className="alert-bar bar-red"></div>
              <div className="alert-body">
                <div className="alert-name">Vendor MSA – NovaCorp</div>
                <div className="alert-detail">Approval overdue &nbsp;·&nbsp; 4 days blocked</div>
              </div>
              <div className="alert-tag tag-red">Overdue</div>
            </div>
            <div className="alert-item">
              <div className="alert-bar bar-amber"></div>
              <div className="alert-body">
                <div className="alert-name">SaaS License – Meridian</div>
                <div className="alert-detail">Stalled in review &nbsp;·&nbsp; 9 days</div>
              </div>
              <div className="alert-tag tag-amber">Stalled</div>
            </div>
            <div className="alert-item">
              <div className="alert-bar bar-amber"></div>
              <div className="alert-body">
                <div className="alert-name">NDA – Orbit Labs</div>
                <div className="alert-detail">Renewal not initiated &nbsp;·&nbsp; Exp. May 2</div>
              </div>
              <div className="alert-tag tag-amber">12 days</div>
            </div>
          </div>
        </div>
      </div>

      {/* LIFECYCLE RAIL */}
      <div className="section-divider reveal" ref={addRevealRef}>
        <div className="sd-label">Contract lifecycle</div>
        <div className="sd-line"></div>
        <div className="sd-num">06 stages</div>
      </div>

      <div className="lifecycle-rail">
        <div className="lc-cell done reveal" ref={addRevealRef}>
          <div className="lc-number">01</div>
          <div className="lc-icon">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M4 5h14M4 9h10M4 13h8" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M4 17h5" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="lc-name">Draft</div>
          <div className="lc-desc">AI-assisted authoring with a 400+ clause library and risk auto-flagging.</div>
          <span className="lc-count c-done">↑ 12 completed</span>
        </div>
        <div className="lc-cell done reveal" ref={addRevealRef}>
          <div className="lc-number">02</div>
          <div className="lc-icon">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="3" y="3" width="16" height="16" rx="2" stroke="var(--ink)" strokeWidth="1.5" />
              <path d="M7 11l3 3 5-5" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="lc-name">Legal review</div>
          <div className="lc-desc">Collaborative redlining, comment threads, and version history.</div>
          <span className="lc-count c-done">↑ 8 completed</span>
        </div>
        <div className="lc-cell active reveal" ref={addRevealRef}>
          <div className="lc-number">03</div>
          <div className="lc-icon">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="11" cy="11" r="7" stroke="var(--red)" strokeWidth="1.5" />
              <path d="M11 7v4l2.5 2.5" stroke="var(--red)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="lc-name">Approval</div>
          <div className="lc-desc">Configurable multi-stakeholder sign-off chains with escalation rules.</div>
          <span className="lc-count c-active">→ 7 in progress</span>
        </div>
        <div className="lc-cell idle reveal" ref={addRevealRef}>
          <div className="lc-number">04</div>
          <div className="lc-icon">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M5 18V9l6-5 6 5v9" stroke="var(--muted)" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M9 18v-5h4v5" stroke="var(--muted)" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="lc-name">Execution</div>
          <div className="lc-desc">Legally binding eSignature with blockchain-anchored audit trail.</div>
          <span className="lc-count c-idle">· 4 pending</span>
        </div>
        <div className="lc-cell idle reveal" ref={addRevealRef}>
          <div className="lc-number">05</div>
          <div className="lc-icon">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M11 4v14M4 11h14" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="lc-name">Obligation</div>
          <div className="lc-desc">Milestone extraction, SLA tracking, and automated alerts.</div>
          <span className="lc-count c-idle">· 19 live</span>
        </div>
        <div className="lc-cell idle reveal" ref={addRevealRef}>
          <div className="lc-number">06</div>
          <div className="lc-icon">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M11 3C6.6 3 3 6.6 3 11s3.6 8 8 8 8-3.6 8-8" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M15 3l4 4-4 4" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="lc-name">Renewal</div>
          <div className="lc-desc">Automated renewal triggers at configurable lead times.</div>
          <span className="lc-count c-idle">· 5 upcoming</span>
        </div>
      </div>

      {/* FEATURES */}
      <div className="section-divider reveal" ref={addRevealRef}>
        <div className="sd-label">Why Lexis</div>
        <div className="sd-line"></div>
        <div className="sd-num">06 capabilities</div>
      </div>

      <div className="features-section">
        <div className="features-intro reveal" ref={addRevealRef}>
          <div className="fi-label">Built for legal teams</div>
          <div className="fi-title">Precision<br /><em>over</em><br />complexity.</div>
          <p className="fi-body">Most CLM tools bury you in features. Lexis surfaces exactly what needs your attention
            — and nothing else.</p>
          <button className="btn-primary-lg" onClick={() => onNavigate('dashboard')} style={{ width: '100%', justifyContent: 'center' }}>
            <span>Start now</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="features-grid">
          <div className="feat reveal" ref={addRevealRef}>
            <div className="feat-num">01</div>
            <div className="feat-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 4.5h12M3 8h8M3 11.5h5" stroke="#F5F0E8" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </div>
            <div className="feat-name">Smart drafting</div>
            <div className="feat-desc">AI clause library with automatic risk detection. Draft enterprise agreements in 10 minutes.</div>
          </div>
          <div className="feat reveal" ref={addRevealRef}>
            <div className="feat-num">02</div>
            <div className="feat-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="5" cy="9" r="2.5" stroke="#F5F0E8" strokeWidth="1.4" />
                <circle cx="13" cy="5" r="2.5" stroke="#F5F0E8" strokeWidth="1.4" />
                <circle cx="13" cy="13" r="2.5" stroke="#F5F0E8" strokeWidth="1.4" />
                <path d="M7.2 8L10.8 6M7.2 10L10.8 12" stroke="#F5F0E8" strokeWidth="1.2" />
              </svg>
            </div>
            <div className="feat-name">Approval workflows</div>
            <div className="feat-desc">Route to the right people in the right order. No more email chains or missed sign-offs.</div>
          </div>
          <div className="feat reveal" ref={addRevealRef}>
            <div className="feat-num">03</div>
            <div className="feat-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2.5v4l2.5 2.5" stroke="#F5F0E8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="9" cy="10" r="6" stroke="#F5F0E8" strokeWidth="1.4" />
              </svg>
            </div>
            <div className="feat-name">Deadline engine</div>
            <div className="feat-desc">Never miss a renewal. Intelligent alerts at every critical milestone, on your schedule.</div>
          </div>
          <div className="feat reveal" ref={addRevealRef}>
            <div className="feat-num">04</div>
            <div className="feat-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 14.5L9 3.5l6 11H3z" stroke="#F5F0E8" strokeWidth="1.4" strokeLinejoin="round" />
                <path d="M9 10.5v1.5" stroke="#F5F0E8" strokeWidth="1.4" strokeLinecap="round" />
                <circle cx="9" cy="13" r=".6" fill="#F5F0E8" />
              </svg>
            </div>
            <div className="feat-name">Risk detection</div>
            <div className="feat-desc">Flags missing indemnity clauses, unfavorable liability caps, and compliance gaps in real time.</div>
          </div>
          <div className="feat reveal" ref={addRevealRef}>
            <div className="feat-num">05</div>
            <div className="feat-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="3" y="7" width="12" height="9" rx="1.5" stroke="#F5F0E8" strokeWidth="1.4" />
                <path d="M6 7V5.5a3 3 0 0 1 6 0V7" stroke="#F5F0E8" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </div>
            <div className="feat-name">eSignature</div>
            <div className="feat-desc">Court-admissible signatures with a full blockchain-anchored chain of custody.</div>
          </div>
          <div className="feat reveal" ref={addRevealRef}>
            <div className="feat-num">06</div>
            <div className="feat-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 13V7l6-4.5L15 7v6l-6 4.5L3 13z" stroke="#F5F0E8" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="feat-name">Obligation tracking</div>
            <div className="feat-desc">Extract every deliverable, SLA, and payment term from executed contracts automatically.</div>
          </div>
        </div>
      </div>

      {/* CTA BAND */}
      <div className="cta-band reveal" ref={addRevealRef}>
        <div className="cta-headline">
          Close more deals.<br />Miss <em>nothing.</em>
        </div>
        <div className="cta-actions">
          <button className="btn-primary-lg" onClick={() => onNavigate('dashboard')}>
            <span>Launch platform</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="btn-ghost-lg">Schedule a demo</button>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-left">
          <div className="footer-brand">Lexis<sup style={{ fontFamily: 'var(--f-mono)', fontSize: '9px', color: 'var(--faint)' }}>CLM</sup></div>
          <div className="footer-copy">© 2026 Lexis Technologies Inc.</div>
        </div>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Security</a>
          <a href="#">Terms</a>
          <a href="#">Status</a>
        </div>
      </footer>
    </>
  );
}
