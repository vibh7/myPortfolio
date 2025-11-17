import React, { useState } from "react";
import { signInAdmin } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await signInAdmin(email, password);
      navigate("/admin"); // redirect to dashboard
    } catch (error) {
      setErr(error.message || "Failed to login");
    }
  };

  return (
    <div className="pt-28 flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-300/30 dark:border-gray-700/30">

        <h2 className="text-3xl font-bold text-center mb-6 dark:text-white">
          Admin Login
        </h2>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <input
            type="email"
            required
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          />

          <input
            type="password"
            required
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          />

          <button className="mt-3 bg-blue-600 hover:bg-blue-500 py-2.5 rounded-lg text-white font-semibold transition-all">
            Login
          </button>

          {err && (
            <p className="text-center text-red-500 font-medium">{err}</p>
          )}
        </form>

      </div>
    </div>
  );
};

export default Login;
