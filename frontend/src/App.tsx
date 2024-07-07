import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import axios from 'axios';


const App: React.FC = () => {
  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/init');
      console.log("DB initiated" + response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
