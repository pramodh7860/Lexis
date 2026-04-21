import React from 'react';

export default function Navbar({ activePage, onNavigate, userRole, setUserRole, currentUser, setCurrentUser }) {
  return (
    <nav className="nav-top">
      <a className="nav-brand" href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
        <div className="brand-mark">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M7 2l5 5-5 5" stroke="#F5F0E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="brand-name">Lexis<sup>CLM</sup></span>
      </a>

      <ul className="nav-links">
        <li>
          <a
            onClick={() => onNavigate('home')}
            className={activePage === 'home' ? 'active-link' : ''}
          >
            Platform
          </a>
        </li>
        {currentUser && (
          <>
            <li>
              <a
                onClick={() => onNavigate('contracts')}
                className={activePage === 'contracts' ? 'active-link' : ''}
              >
                Contracts
              </a>
            </li>
            {currentUser.role !== 'User' && (
              <li>
                <a
                  onClick={() => onNavigate('dashboard')}
                  className={activePage === 'dashboard' ? 'active-link' : ''}
                >
                  Dashboard
                </a>
              </li>
            )}
            {(currentUser.role === 'Admin' || currentUser.role === 'Manager') && (
              <li>
                <a
                  onClick={() => onNavigate('teams')}
                  className={activePage === 'teams' ? 'active-link' : ''}
                >
                  Teams
                </a>
              </li>
            )}
            {currentUser.role === 'Admin' && (
              <li>
                <a
                  onClick={() => onNavigate('admin-users')}
                  className={activePage === 'admin-users' ? 'active-link' : ''}
                >
                  Users
                </a>
              </li>
            )}
          </>
        )}
      </ul>

      <div className="nav-right">
        {currentUser && (
          <div className="nav-alert">
            <div className="alert-blink"></div>
            3 critical
          </div>
        )}

        {currentUser ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--ink)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '500' }}>
              {currentUser.name.charAt(0)}
            </div>
            <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => { localStorage.removeItem('lexis_user'); setCurrentUser(null); onNavigate('home'); }}>
              Log out
            </button>
          </div>
        ) : (
          <button className="btn-ink" onClick={() => onNavigate('login')}>Login</button>
        )}
      </div>
    </nav>
  );
}
