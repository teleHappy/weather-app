import React from 'react';
import './App.css';
import CurrentLocationProvider from './context/CurrentLocationContext';
import PagesWrapper from './pages/PagesWrapper';

/**
 * The root component of the weather app.
 * 
 * @returns The rendered JSX elements.
 */
function App() {

  return (
    <CurrentLocationProvider>
      <PagesWrapper />
    </CurrentLocationProvider>
  );

}

export default App;
