import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from './api';

export default function MedicineDetails() {
  const { id } = useParams();
  const [medicine, setMedicine] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/api/medicines/${id}`)
      .then((res) => setMedicine(res.data))
      .catch(() => setError('Could not fetch item details inline.'));
  }, [id]);

  if (error) return <div style={{ padding: '40px', color: 'red' }}>{error}</div>;
  if (!medicine) return <div style={{ padding: '40px' }}>Loading full details...</div>;

  return (
    <div style={{ padding: '40px', maxWidth: '500px', margin: '40px auto', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Medicine Details View</h2>
      <p><strong>ID:</strong> {medicine.id}</p>
      <p><strong>Brand Name:</strong> {medicine.name}</p>
      <p><strong>Category:</strong> {medicine.category}</p>
      <p><strong>Stock Quantity:</strong> {medicine.quantity}</p>
      <p><strong>Created At:</strong> {medicine.created_at}</p>

      <button 
        onClick={() => navigate('/medicines')}
        style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Back
      </button>
    </div>
  );
}