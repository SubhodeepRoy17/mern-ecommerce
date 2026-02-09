import React, { useEffect, useState } from 'react';
import './App.css';
import API from './api';
import EmployeeForm from './components/EmployeeForm';
import EmployeeTable from './components/EmployeeTable';

function App() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);

  const load = async () => {
    try {
      const res = await API.get('/employees');
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to load employees');
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2>Employee Management</h2>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: '0 0 320px' }}>
          <EmployeeForm selected={selected} onSaved={() => { setSelected(null); load(); }} onCancel={() => setSelected(null)} />
        </div>
        <div style={{ flex: 1 }}>
          <EmployeeTable employees={employees} onEdit={(e) => setSelected(e)} onRefresh={load} />
        </div>
      </div>
    </div>
  );
}

export default App;
