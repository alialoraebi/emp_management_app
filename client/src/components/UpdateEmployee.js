import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';

function UpdateEmployee() {
    const [employee, setEmployee] = useState({
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        salary: '',
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/employees/${id}`);
                setEmployee(response.data);
            } catch (error) {
                console.error('Error fetching employee:', error);
            }
        };

        fetchEmployee();
    }, [id]);

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/v1/emp/employees/${id}`, employee);
            navigate('/employees');
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="update-form">
          <label htmlFor="first_name" className="form-label">First Name:</label>
          <input type="text" id="first_name" name="first_name" value={employee.first_name} onChange={handleChange} className="form-input" />
      
          <label htmlFor="last_name" className="form-label">Last Name:</label>
          <input type="text" id="last_name" name="last_name" value={employee.last_name} onChange={handleChange} className="form-input" />
      
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" id="email" name="email" value={employee.email} onChange={handleChange} className="form-input" />
      
          <label htmlFor="gender" className="form-label">Gender:</label>
            <select id="gender" name="gender" value={employee.gender} onChange={handleChange} className="form-input">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
      
          <label htmlFor="salary" className="form-label">Salary:</label>
          <input type="number" id="salary" name="salary" value={employee.salary} onChange={handleChange} className="form-input" />
      
          <button type="submit" className="submit-button">Update Employee</button>
          <button type="button" onClick={() => navigate('/employees')} className="cancel-button">Cancel</button>        
        </form>
      );
}

export default UpdateEmployee;