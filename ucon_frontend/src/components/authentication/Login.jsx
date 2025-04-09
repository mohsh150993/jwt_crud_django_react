import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from '../../services/api'; // your custom POST method
import { API_LOGIN } from '../../services/endpoints'; // login endpoint
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ user_email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await post(API_LOGIN, formData, false); // `false` disables token in header
      if (response.tokens?.access) {
        login(response.tokens.access); // store access token
        navigate('/');
      } else {
        alert("Invalid login credentials");
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="user_email"
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
