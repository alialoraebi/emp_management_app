import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

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

    const handleCancel = () => {
        navigate('/employees');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="first_name"
                value={employee.first_name}
                onChange={handleChange}
                placeholder="First Name"
                required
            />
            <input
                type="text"
                name="last_name"
                value={employee.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                required
            />
            <input
                type="email"
                name="email"
                value={employee.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <select
                name="gender"
                value={employee.gender}
                onChange={handleChange}
                required
            >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
            <input
                type="number"
                name="salary"
                value={employee.salary}
                onChange={handleChange}
                placeholder="Salary"
                required
            />
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
    );
}

export default UpdateEmployee;