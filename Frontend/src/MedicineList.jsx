import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';

export default function MedicineList() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/api/medicines')
      .then((res) => setMedicines(res.data))
      .catch(() => setError('Failed to load medicine list inline.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto', position: 'relative', minHeight: '90vh' }}>
      <h2>Medicine Inventory List</h2>
      {loading && <p style={{ color: '#666' }}>Loading items inline...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && medicines.length === 0 && <p>No medicine records found.</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {medicines.map((med) => (
          <li 
            key={med.id} 
            onClick={() => navigate(`/medicines/${med.id}`)}
            style={{ padding: '15px', border: '1px solid #ddd', marginBottom: '10px', borderRadius: '5px', cursor: 'pointer', backgroundColor: '#fdfdfd' }}
          >
            <strong>Brand Name:</strong> {med.name} | <strong>Category:</strong> {med.category} | <strong>Stock:</strong> {med.quantity}
          </li>
        ))}
      </ul>

      {/* Floating Action Button (FAB) pointing to Add Medicine */}
      <button 
        onClick={() => navigate('/medicines/add')}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#28A745',
          color: 'white',
          fontSize: '30px',
          border: 'none',
          boxShadow: '0px 4px 6px rgba(0,0,0,0.2)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        title="Add Medicine"
      >
        +
      </button>
    </div>
  );
}