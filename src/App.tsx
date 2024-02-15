import React from 'react'; // Import the 'React' module
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import Weather from './pages/Weather';
import Hourly from './pages/Hourly';

function App() {
  return (
    <>      
    <Router>
      <Routes>
        <Route path="/" element={<Weather />}/>
        <Route path="/hourly" element={<Hourly />}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
