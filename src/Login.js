import React, { useState } from 'react';
import { registerUser, loginUser, getAppData } from './api';

export default function Login() {
    const [view, setView] = useState('home'); // 'home', 'register', 'login', 'data'
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState('');
    const [appData, setAppData] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        await registerUser({ username, password });
        setView('login');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        const data = await loginUser({ username, password });
        setToken(data.token);
        setUsername(data.username);
        setIsLoggedIn(true);
        setView('data');
    };

    const handleLogout = () => {
        setToken(null);
        setUsername('');
        setIsLoggedIn(false);
        setAppData('');
        setView('home');
    };

    const fetchAppData = async () => {
        const data = await getAppData(token);
        setAppData(data.msg || data);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center text-gray-800">
            <header className="w-full bg-blue-500 text-white p-4 shadow">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold">My SPA</h1>
                    <nav className="space-x-4">
                        {!isLoggedIn && (
                            <>
                                <button
                                    className="px-4 py-2 bg-blue-700 rounded hover:bg-blue-600"
                                    onClick={() => setView('register')}
                                >
                                    Register
                                </button>
                                <button
                                    className="px-4 py-2 bg-blue-700 rounded hover:bg-blue-600"
                                    onClick={() => setView('login')}
                                >
                                    Login
                                </button>
                            </>
                        )}
                        {isLoggedIn && (
                            <>
                                <button
                                    className="px-4 py-2 bg-red-500 rounded hover:bg-red-400"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                                <button
                                    className="px-4 py-2 bg-green-500 rounded hover:bg-green-400"
                                    onClick={() => setView('data')}
                                >
                                    App Data
                                </button>
                            </>
                        )}
                    </nav>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center p-6">
                {view === 'home' && (
                    <h2 className="text-2xl font-semibold">
                        Welcome! Please register or log in.
                    </h2>
                )}
                {view === 'register' && (
                    <form
                        onSubmit={handleRegister}
                        className="bg-white p-6 shadow-md rounded w-full max-w-sm"
                    >
                        <h2 className="text-xl font-bold mb-4">Register</h2>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="w-full p-2 border rounded mb-4"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full p-2 border rounded mb-4"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        >
                            Register
                        </button>
                    </form>
                )}
                {view === 'login' && (
                    <form
                        onSubmit={handleLogin}
                        className="bg-white p-6 shadow-md rounded w-full max-w-sm"
                    >
                        <h2 className="text-xl font-bold mb-4">Login</h2>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="w-full p-2 border rounded mb-4"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full p-2 border rounded mb-4"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
                        >
                            Login
                        </button>
                    </form>
                )}
                {view === 'data' && (
                    <div className="w-full max-w-2xl p-6 bg-white shadow-md rounded">
                        <h2 className="text-xl font-bold mb-4">App Data</h2>
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
                            onClick={fetchAppData}
                        >
                            Fetch Data
                        </button>
                        <div className="p-4 border rounded bg-gray-50">
                            {appData || 'No data fetched yet.'}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
