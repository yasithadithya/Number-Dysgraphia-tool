import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Login from './pages/Login';       // Already implemented
//import Dashboard from './pages/Dashboard'; // Already implemented
import Test from './pages/Test';
import ResultsPage from './features/test/ResultPage'; // Assuming you have a ResultsPage component
 

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/test/*" element={<Test />} />
      <Route path="/test/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
