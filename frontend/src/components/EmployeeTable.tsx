import React from 'react';
import API from '../api';

type Props = {
  employees: any[];
  onEdit: (e: any) => void;
  onRefresh: () => void;
};

const EmployeeTable: React.FC<Props> = ({ employees, onEdit, onRefresh }) => {
  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this employee?')) return;
    try {
      await API.delete(`/employees/${id}`);
      onRefresh();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Department</th>
          <th>Salary</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(emp => (
          <tr key={emp._id}>
            <td>{emp.name}</td>
            <td>{emp.email}</td>
            <td>{emp.phone}</td>
            <td>{emp.department}</td>
            <td>{emp.salary}</td>
            <td>
              <button onClick={() => onEdit(emp)}>Edit</button>
              <button onClick={() => handleDelete(emp._id)} style={{ marginLeft: 8 }}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
