import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from '../../services/api';
import { API_REGISTER } from '../../services/endpoints';
import { AuthContext } from '../../context/AuthContext'; // Import context


const Register = () => {
  const [formData, setFormData] = useState({
    user_email: '',
    user_name: '',
    password: '',
    password2: '', 
  });

  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Use login from context

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await post(API_REGISTER, formData, false); 
      console.log("Response:", response);

      if (response.tokens?.access && response.tokens?.refresh) {
        login({access: response.tokens.access, refresh: response.tokens.refresh,});        
        navigate('/');
      } 
      else {
        alert("Registration failed.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error registering.");
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input type="email" name="user_email" onChange={handleChange} placeholder="Email" required />
      <input type="text" name="user_name" onChange={handleChange} placeholder="Name" required />
      <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
      <input type="password" name="password2" onChange={handleChange} placeholder="Confirm Password" required />
      <button type="submit">Register</button>
    </form>
  </>
  );
};

export default Register;
