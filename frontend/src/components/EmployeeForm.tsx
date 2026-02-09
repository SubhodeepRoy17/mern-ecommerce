import React, { useState, useEffect } from 'react';
import API from '../api';

type Props = {
  selected?: any;
  onSaved: () => void;
  onCancel?: () => void;
};

const EmployeeForm: React.FC<Props> = ({ selected, onSaved, onCancel }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', department: '', salary: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selected) {
      setForm({
        name: selected.name || '',
        email: selected.email || '',
        phone: selected.phone || '',
        department: selected.department || '',
        salary: String(selected.salary || '')
      });
    }
  }, [selected]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name || !form.email || !form.phone || !form.department || form.salary === '') {
      setError('All fields are required');
      return false;
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(form.email)) { setError('Invalid email'); return false; }
    if (isNaN(Number(form.salary))) { setError('Salary must be numeric'); return false; }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      if (selected && selected._id) {
        await API.put(`/employees/${selected._id}`, { ...form, salary: Number(form.salary) });
      } else {
        await API.post('/employees', { ...form, salary: Number(form.salary) });
      }
      onSaved();
      setForm({ name: '', email: '', phone: '', department: '', salary: '' });
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ddd', padding: 12, borderRadius: 6 }}>
      <div>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      </div>
      <div>
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      </div>
      <div>
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
      </div>
      <div>
        <input name="department" placeholder="Department" value={form.department} onChange={handleChange} />
      </div>
      <div>
        <input name="salary" placeholder="Salary" value={form.salary} onChange={handleChange} />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div style={{ marginTop: 8 }}>
        <button type="submit" disabled={loading}>{selected ? 'Update' : 'Add'}</button>
        {onCancel && <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>Cancel</button>}
      </div>
    </form>
  );
};

export default EmployeeForm;
