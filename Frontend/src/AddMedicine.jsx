import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';

export default function AddMedicine() {
  const [form, setForm] = useState({ name: '', category: '', quantity: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // POST request to Laravel backend
      await api.post('/api/medicines', form);
      setSuccess('Medicine saved successfully! Returning to list...');
      setTimeout(() => navigate('/medicines'), 1200); // Returns to list without manual refresh
    } catch (err) {
      setError('Inline validation error: Failed to save record.');
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '500px', margin: '40px auto', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Add Medicine Form</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Brand Name:</label><br />
          <input 
            type="text" 
            value={form.name} 
            onChange={(e) => setForm({ ...form, name: e.target.value })} 
            required 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }} 
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Category:</label><br />
          <input 
            type="text" 
            value={form.category} 
            onChange={(e) => setForm({ ...form, category: e.target.value })} 
            required 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }} 
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>Stock Quantity:</label><br />
          <input 
            type="number" 
            value={form.quantity} 
            onChange={(e) => setForm({ ...form, quantity: e.target.value })} 
            required 
            min="0" 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }} 
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Save Medicine
        </button>
      </form>
      <button onClick={() => navigate('/medicines')} style={{ marginTop: '15px', background: 'none', border: 'none', color: '#007BFF', cursor: 'pointer' }}>
        &larr; Back to List
      </button>
    </div>
  );
}