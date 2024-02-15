import React from 'react'; // Import the 'React' module
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import Weather from './pages/Weather';
import Hourly from './pages/Hourly';
import Daily from './pages/Daily';

function App() {
  return (
    <>      
    <Router>
      <Routes>
        <Route path="/" element={<Weather />}/>
        <Route path="/hourly" element={<Hourly />}/>
        <Route path="/daily" element={<Daily />}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
