import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp'; 

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Employee Management App</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<SignUp />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;