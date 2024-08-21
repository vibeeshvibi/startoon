import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminPage() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://startoon-2.onrender.com/api/admin');
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUsers(data);
                setFilteredUsers(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const filterUsers = () => {
            const lowercasedSearch = search.toLowerCase();
            const filtered = users.filter(user =>
                user.name.toLowerCase().includes(lowercasedSearch)
            );
            setFilteredUsers(filtered);
        };

        filterUsers();
    }, [search, users]);

    const handleChartNavigation = () => {
        navigate('/chart');
    };

    const handleLogout = () => {
        alert('Logging out!');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold text-gray-800">User Information</h1>
                    <div className="space-x-4">
                        <button
                            onClick={handleChartNavigation}
                            className="bg-green-500 text-white py-2 px-4 rounded-lg "
                        >
                            View Chart
                        </button>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white py-2 px-4 rounded-lg"
                        >
                            Logout
                        </button>
                    </div>
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600">
                                <th className="py-2 px-4 border-b">Name</th>
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">Gender</th>
                                <th className="py-2 px-4 border-b">Login Count</th>
                                <th className="py-2 px-4 border-b">Last Login Date</th>
                            </tr>
                        </thead>
                        <tbody >
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user._id} className="text-slate-700 text-center">
                                        <td className="py-2 px-4 border-b">{user.name}</td>
                                        <td className="py-2 px-4 border-b">{user.email}</td>
                                        <td className="py-2 px-4 border-b">{user.gender}</td>
                                        <td className="py-2 px-4 border-b">{user.loginCount}</td>
                                        <td className="py-2 px-4 border-b">
                                            {user.lastLoginDate ? new Date(user.lastLoginDate).toLocaleDateString() : 'N/A'}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="py-4 text-center text-gray-500">No users found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
