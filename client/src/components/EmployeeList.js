import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import '../App.css';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/emp/employees');
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, []);

    if (!isLoggedIn) {
        return <p>You must be logged in to view this page.</p>;
    }

    const deleteEmployee = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
          try {
            await axios.delete(`http://localhost:3000/api/v1/emp/employees/${id}`);
            setEmployees(employees.filter((employee) => employee._id !== id));
          } catch (error) {
            console.error('Error deleting employee:', error);
          }
        }
      };

    return (
        <div className="employee-list">
            <table className="employee-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee._id} className="employee-row">
                            <td className="employee-first-name">{employee.first_name}</td>
                            <td className="employee-last-name">{employee.last_name}</td>
                            <td className="employee-email">{employee.email}</td>
                            <td className="employee-actions">
                                <button onClick={() => navigate(`/update-employee/${employee._id}`)} className="update-button">Update</button>
                                <button onClick={() => deleteEmployee(employee._id)} className="delete-button">Delete</button>
                                <button onClick={() => navigate(`/view-employee/${employee._id}`)} className="view-button">View</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/add-employee" className="add-employee-link">Add Employee</Link>

        </div>
    );
}

export default EmployeeList;