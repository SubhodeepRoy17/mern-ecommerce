import React, { useEffect, useState } from 'react';
import './App.css';
import API from './api';
import EmployeeForm from './components/EmployeeForm';
import EmployeeTable from './components/EmployeeTable';
import PayrollDisplay from './components/PayrollDisplay';

function App() {
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedView, setSelectedView] = useState('list');

  const loadEmployees = async () => {
    try {
      const res = await API.get('/employees');
      setEmployees(res.data);
    } catch (err) {
      console.error('Error loading employees:', err);
      alert('Failed to load employees');
    }
  };

  useEffect(() => { 
    loadEmployees(); 
  }, []);

  const handleEditEmployee = (employee, view = 'edit') => {
    setSelected(employee);
    setSelectedView(view);
  };

  const handleCancelEdit = () => {
    setSelected(null);
    setSelectedView('list');
    loadEmployees();
  };

  const handleSave = () => {
    setSelected(null);
    setSelectedView('list');
    loadEmployees();
  };

  return (
    <div style={{ padding: 24, fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: 24, color: '#333' }}>💼 Payroll Management System</h1>
      
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <button 
          onClick={() => setSelectedView('list')}
          style={{
            padding: '10px 20px',
            backgroundColor: selectedView === 'list' ? '#4CAF50' : '#ddd',
            color: selectedView === 'list' ? 'white' : 'black',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Employee List
        </button>
        <button 
          onClick={() => { setSelected(null); setSelectedView('add'); }}
          style={{
            padding: '10px 20px',
            backgroundColor: selectedView === 'add' ? '#4CAF50' : '#ddd',
            color: selectedView === 'add' ? 'white' : 'black',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Add Employee
        </button>
      </div>

      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: '0 0 340px' }}>
          {(selectedView === 'add' || selectedView === 'edit') && (
            <EmployeeForm 
              selected={selectedView === 'edit' ? selected : null}
              onSaved={handleSave}
              onCancel={handleCancelEdit}
            />
          )}
        </div>

        <div style={{ flex: 1 }}>
          {selectedView === 'list' && (
            <>
              <h2>Employees</h2>
              <EmployeeTable 
                employees={employees}
                onEdit={handleEditEmployee}
                onRefresh={loadEmployees}
              />
            </>
          )}
          
          {selectedView === 'payroll' && selected && (
            <PayrollDisplay 
              employee={selected} 
              onBack={handleCancelEdit}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
