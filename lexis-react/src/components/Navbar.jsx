import React from 'react';

export default function Navbar({ activePage, onNavigate }) {
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
        <li>
          <a
            onClick={() => onNavigate('contracts')}
            className={activePage === 'contracts' ? 'active-link' : ''}
          >
            Contracts
          </a>
        </li>
        <li>
          <a
            onClick={() => onNavigate('dashboard')}
            className={activePage === 'dashboard' ? 'active-link' : ''}
          >
            Dashboard
          </a>
        </li>
        <li><a href="#">Pricing</a></li>
        <li><a href="#">Docs</a></li>
      </ul>

      <div className="nav-right">
        <div className="nav-alert">
          <div className="alert-blink"></div>
          3 critical
        </div>
        <button className="btn-ink" onClick={() => onNavigate('dashboard')}>Open app</button>
      </div>
    </nav>
  );
}
