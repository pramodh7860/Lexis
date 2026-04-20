import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import DashboardPage from './components/DashboardPage';
import ContractsPage from './components/ContractsPage';
import ContractDetailPage from './components/ContractDetailPage';
import NewContractPage from './components/NewContractPage';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [contractId, setContractId] = useState(null);

  const handleNavigate = (page, data) => {
    if (page === 'contract-detail') {
      setActivePage('contract-detail');
      setContractId(data || 'techcorp');
    } else if (page === 'new-contract') {
      setActivePage('new-contract');
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
      <Navbar activePage={navPage} onNavigate={handleNavigate} />

      <div className={`page ${activePage === 'home' ? 'active' : ''}`}>
        {activePage === 'home' && <HomePage onNavigate={handleNavigate} />}
      </div>

      <div className={`page ${activePage === 'dashboard' ? 'active' : ''}`}>
        {activePage === 'dashboard' && <DashboardPage onNavigate={handleNavigate} />}
      </div>

      <div className={`page ${activePage === 'contracts' ? 'active' : ''}`}>
        {activePage === 'contracts' && <ContractsPage onNavigate={handleNavigate} />}
      </div>

      <div className={`page ${activePage === 'contract-detail' ? 'active' : ''}`}>
        {activePage === 'contract-detail' && <ContractDetailPage contractId={contractId} onNavigate={handleNavigate} />}
      </div>

      <div className={`page ${activePage === 'new-contract' ? 'active' : ''}`}>
        {activePage === 'new-contract' && <NewContractPage onNavigate={handleNavigate} />}
      </div>
    </>
  );
}
