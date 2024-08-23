import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        gender: 'male',
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
    });

    // Simple regex patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^.{6,}$/; // At least 6 characters

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { name: '', email: '', password: '' };

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
            valid = false;
        }
        if (!emailPattern.test(formData.email)) {
            newErrors.email = 'Valid email is required';
            valid = false;
        }
        if (!passwordPattern.test(formData.password)) {
            newErrors.password = 'Password must be at least 6 characters long';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleNavigate = () => (navigate('/'))

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                setFormData({ name: '', email: '', password: '', gender: 'male' });
                navigate('/');
            } else {
                alert('Error: ' + data.message);
            }
            console.log('Success:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Sign Up</h2>
                <form >
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${errors.name ? 'border-red-500' : 'focus:outline-none focus:ring-2 focus:ring-blue-500'}`}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${errors.email ? 'border-red-500' : 'focus:outline-none focus:ring-2 focus:ring-blue-500'}`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${errors.password ? 'border-red-500' : 'focus:outline-none focus:ring-2 focus:ring-blue-500'}`}
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>
                    <div className="mb-6">
                        <span className="block text-sm font-medium text-gray-600 mb-2">Gender:</span>
                        <div className="flex items-center">
                            <label className="flex items-center mr-4">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={formData.gender === 'male'}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                Male
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={formData.gender === 'female'}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                Female
                            </label>
                        </div>
                    </div>
                    <div className='flex gap-10'>
                        <button
                            type="submit"
                            className="w-full border-none bg-green-500 text-white py-2 px-4 rounded-lg"
                            onClick={handleSubmit}
                        >
                            Sign Up
                        </button>
                        <button
                            type="submit"
                            className="w-full border-none bg-red-500 text-white py-2 px-4 rounded-lg"
                            onClick={handleNavigate}
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
