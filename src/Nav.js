import React, { useState } from "react";

export default function Nav({ onLogin, onRegister, onLogout, isLoggedIn, username }) {
  const [view, setView] = useState(null); // null, 'login', 'register'

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    await onLogin({ username, password });
    setView(null); // Close the modal after login
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    await onRegister({ username, password });
    setView(null); // Close the modal after registration
  };

  return (
    <div className="h-16 bg-white shadow-md fixed top-0 left-0 w-full z-10">
      <div className="w-full h-full flex items-center justify-between px-4">
        <div className="text-xl">Technology Conference</div>
        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => setView("login")}
                className="text-lg font-medium cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => setView("register")}
                className="text-lg font-medium cursor-pointer"
              >
                Register
              </button>
            </>
          ) : (
            <>
              <span className="text-lg">Welcome, {username}!</span>
              <button
                onClick={onLogout}
                className="text-lg font-medium cursor-pointer text-red-500"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      {view && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white p-6 rounded shadow-lg w-80 relative">
            <button
              onClick={() => setView(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>
            {view === "login" && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <h2 className="text-xl font-semibold">Login</h2>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full p-2 border rounded"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  Login
                </button>
              </form>
            )}
            {view === "register" && (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <h2 className="text-xl font-semibold">Register</h2>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full p-2 border rounded"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
                >
                  Register
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
