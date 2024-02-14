import React from 'react'; // Import the 'React' module
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import WeatherComponent from './WeatherComponent';

function App() {
  return (
    <>      
    <Router>
      <Routes>
        <Route path="/" element={<WeatherComponent />}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
