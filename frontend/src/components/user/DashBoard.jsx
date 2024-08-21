import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate('/');
        }
    }, [navigate]);

    const handleLogout = () => {
        alert('Logging out!');
        localStorage.removeItem('user');
        navigate('/');
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-lg text-gray-700">Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-4 text-center text-gray-700">Welcome, {user.name}!</h2>
                <p className="text-lg text-gray-600 mb-2"><span className="font-semibold">Email:</span> {user.email}</p>
                <p className="text-lg text-gray-600 mb-2"><span className="font-semibold">Gender:</span> {user.gender}</p>
                <p className="text-lg text-gray-600 mb-2"><span className="font-semibold">Login Count:</span> {user.loginCount}</p>
                <p className="text-lg text-gray-600 mb-4"><span className="font-semibold">Last Login Date:</span> {new Date(user.lastLoginDate).toLocaleString()}</p>
                <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Dashboard;
