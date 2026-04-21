import React, { useState, useEffect } from 'react';

export default function AdminUsersPage({ onNavigate }) {
  const [users, setUsers] = useState([]);
  const [toastMsg, setToastMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteForm, setInviteForm] = useState({ name: '', email: '', password: '', role: 'User' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users');
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch users', err);
      setLoading(false);
    }
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
      });
      if (res.ok) {
        setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
        showToast(`Role updated to ${newRole}`);
      }
    } catch (err) {
      console.error(err);
      showToast('Error updating role');
    }
  };

  const handleDelete = async (userId) => {
    if(!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setUsers(users.filter(u => u._id !== userId));
        showToast('User deleted');
      }
    } catch (err) {
      console.error(err);
      showToast('Error deleting user');
    }
  };
  const handleInvite = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inviteForm)
      });
      if (res.ok) {
        const newUser = await res.json();
        setUsers([newUser, ...users]);
        setShowInviteModal(false);
        setInviteForm({ name: '', email: '', password: '', role: 'User' });
        showToast('User invited successfully');
      } else {
        const err = await res.json();
        showToast(err.message || 'Error inviting user');
      }
    } catch (err) {
      console.error(err);
      showToast('Connection error');
    }
  };

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh', paddingBottom: '60px' }}>
      <div className="contracts-wrap" style={{ paddingTop: '40px' }}>
        
        <div className="ct-header">
          <div>
            <div className="ct-title">User Management</div>
            <div className="ct-sub">
              {users.length} total users &nbsp;·&nbsp; 
              Manage access levels and permissions
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button className="btn-primary-lg" onClick={() => setShowInviteModal(true)}>
              <span>+ Invite User</span>
            </button>
          </div>
        </div>

        <div className="ds-section" style={{ marginTop: '24px' }}>
          <div className="ct-thead" style={{ background: 'var(--cream2)', borderRadius: '8px 8px 0 0', border: '1px solid var(--line2)', borderBottom: 'none' }}>
            <div className="ct-th" style={{ paddingLeft: '24px' }}>Name & Email</div>
            <div className="ct-th">Joined Date</div>
            <div className="ct-th">System Role</div>
            <div className="ct-th" style={{ textAlign: 'right', paddingRight: '24px' }}>Actions</div>
          </div>

          <div style={{ background: 'white', border: '1px solid var(--line2)', borderRadius: '0 0 8px 8px' }}>
            {loading ? <div style={{padding: '24px'}}>Loading users...</div> : users.map((u, i) => (
              <div key={u._id} style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 150px 150px 100px', 
                alignItems: 'center',
                padding: '16px 24px',
                borderBottom: i === users.length - 1 ? 'none' : '1px solid var(--line)',
                gap: '16px'
              }}>
                <div>
                  <div style={{ fontWeight: '500', color: 'var(--ink)' }}>{u.name}</div>
                  <div style={{ fontSize: '13px', color: 'var(--faint)', marginTop: '2px' }}>{u.email}</div>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--muted)' }}>
                  {new Date(u.createdAt).toLocaleDateString()}
                </div>
                
                <div>
                  {u.role === 'Admin' && users.length === 1 ? (
                    <span className="stage-pill sp-blue" style={{ width: 'fit-content' }}>System Admin</span>
                  ) : (
                    <select 
                      value={u.role}
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: `1px solid ${u.role === 'Manager' ? 'var(--amber)' : 'var(--line)'}`,
                        background: u.role === 'Manager' ? 'var(--amber-pale)' : 'var(--cream2)',
                        color: u.role === 'Manager' ? 'var(--amber-dark)' : 'var(--ink)',
                        fontSize: '13px',
                        cursor: 'pointer',
                        fontWeight: '500'
                      }}
                    >
                      <option value="User">User</option>
                      <option value="Manager">Manager</option>
                      <option value="Admin">Admin</option>
                    </select>
                  )}
                </div>

                <div style={{ textAlign: 'right' }}>
                  <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => handleDelete(u._id)}>
                    Revoke
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div style={{ marginTop: '32px', background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid var(--line2)' }}>
          <h3 style={{ fontSize: '14px', marginBottom: '16px', color: 'var(--ink)' }}>Permission Levels</h3>
          <div style={{ display: 'flex', gap: '40px' }}>
            <div>
              <div style={{ fontWeight: '500', fontSize: '13px', color: 'var(--ink)' }}>User</div>
              <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px', maxWidth: '250px' }}>
                Default level for new signups. Can view contracts, add comments, and request new drafts. Cannot view dashboards or approve contracts.
              </div>
            </div>
            <div>
              <div style={{ fontWeight: '500', fontSize: '13px', color: 'var(--amber-dark)' }}>Manager</div>
              <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px', maxWidth: '250px' }}>
                Leadership level. Can view the analytics dashboard, review risks, and approve/reject active contracts in pipeline.
              </div>
            </div>
            <div>
              <div style={{ fontWeight: '500', fontSize: '13px', color: 'var(--blue)' }}>Admin</div>
              <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px', maxWidth: '250px' }}>
                Superuser. Has full access to all capabilities, plus the ability to promote/demote other users via this management portal.
              </div>
            </div>
          </div>
        </div>

      </div>

      {showInviteModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(26, 21, 16, 0.4)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{
            background: 'white', padding: '32px', borderRadius: '12px',
            width: '100%', maxWidth: '400px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '18px', marginBottom: '20px', color: 'var(--ink)' }}>Invite New User</h2>
            <form onSubmit={handleInvite}>
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">Full Name</label>
                <input 
                  required
                  className="form-input" 
                  value={inviteForm.name} 
                  onChange={e => setInviteForm({...inviteForm, name: e.target.value})} 
                  placeholder="e.g. John Doe" 
                />
              </div>
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">Email Address</label>
                <input 
                  required
                  type="email"
                  className="form-input" 
                  value={inviteForm.email} 
                  onChange={e => setInviteForm({...inviteForm, email: e.target.value})} 
                  placeholder="john@example.com" 
                />
              </div>
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">Temporary Password</label>
                <input 
                  required
                  type="password"
                  className="form-input" 
                  value={inviteForm.password} 
                  onChange={e => setInviteForm({...inviteForm, password: e.target.value})} 
                  placeholder="********" 
                />
              </div>
              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label className="form-label">Initial Role</label>
                <select 
                  className="form-input" 
                  value={inviteForm.role} 
                  onChange={e => setInviteForm({...inviteForm, role: e.target.value})}
                >
                  <option value="User">User</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={() => setShowInviteModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary-lg" style={{ flex: 2, padding: '10px' }}>
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
