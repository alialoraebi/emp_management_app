import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

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
        <div>
            <Link to="/add-employee">Add Employee</Link>
            <table>
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
                        <tr key={employee._id}>
                            <td>{employee.first_name}</td>
                            <td>{employee.last_name}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button onClick={() => navigate.push(`/update-employee/${employee._id}`)}>Update</button>
                                <button onClick={() => deleteEmployee(employee._id)}>Delete</button>
                                <button onClick={() => navigate.push(`/view-employee/${employee._id}`)}>View</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;