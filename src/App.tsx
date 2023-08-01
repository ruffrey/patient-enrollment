import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PatientForm from './components/PatientForm';
import PatientList from './components/PatientList';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/add-patient" element={<PatientForm />} />
        <Route path="/patients" element={<PatientList />} />
      </Routes>
    </Router>
  );
}

export default App;
