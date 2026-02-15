import React, { useState, useEffect } from 'react';
import API from '../api';

const PayrollDisplay = ({ employee, onBack }) => {
  const [payroll, setPayroll] = useState(null);
  const [loading, setLoading] = useState(false);
  const [calculating, setCalculating] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    loadPayroll();
  }, [employee._id]);

  const loadPayroll = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/payroll/${employee._id}`);
      setPayroll(res.data);
      setError(null);
    } catch (err) {
      if (err.response?.status !== 404) {
        setError('Failed to load payroll data');
      }
      setPayroll(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCalculatePayroll = async () => {
    setCalculating(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await API.post('/payroll/calculate', {
        employeeId: employee._id,
        month: new Date().toISOString().slice(0, 7) // YYYY-MM format
      });
      setPayroll(res.data);
      setSuccess('Payroll calculated successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to calculate payroll');
    } finally {
      setCalculating(false);
    }
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: 16, borderRadius: 4, backgroundColor: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2>Payroll Details - {employee.name}</h2>
        <button 
          onClick={onBack}
          style={{
            padding: '8px 16px',
            backgroundColor: '#999',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer'
          }}
        >
          Back
        </button>
      </div>

      {error && <div style={{ color: 'red', marginBottom: 12, padding: 8, backgroundColor: '#ffebee', borderRadius: 4 }}>{error}</div>}
      {success && <div style={{ color: 'green', marginBottom: 12, padding: 8, backgroundColor: '#e8f5e9', borderRadius: 4 }}>{success}</div>}

      <div style={{ marginBottom: 16, padding: 12, backgroundColor: '#f5f5f5', borderRadius: 4 }}>
        <p><strong>Employee ID:</strong> {employee._id}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Tax ID:</strong> {employee.taxId || 'N/A'}</p>
        <p><strong>Base Salary:</strong> ₹{employee.salary?.toFixed(2) || '0.00'}</p>
      </div>

      <button 
        onClick={handleCalculatePayroll}
        disabled={calculating}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: calculating ? '#ccc' : '#2196F3',
          color: 'white',
          border: 'none',
          borderRadius: 4,
          cursor: calculating ? 'not-allowed' : 'pointer',
          marginBottom: 16,
          fontWeight: 'bold'
        }}
      >
        {calculating ? 'Calculating Payroll...' : 'Calculate Payroll for Current Month'}
      </button>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#999' }}>Loading payroll data...</p>
      ) : payroll ? (
        <div style={{ border: '2px solid #4CAF50', padding: 16, borderRadius: 4, backgroundColor: '#f0f8f0' }}>
          <h3 style={{ marginTop: 0, color: '#4CAF50' }}>Salary Breakdown</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: 8, fontWeight: 'bold' }}>Gross Salary</td>
                <td style={{ padding: 8, textAlign: 'right' }}>₹{payroll.grossSalary?.toFixed(2) || '0.00'}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: 8 }}>Basic Salary</td>
                <td style={{ padding: 8, textAlign: 'right' }}>₹{payroll.basicSalary?.toFixed(2) || '0.00'}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: 8 }}>HRA (12%)</td>
                <td style={{ padding: 8, textAlign: 'right' }}>₹{payroll.hra?.toFixed(2) || '0.00'}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: 8 }}>Dearness Allowance (8%)</td>
                <td style={{ padding: 8, textAlign: 'right' }}>₹{payroll.da?.toFixed(2) || '0.00'}</td>
              </tr>
              <tr style={{ borderBottom: '2px solid #ff6b6b' }}>
                <td style={{ padding: 8, fontWeight: 'bold', color: '#d32f2f' }}>Total Deductions</td>
                <td style={{ padding: 8, textAlign: 'right', fontWeight: 'bold', color: '#d32f2f' }}>₹{payroll.deductions?.toFixed(2) || '0.00'}</td>
              </tr>
              <tr style={{ backgroundColor: '#e8f5e9' }}>
                <td style={{ padding: 8, fontWeight: 'bold', color: '#4CAF50', fontSize: '16px' }}>Net Salary</td>
                <td style={{ padding: 8, textAlign: 'right', fontWeight: 'bold', color: '#4CAF50', fontSize: '16px' }}>₹{payroll.netSalary?.toFixed(2) || '0.00'}</td>
              </tr>
            </tbody>
          </table>
          {payroll.month && (
            <p style={{ marginTop: 12, fontSize: '12px', color: '#999' }}>
              <strong>Calculation Month:</strong> {payroll.month}
            </p>
          )}
        </div>
      ) : (
        <p style={{ textAlign: 'center', color: '#999', padding: 16, backgroundColor: '#f9f9f9', borderRadius: 4 }}>
          No payroll data available. Click "Calculate Payroll" to generate salary breakdown.
        </p>
      )}
    </div>
  );
};

export default PayrollDisplay;
