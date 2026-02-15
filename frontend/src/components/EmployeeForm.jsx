import React, { useState, useEffect } from 'react';
import API from '../api';

const EmployeeForm = ({ selected, onSaved, onCancel }) => {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    department: '', 
    salary: '',
    taxId: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selected) {
      setForm({
        name: selected.name || '',
        email: selected.email || '',
        phone: selected.phone || '',
        department: selected.department || '',
        salary: String(selected.salary || ''),
        taxId: selected.taxId || ''
      });
    }
  }, [selected]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name || !form.email || !form.phone || !form.department || form.salary === '' || !form.taxId) {
      setError('All fields (including Tax ID) are required');
      return false;
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(form.email)) { 
      setError('Invalid email format'); 
      return false; 
    }
    if (isNaN(Number(form.salary)) || Number(form.salary) <= 0) { 
      setError('Salary must be a positive number'); 
      return false; 
    }
    if (!form.taxId.match(/^[A-Z0-9]{10}$/)) {
      setError('Tax ID must be 10 alphanumeric characters');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      if (selected && selected._id) {
        await API.put(`/employees/${selected._id}`, { 
          ...form, 
          salary: Number(form.salary) 
        });
      } else {
        await API.post('/employees', { 
          ...form, 
          salary: Number(form.salary) 
        });
      }
      setForm({ name: '', email: '', phone: '', department: '', salary: '', taxId: '' });
      onSaved();
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving employee');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({ name: '', email: '', phone: '', department: '', salary: '', taxId: '' });
    setError(null);
    if (onCancel) onCancel();
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ddd', padding: 16, borderRadius: 4 }}>
      <h3>{selected ? 'Edit Employee' : 'Add Employee'}</h3>
      {error && <div style={{ color: 'red', marginBottom: 12, padding: 8, backgroundColor: '#ffebee', borderRadius: 4 }}>{error}</div>}
      
      <div style={{ marginBottom: 12 }}>
        <label>Name *</label>
        <input 
          type="text" 
          name="name" 
          value={form.name} 
          onChange={handleChange} 
          placeholder="Full Name"
          style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 4, border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Email *</label>
        <input 
          type="email" 
          name="email" 
          value={form.email} 
          onChange={handleChange} 
          placeholder="email@example.com"
          style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 4, border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Phone *</label>
        <input 
          type="tel" 
          name="phone" 
          value={form.phone} 
          onChange={handleChange} 
          placeholder="Phone Number"
          style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 4, border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Department *</label>
        <select 
          name="department" 
          value={form.department} 
          onChange={handleChange}
          style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 4, border: '1px solid #ccc' }}
        >
          <option value="">Select Department</option>
          <option value="HR">HR</option>
          <option value="IT">IT</option>
          <option value="Finance">Finance</option>
          <option value="Sales">Sales</option>
          <option value="Operations">Operations</option>
        </select>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Base Salary *</label>
        <input 
          type="number" 
          name="salary" 
          value={form.salary} 
          onChange={handleChange} 
          placeholder="Base Salary"
          min="0"
          step="0.01"
          style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 4, border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Tax ID *</label>
        <input 
          type="text" 
          name="taxId" 
          value={form.taxId} 
          onChange={handleChange} 
          placeholder="10-char Tax ID (e.g., ABC1234XYZ)"
          maxLength="10"
          style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 4, border: '1px solid #ccc' }}
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        style={{ 
          width: '100%', 
          padding: 10, 
          backgroundColor: loading ? '#ccc' : '#4CAF50', 
          color: 'white', 
          border: 'none', 
          borderRadius: 4, 
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: 8
        }}
      >
        {loading ? 'Saving...' : (selected ? 'Update' : 'Add')}
      </button>

      {selected && (
        <button 
          type="button" 
          onClick={handleReset}
          style={{ 
            width: '100%', 
            padding: 10, 
            backgroundColor: '#999', 
            color: 'white', 
            border: 'none', 
            borderRadius: 4, 
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default EmployeeForm;
