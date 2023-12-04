import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';

function ViewEmployee() {
    const [employee, setEmployee] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/emp/employees/${id}`);
                setEmployee(response.data);
            } catch (error) {
                console.error('Error fetching employee:', error);
            }
        };

        fetchEmployee();
    }, [id]);

    if (!employee) {
        return <div>Loading...</div>;
    }

    return (
        <div className="employee-details">
          <ul className="employee-details-list">
            <li className="employee-detail">First Name: {employee.first_name}</li>
            <li className="employee-detail">Last Name: {employee.last_name}</li>
            <li className="employee-detail">Email: {employee.email}</li>
            <li className="employee-detail">Gender: {employee.gender}</li>
            <li className="employee-detail">Salary: {employee.salary}</li>
          </ul>
          <button onClick={() => navigate('/employees')} className="back-button">Back to Employee List</button>
        </div>
      );
}

export default ViewEmployee;