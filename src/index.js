import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Nav from './Nav';
import Search from './Search';
import { loginUser, registerUser } from './api';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState("");

  const handleLogin = async ({ username, password }) => {
    try {
      const data = await loginUser({ username, password });
      setToken(data.token);
      setUsername(data.username);
      setIsLoggedIn(true);
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    }
  };

  const handleRegister = async ({ username, password }) => {
    try {
      await registerUser({ username, password });
      alert("User registered successfully. Please log in.");
    } catch (error) {
      alert("Registration failed. Please try again.");
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUsername("");
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav
        onLogin={handleLogin}
        onRegister={handleRegister}
        onLogout={handleLogout}
        isLoggedIn={isLoggedIn}
        username={username}
      />
      <main className="pt-20 p-4">
        {isLoggedIn ? (
          <div>
            <h2 className="text-2xl font-semibold">Welcome, {username}!</h2>
            <Search token={token} />
          </div>
        ) : (
          <h2 className="text-lg">Please log in or register to access the app.</h2>
        )}
      </main>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
