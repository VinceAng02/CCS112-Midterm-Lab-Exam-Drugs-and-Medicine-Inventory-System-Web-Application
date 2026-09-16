import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import MedicineList from './MedicineList';
import AddMedicine from './AddMedicine';
import MedicineDetails from './MedicineDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/medicines" element={<MedicineList />} />
        <Route path="/medicines/add" element={<AddMedicine />} />
        <Route path="/medicines/:id" element={<MedicineDetails />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;