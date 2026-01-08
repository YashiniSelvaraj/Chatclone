import { useState } from "react";
import { loginUser } from "./api/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await loginUser({ username, password });
    if (res.token) {
      localStorage.setItem("token", res.token);
      navigate("/chat");
      alert("Click new Chat To Start Conversation")
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="border p-6 w-80">
        <h2 className="text-xl mb-4">Login</h2>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-2"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          className="bg-black text-white w-full p-2"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="mt-2 text-sm">
          No account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
