"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      toast.success("Succesfull Login!", {
        theme: "colored",
      });

      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        router.push("/admin");
      } else {
        setError("Invalid username or password");
        toast.warning("Invalid username or password", {
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login");
      toast.error("An error occurred during login", {
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleLogin}
        className="border p-6 rounded shadow-md space-y-4"
      >
        <h3 className="text-lg font-bold mb-4">Admin Login</h3>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full border rounded py-2 px-3"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border rounded py-2 px-3"
          />
        </div>
        <button
          disabled={loading}
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
        >
          {loading ? "Welcome..." : "Login"}
        </button>
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        )}
        <ToastContainer />
      </form>
    </div>
  );
}
