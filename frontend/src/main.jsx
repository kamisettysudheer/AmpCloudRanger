import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Dashboard from './Dashboard.jsx';
import BillingCostExplorer from './BillingCostExplorer.jsx';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <nav style={{ padding: 16, background: '#f3f4f6'}}>
        <Link to="/" style={{ marginRight: 16 }}>Home</Link>
        <Link to="/dashboard" style={{ marginRight: 16 }}>Dashboard</Link>
        <Link to="/billing-cost-explorer">AWS Billing Cost Explorer</Link>
      </nav>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/billing-cost-explorer" element={<BillingCostExplorer />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
