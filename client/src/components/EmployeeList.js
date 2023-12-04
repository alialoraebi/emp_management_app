import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const { isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/employees');
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

    return (
        <div>
            <Link to="/add-employee">Add Employee</Link>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee._id}>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <Link to={`/update-employee/${employee._id}`}>Update</Link>
                                <Link to={`/delete-employee/${employee._id}`}>Delete</Link>
                                <Link to={`/view-employee/${employee._id}`}>View</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;