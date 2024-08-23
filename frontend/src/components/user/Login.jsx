import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleNavigate = () => navigate('/signup');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === 'admin@email.com' && password === 'Admin@123') {
      alert('Admin Login');
      localStorage.setItem('user', true);
      navigate('/admin');
    } else {
      try {
        const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('user', JSON.stringify(data.user));
          alert(data.message);
          navigate('/dashboard');
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login. Please try again.');
      }
    }
  };

  return (
    <div className="bg-slate-100 flex items-center justify-center min-h-screen p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Sign In</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className='flex gap-10'>
            <button
              type="submit"
              className="w-full border-none bg-green-500 text-white py-2 px-4 rounded-lg"
              onClick={handleSubmit}
            >
              Sign In
            </button>
            <button
              type="submit"
              className="w-full border-none bg-red-500 text-white py-2 px-4 rounded-lg"
              onClick={handleNavigate}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
