import React, { useState } from 'react';

export default function LoginPage({ onNavigate, setCurrentUser, userRole, setUserRole }) {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        const res = await fetch('http://localhost:5000/api/users/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name || 'New User', email, password })
        });
        const data = await res.json();
        if (!res.ok) return alert(data.message);
        
        setUserRole(data.role);
        setCurrentUser(data);
        onNavigate('dashboard');
      } else {
        const res = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (!res.ok) return alert(data.message);
        
        setUserRole(data.role);
        setCurrentUser(data);
        onNavigate('dashboard');
      }
    } catch (err) {
      console.error(err);
      alert('Network error during authentication');
    }
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
            {isSignup && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Jane Doe" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
            )}
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

            {!isSignup && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <input type="checkbox" style={{ accentColor: 'var(--ink)' }} />
                  Remember me
                </label>
                <a href="#" style={{ fontSize: '12px', color: 'var(--ink)', fontWeight: '500', textDecoration: 'none' }}>Forgot password?</a>
              </div>
            )}

            <button type="submit" className="btn-primary-lg" style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}>
              <span>{isSignup ? "Create Lexis Account" : "Sign in to Lexis"}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '11px', color: 'var(--faint)' }}>
            {isSignup ? (
              <>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setIsSignup(false); }} style={{ color: 'var(--ink)', fontWeight: '500', cursor: 'pointer' }}>Sign In here</a></>
            ) : (
              <>Not using Lexis yet? <a href="#" onClick={(e) => { e.preventDefault(); setIsSignup(true); }} style={{ color: 'var(--ink)', fontWeight: '500', cursor: 'pointer' }}>Create an Account</a></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
