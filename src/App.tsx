import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddPatient from './components/AddPatient';
import ListPatients from './components/ListPatients';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/add-patient" element={<AddPatient />} />
        <Route path="/fakeDatabaseData" element={<ListPatients />} />
      </Routes>
    </Router>
  );
}

export default App;
