import React, { useState, useEffect } from 'react';

export default function TeamsPage({ currentUser }) {
  const [departments, setDepartments] = useState([
    { name: 'Legal', lead: 'Sarah Jenkins', members: 4, contracts: 12, health: 'green' },
    { name: 'Finance', lead: 'Michael Chen', members: 3, contracts: 8, health: 'amber' },
    { name: 'Procurement', lead: 'Elena Rodriguez', members: 6, contracts: 24, health: 'green' },
    { name: 'Sales', lead: 'James Wilson', members: 12, contracts: 45, health: 'red' },
  ]);

  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then(res => res.json())
      .then(data => {
        setTeamMembers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh', padding: '40px 48px' }}>
      <div className="ct-header" style={{ marginBottom: '32px' }}>
        <div>
          <div className="ct-title">Team Intelligence</div>
          <div className="ct-sub">Collaborative oversight across organizational departments.</div>
        </div>
        <button className="btn-ink">+ Add Department</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
        {departments.map((dept, i) => (
          <div key={i} style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid var(--line2)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: `var(--${dept.health})` }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ fontSize: '18px', fontWeight: '600', color: 'var(--ink)' }}>{dept.name}</div>
              <span className={`stage-pill sp-${dept.health}`} style={{ fontSize: '10px' }}>{dept.health === 'green' ? 'On Track' : dept.health === 'amber' ? 'Attention' : 'Overloaded'}</span>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', color: 'var(--faint)', marginBottom: '4px' }}>Department Lead</div>
              <div style={{ fontSize: '14px', color: 'var(--ink)' }}>{dept.lead}</div>
            </div>
            <div style={{ display: 'flex', gap: '24px' }}>
              <div>
                <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--ink)' }}>{dept.members}</div>
                <div style={{ fontSize: '11px', color: 'var(--faint)', textTransform: 'uppercase' }}>Members</div>
              </div>
              <div>
                <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--ink)' }}>{dept.contracts}</div>
                <div style={{ fontSize: '11px', color: 'var(--faint)', textTransform: 'uppercase' }}>Contracts</div>
              </div>
            </div>
            <button className="btn-secondary" style={{ width: '100%', marginTop: '24px', fontSize: '12px' }}>View Workspace</button>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        {/* MEMBER DIRECTORY */}
        <div style={{ background: 'white', borderRadius: '8px', border: '1px solid var(--line2)', overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '600' }}>Member Directory</h3>
            <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{teamMembers.length} Active Users</span>
          </div>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {loading ? <div style={{padding: '24px'}}>Loading directory...</div> : teamMembers.map((member, i) => (
              <div key={member._id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 100px', padding: '16px 24px', borderBottom: i === teamMembers.length - 1 ? 'none' : '1px solid var(--line)', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--ink)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '600' }}>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--ink)' }}>{member.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--faint)' }}>{member.email}</div>
                  </div>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--muted)' }}>
                  {['Legal', 'Finance', 'Sales', 'Product'][Math.floor(Math.random() * 4)]}
                </div>
                <div>
                  <span className={`stage-pill sp-${member.role === 'Admin' ? 'red' : member.role === 'Manager' ? 'amber' : 'blue'}`} style={{ fontSize: '10px' }}>
                    {member.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT TEAM ACTIVITY */}
        <div style={{ background: 'white', borderRadius: '8px', border: '1px solid var(--line2)', padding: '24px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>Global Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { user: 'Sarah J.', action: 'approved', target: 'Meridian MSA', time: '12m ago', color: 'green' },
              { user: 'Michael C.', action: 'flagged', target: 'Vendor SOW', time: '45m ago', color: 'red' },
              { user: 'System', action: 'auto-archived', target: 'Old NDA 2023', time: '2h ago', color: 'blue' },
              { user: 'Elena R.', action: 'uploaded', target: 'TechCorp v2', time: '4h ago', color: 'amber' },
            ].map((act, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', fontSize: '13px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: `var(--${act.color})`, marginTop: '4px', flexShrink: 0 }}></div>
                <div>
                  <span style={{ fontWeight: '600', color: 'var(--ink)' }}>{act.user}</span>{' '}
                  <span style={{ color: 'var(--muted)' }}>{act.action}</span>{' '}
                  <span style={{ fontWeight: '500', color: 'var(--ink)' }}>{act.target}</span>
                  <div style={{ fontSize: '11px', color: 'var(--faint)', marginTop: '2px' }}>{act.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
