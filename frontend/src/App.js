import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Login from './pages/Login';       // Already implemented
//import Dashboard from './pages/Dashboard'; // Already implemented
import Test from './pages/Test'; 

const App = () => {
  return (
    <Router>
      <Routes>
        
        
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
};

export default App;
