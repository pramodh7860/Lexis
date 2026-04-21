import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import DashboardPage from './components/DashboardPage';
import ContractsPage from './components/ContractsPage';
import ContractDetailPage from './components/ContractDetailPage';
import NewContractPage from './components/NewContractPage';
import LoginPage from './components/LoginPage';
import AdminUsersPage from './components/AdminUsersPage';
import TeamsPage from './components/TeamsPage';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [contractId, setContractId] = useState(null);
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('lexis_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [userRole, setUserRole] = useState(() => {
    const saved = localStorage.getItem('lexis_user');
    return saved ? JSON.parse(saved).role : 'Admin';
  });

  const handleNavigate = (page, data) => {
    if (page === 'contract-detail') {
      setActivePage('contract-detail');
      setContractId(data || 'techcorp');
    } else if (page === 'new-contract') {
      setActivePage('new-contract');
    } else if (page === 'login') {
      setActivePage('login');
    } else {
      setActivePage(page);
      setContractId(null);
    }
    window.scrollTo(0, 0);
  };

  // Map page names to nav highlight
  const navPage = activePage === 'contract-detail' || activePage === 'new-contract' ? 'contracts' : activePage;

  return (
    <>
      <Navbar 
        activePage={navPage} 
        onNavigate={handleNavigate} 
        userRole={userRole} 
        setUserRole={setUserRole} 
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />

      <div className={`page ${activePage === 'home' ? 'active' : ''}`}>
        {activePage === 'home' && <HomePage onNavigate={handleNavigate} />}
      </div>

      <div className={`page ${activePage === 'dashboard' ? 'active' : ''}`}>
        {activePage === 'dashboard' && (
          !currentUser ? (
            <div style={{ padding: '80px', textAlign: 'center', color: 'var(--muted)', height: '100vh', background: 'var(--cream)' }}>
              <h2 style={{ color: 'var(--ink)' }}>Login Required</h2>
              <p>Please log in to view this page.</p>
              <button className="btn-ink" style={{ marginTop: '24px' }} onClick={() => handleNavigate('login')}>Log in</button>
            </div>
          ) : currentUser.role === 'User' ? (
            <div style={{ padding: '80px', textAlign: 'center', color: 'var(--muted)', height: '100vh', background: 'var(--cream)' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔒</div>
              <h2 style={{ color: 'var(--ink)' }}>Access Denied</h2>
              <p>You do not have permission to view the executive dashboard.</p>
              <button className="btn-secondary" style={{ marginTop: '24px' }} onClick={() => handleNavigate('contracts')}>
                Back to Contracts
              </button>
            </div>
          ) : (
            <DashboardPage onNavigate={handleNavigate} currentUser={currentUser} />
          )
        )}
      </div>

      <div className={`page ${activePage === 'contracts' ? 'active' : ''}`}>
        {activePage === 'contracts' && (
          !currentUser ? (
             <div style={{ padding: '80px', textAlign: 'center', color: 'var(--muted)', height: '100vh', background: 'var(--cream)' }}>
              <h2 style={{ color: 'var(--ink)' }}>Login Required</h2>
              <button className="btn-ink" style={{ marginTop: '24px' }} onClick={() => handleNavigate('login')}>Log in</button>
            </div>
          ) : (
            <ContractsPage onNavigate={handleNavigate} currentUser={currentUser} />
          )
        )}
      </div>

      <div className={`page ${activePage === 'contract-detail' ? 'active' : ''}`}>
        {activePage === 'contract-detail' && (
          !currentUser ? null : <ContractDetailPage contractId={contractId} onNavigate={handleNavigate} userRole={currentUser.role} />
        )}
      </div>

      <div className={`page ${activePage === 'new-contract' ? 'active' : ''}`}>
        {activePage === 'new-contract' && (
          !currentUser ? null : <NewContractPage onNavigate={handleNavigate} currentUser={currentUser} />
        )}
      </div>

      <div className={`page ${activePage === 'admin-users' ? 'active' : ''}`}>
        {activePage === 'admin-users' && (
          !currentUser ? null : currentUser.role === 'Admin' ? (
            <AdminUsersPage onNavigate={handleNavigate} />
          ) : (
            <div style={{ padding: '80px', textAlign: 'center', color: 'var(--muted)', height: '100vh', background: 'var(--cream)' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔒</div>
              <h2 style={{ color: 'var(--ink)' }}>Access Denied</h2>
              <p>Only System Administrators can access user management.</p>
              <button className="btn-secondary" style={{ marginTop: '24px' }} onClick={() => handleNavigate('contracts')}>
                Back to Contracts
              </button>
            </div>
          )
        )}
      </div>

      <div className={`page ${activePage === 'login' ? 'active' : ''}`}>
        {activePage === 'teams' && (
          !currentUser ? null : <TeamsPage currentUser={currentUser} />
        )}

        {activePage === 'login' && <LoginPage onNavigate={handleNavigate} setCurrentUser={setCurrentUser} userRole={userRole} setUserRole={setUserRole} />}
      </div>
    </>
  );
}
