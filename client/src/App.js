import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, NavLink } from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp'; 
import Login from './components/Login';
import EmployeeList from './components/EmployeeList'; 
import { AuthContext } from './components/AuthContext'; 

function App() {
  const { isLoggedIn, logOut } = useContext(AuthContext); 

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Employee Management App</h1>
          <nav>
            {!isLoggedIn && <Link to="/">Sign Up</Link>}
            {!isLoggedIn && <> | <Link to="/login">Login</Link></>}
            {isLoggedIn && <NavLink to="/" onClick={logOut}>Logout</NavLink>}
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            {isLoggedIn && <Route path="/employees" element={<EmployeeList />} />} 
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;