import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, NavLink } from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp'; 
import Login from './components/Login';
import EmployeeList from './components/EmployeeList'; 
import AddEmployee from './components/AddEmployee'; 
import UpdateEmployee from './components/UpdateEmployee';
import { AuthContext } from './components/AuthContext'; 
import ViewEmployee from './components/ViewEmployee';

function App() {
  const { isLoggedIn, logOut } = useContext(AuthContext); 

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="app-title">Employee Management App</h1>
          <nav className="app-nav">
            {!isLoggedIn && <Link to="/" className="nav-link">Sign Up</Link>}
            {!isLoggedIn && <> | <Link to="/login" className="nav-link">Login</Link></>}
            {isLoggedIn && <NavLink to="/" onClick={logOut} className="nav-link">Logout</NavLink>}
          </nav>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            {isLoggedIn && <Route path="/employees" element={<EmployeeList />} />} 
            {isLoggedIn && <Route path="/add-employee" element={<AddEmployee />} />} 
            {isLoggedIn && <Route path="/update-employee/:id" element={<UpdateEmployee />} />}
            {isLoggedIn && <Route path="/view-employee/:id" element={<ViewEmployee />} />}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;