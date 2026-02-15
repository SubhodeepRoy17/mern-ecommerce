import React from 'react';
import API from '../api';

const EmployeeTable = ({ employees, onEdit, onRefresh }) => {
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this employee?')) return;
    try {
      await API.delete(`/employees/${id}`);
      onRefresh();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleViewPayroll = (emp) => {
    onEdit(emp, 'payroll');
  };

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ padding: '8px', border: '1px solid #ccc', textAlign: 'left', backgroundColor: '#f5f5f5' }}>Name</th>
          <th style={{ padding: '8px', border: '1px solid #ccc', textAlign: 'left', backgroundColor: '#f5f5f5' }}>Email</th>
          <th style={{ padding: '8px', border: '1px solid #ccc', textAlign: 'left', backgroundColor: '#f5f5f5' }}>Phone</th>
          <th style={{ padding: '8px', border: '1px solid #ccc', textAlign: 'left', backgroundColor: '#f5f5f5' }}>Department</th>
          <th style={{ padding: '8px', border: '1px solid #ccc', textAlign: 'left', backgroundColor: '#f5f5f5' }}>Salary</th>
          <th style={{ padding: '8px', border: '1px solid #ccc', textAlign: 'left', backgroundColor: '#f5f5f5' }}>Tax ID</th>
          <th style={{ padding: '8px', border: '1px solid #ccc', textAlign: 'left', backgroundColor: '#f5f5f5' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(emp => (
          <tr key={emp._id} style={{ borderBottom: '1px solid #ddd' }}>
            <td style={{ padding: '8px', border: '1px solid #ccc' }}>{emp.name}</td>
            <td style={{ padding: '8px', border: '1px solid #ccc' }}>{emp.email}</td>
            <td style={{ padding: '8px', border: '1px solid #ccc' }}>{emp.phone}</td>
            <td style={{ padding: '8px', border: '1px solid #ccc' }}>{emp.department}</td>
            <td style={{ padding: '8px', border: '1px solid #ccc' }}>₹{emp.salary?.toFixed(2) || '0.00'}</td>
            <td style={{ padding: '8px', border: '1px solid #ccc' }}>{emp.taxId || '-'}</td>
            <td style={{ padding: '8px', border: '1px solid #ccc' }}>
              <button 
                onClick={() => onEdit(emp)} 
                style={{ padding: '4px 8px', marginRight: '4px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}
              >
                Edit
              </button>
              <button 
                onClick={() => handleViewPayroll(emp)}
                style={{ padding: '4px 8px', marginRight: '4px', backgroundColor: '#2196F3', color: 'white', border: 'none', cursor: 'pointer' }}
              >
                Payroll
              </button>
              <button 
                onClick={() => handleDelete(emp._id)}
                style={{ padding: '4px 8px', backgroundColor: '#f44336', color: 'white', border: 'none', cursor: 'pointer' }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
