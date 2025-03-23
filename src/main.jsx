import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import App from './App.jsx';
import Transactions from './components/Transactions.jsx';
import Visualizations from './components/Visualizations.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='transactions' element={<Transactions />} />
        <Route path='visualizations' element={<Visualizations />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
