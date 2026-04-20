import React from 'react';

export function TemplatesView() {
  return (
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '500', color: 'var(--ink)' }}>Template Library</h2>
          <p style={{ color: 'var(--muted)', marginTop: '4px' }}>Standardized pre-approved contract templates.</p>
        </div>
        <button className="btn-ink">+ Create Template</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {[
          { name: 'Mutual Non-Disclosure (Standard)', type: 'NDA', uses: 124, lastUpdated: 'Mar 12, 2026' },
          { name: 'Master Service Agreement v3', type: 'MSA', uses: 89, lastUpdated: 'Jan 05, 2026' },
          { name: 'Vendor Procurement Contract', type: 'Procurement', uses: 42, lastUpdated: 'Feb 22, 2026' },
          { name: 'Independent Contractor Agreement', type: 'Employment', uses: 215, lastUpdated: 'Apr 01, 2026' },
          { name: 'Software Licensing SaaS', type: 'License', uses: 16, lastUpdated: 'Apr 10, 2026' },
        ].map((t, idx) => (
          <div key={idx} style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid var(--line2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span className="stage-pill sp-blue">{t.type}</span>
              <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Used {t.uses} times</span>
            </div>
            <div style={{ fontSize: '16px', fontWeight: '500', color: 'var(--ink)', marginBottom: '8px' }}>{t.name}</div>
            <div style={{ fontSize: '12px', color: 'var(--faint)' }}>Updated {t.lastUpdated}</div>
            <div style={{ marginTop: '16px', borderTop: '1px solid var(--line)', paddingTop: '12px', display: 'flex', gap: '12px' }}>
              <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>Edit</button>
              <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>Use it</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CounterpartiesView() {
  return (
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '500', color: 'var(--ink)' }}>Counterparties Index</h2>
          <p style={{ color: 'var(--muted)', marginTop: '4px' }}>Manage metadata for active client & vendor organizations.</p>
        </div>
        <button className="btn-ink">+ Add Counterparty</button>
      </div>

      <div style={{ background: 'white', borderRadius: '8px', border: '1px solid var(--line2)', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '12px 24px', background: 'var(--cream2)', borderBottom: '1px solid var(--line)', fontSize: '11px', color: 'var(--faint)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <div>Organization Name</div>
          <div>Active Contracts</div>
          <div>Total Value</div>
          <div>Primary Relation</div>
        </div>
        {[
          { name: 'TechCorp Inc.', count: 3, val: '$850,000', rep: 'Priya Sharma' },
          { name: 'NovaCorp Global', count: 1, val: '$80,000', rep: 'Raj Kumar' },
          { name: 'Meridian Systems', count: 4, val: '$1.2M', rep: 'Priya Sharma' },
          { name: 'Orbit Labs', count: 1, val: '$22,000', rep: 'Jane Doe' },
          { name: 'Stealth Co.', count: 2, val: 'Pending', rep: 'Arjun Kumar' },
        ].map((c, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '16px 24px', borderBottom: '1px solid var(--line)', alignItems: 'center', fontSize: '13px' }}>
            <div style={{ fontWeight: '500', color: 'var(--ink)' }}>{c.name}</div>
            <div style={{ color: 'var(--muted)' }}>{c.count} items</div>
            <div style={{ color: 'var(--amber-dark)' }}>{c.val}</div>
            <div style={{ color: 'var(--ink)' }}>{c.rep}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ObligationsView() {
  return (
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '500', color: 'var(--ink)' }}>Obligation Tracking</h2>
          <p style={{ color: 'var(--muted)', marginTop: '4px' }}>AI-extracted deliverables and post-signature SLA milestones.</p>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '8px', border: '1px solid var(--line2)', padding: '24px' }}>
        {[
          { title: 'Provide SOC 2 Type II Audit Report', contract: 'Meridian SaaS License', due: 'May 15, 2026', status: 'Pending' },
          { title: 'Quarterly True-Up Payment', contract: 'TechCorp MSA', due: 'Jun 01, 2026', status: 'Pending' },
          { title: 'Data Deletion Certification', contract: 'Orbit Labs NDA', due: 'Apr 30, 2026', status: 'At Risk' },
          { title: 'Q1 Partnership Royalties', contract: 'Stealth Co. Agreement', due: 'Mar 31, 2026', status: 'Completed' },
        ].map((o, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderBottom: i === 3 ? 'none' : '1px solid var(--line)' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--ink)', marginBottom: '4px' }}>{o.title}</div>
              <div style={{ fontSize: '12px', color: 'var(--muted)' }}>From: {o.contract}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '13px', color: 'var(--ink)', marginBottom: '4px' }}>Due: {o.due}</div>
              <span className={`stage-pill ${o.status === 'Completed' ? 'sp-blue' : o.status === 'At Risk' ? 'sp-red' : 'sp-amber'}`}>{o.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AnalyticsView() {
  return (
    <div style={{ padding: '32px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '500', color: 'var(--ink)' }}>Lifecycle Analytics</h2>
        <p style={{ color: 'var(--muted)', marginTop: '4px' }}>Negotiation bottlenecks and volume throughput.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid var(--line2)' }}>
          <h3 style={{ fontSize: '14px', marginBottom: '24px', color: 'var(--ink)' }}>Average Time to Signature</h3>
          <div style={{ fontSize: '48px', color: 'var(--ink)', fontFamily: 'var(--f-serif)', marginBottom: '8px' }}>14.2 <span style={{fontSize: '16px', fontFamily: 'var(--f-sans)', color: 'var(--muted)'}}>days</span></div>
          <div style={{ fontSize: '13px', color: 'var(--green)' }}>↓ 2.1 days faster than last quarter</div>
          
          <div style={{ marginTop: '24px' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px', color: 'var(--faint)' }}>
               <span>Drafting (2d)</span><span>Internal Review (4d)</span><span>Counterparty (6d)</span><span>Sign (2d)</span>
             </div>
             <div style={{ display: 'flex', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
               <div style={{ flex: 2, background: 'var(--blue)' }}></div>
               <div style={{ flex: 4, background: 'var(--amber)' }}></div>
               <div style={{ flex: 6, background: 'var(--red)' }}></div>
               <div style={{ flex: 2, background: 'var(--green)' }}></div>
             </div>
          </div>
        </div>

        <div style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid var(--line2)' }}>
          <h3 style={{ fontSize: '14px', marginBottom: '24px', color: 'var(--ink)' }}>Contract Volume by Type</h3>
          {[
            { label: 'MSA', pct: '45%', color: 'var(--ink)' },
            { label: 'NDA', pct: '25%', color: 'var(--blue)' },
            { label: 'SaaS License', pct: '15%', color: 'var(--amber)' },
            { label: 'Employment', pct: '15%', color: 'var(--muted)' },
          ].map((v, i) => (
             <div key={i} style={{ marginBottom: '16px' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                 <span style={{ color: 'var(--ink)' }}>{v.label}</span>
                 <span style={{ color: 'var(--muted)' }}>{v.pct}</span>
               </div>
               <div style={{ width: '100%', height: '4px', background: 'var(--cream2)', borderRadius: '2px' }}>
                 <div style={{ width: v.pct, height: '100%', background: v.color, borderRadius: '2px' }}></div>
               </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AuditLogView() {
  return (
    <div style={{ padding: '32px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '500', color: 'var(--ink)' }}>System Audit Log</h2>
        <p style={{ color: 'var(--muted)', marginTop: '4px' }}>Immutable record of all platform access and actions.</p>
      </div>

      <div style={{ background: 'white', borderRadius: '8px', border: '1px solid var(--line2)' }}>
        {[
          { time: 'Today 14:32:01', action: 'User login success', ip: '192.168.1.42', user: 'Admin' },
          { time: 'Today 14:15:22', action: 'Modified Role for Jane Doe', ip: '192.168.1.42', user: 'Admin' },
          { time: 'Today 13:02:11', action: 'Created record TechCorp MSA.pdf', ip: '10.0.4.11', user: 'Priya Sharma' },
          { time: 'Yesterday 18:45:00', action: 'Failed login attempt', ip: '14.22.41.99', user: 'SYSTEM' },
          { time: 'Yesterday 15:20:10', action: 'Exported Analytics CSV', ip: '10.0.4.45', user: 'Arjun Kumar' },
          { time: 'Yesterday 09:12:05', action: 'Signed NDA - Orbit Labs', ip: '10.0.4.45', user: 'Arjun Kumar' },
        ].map((log, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '150px 1fr 120px 150px', padding: '12px 24px', borderBottom: i === 5 ? 'none' : '1px solid var(--line)', fontSize: '13px', alignItems: 'center' }}>
            <div style={{ color: 'var(--muted)', fontFamily: 'var(--f-mono)', fontSize: '11px' }}>{log.time}</div>
            <div style={{ color: 'var(--ink)' }}>{log.action}</div>
            <div style={{ color: 'var(--faint)', fontFamily: 'var(--f-mono)', fontSize: '11px' }}>{log.ip}</div>
            <div style={{ color: 'var(--ink)' }}>{log.user}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
