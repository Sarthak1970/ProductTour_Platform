import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Base_Url } from "../config";

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      navigate("/dashboard");
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${Base_Url}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });


      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Invalid email or password.");
      }
      console.log("Login response data:", data);


      const fullUser = { ...data.user, token: data.token };
      localStorage.setItem("user", JSON.stringify(fullUser));
      setUser(fullUser);


      navigate("/dashboard");
    } catch (err) {
      setError(
        err.message.includes("Invalid")
          ? "Incorrect email or password. Please try again."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-red-200 dark:from-gray-700 dark:via-blue-900 dark:to-green-800 px-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
          Welcome Back
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={submitHandler} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="relative w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded transition duration-200 font-medium focus:outline-none focus:ring-4 focus:ring-blue-400 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span className="relative z-10">
              {loading ? "Logging in..." : "Login"}
            </span>
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-600 dark:text-gray-300">
          New to Product Tour?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:underline dark:text-blue-400 font-medium"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
