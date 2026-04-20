import React, { useState } from 'react';

export default function LoginPage({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    onNavigate('dashboard');
  };

  return (
    <div className="login-wrap">
      <div className="login-left">
        {/* Decorative Ruled Lines */}
        <div className="hero-rules">
          <div className="rule-h" style={{ top: '25%' }}></div>
          <div className="rule-h" style={{ top: '50%' }}></div>
          <div className="rule-h" style={{ top: '75%' }}></div>
        </div>
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '420px' }}>
          <div className="hero-eyebrow">
            <div className="eyebrow-tag">LexisCLM Portal</div>
            <div className="eyebrow-line"></div>
          </div>
          
          <h1 className="hero-headline" style={{ fontSize: 'clamp(44px, 5vw, 64px)'}}>
            Every deal,<br />
            <em>accounted for.</em><br />
            <span className="redline">Nothing</span><br />missed.
          </h1>
          
          <p className="hero-body" style={{ marginTop: '24px' }}>
            Trusted by GCs at companies managing $500M+ in annual contract value. Access your workspace.
          </p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-form-container">
          <div className="login-brand">
            <div className="brand-mark">
              <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="#F5F0E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="brand-name">Lexis<sup>CLM</sup></span>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Work Email</label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="you@company.com" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                className="form-input" 
                placeholder="••••••••" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
              <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input type="checkbox" style={{ accentColor: 'var(--ink)' }} />
                Remember me
              </label>
              <a href="#" style={{ fontSize: '12px', color: 'var(--ink)', fontWeight: '500', textDecoration: 'none' }}>Forgot password?</a>
            </div>

            <button type="submit" className="btn-primary-lg" style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}>
              <span>Sign in to Lexis</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '11px', color: 'var(--faint)' }}>
            Not using Lexis yet? <a href="#" style={{ color: 'var(--ink)', fontWeight: '500' }}>Request a demo</a>
          </div>
        </div>
      </div>
    </div>
  );
}
