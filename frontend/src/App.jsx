import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

// import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import IncidentForm from './pages/IncidentForm';

function App() {
  const [view, setView] = useState('dashboard');

  return (
    <div>
      <nav className="bg-slate-800 text-white p-4 flex justify-between">
        <span className="font-bold text-lg">Smart Incident Platform</span>
        <div>
          <button onClick={() => setView('dashboard')} className="mr-4 hover:text-gray-300">Dashboard</button>
          <button onClick={() => setView('form')} className="hover:text-gray-300">Report Incident</button>
        </div>
      </nav>
      {view === 'dashboard' ? <Dashboard /> : <IncidentForm />}
    </div>
  );
}

export default App;