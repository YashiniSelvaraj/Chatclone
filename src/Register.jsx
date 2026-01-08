import { useState } from "react";
import { registerUser } from "./api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    await registerUser({ username, password });
    alert("Registered successfully");
    navigate("/login");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="border p-6 w-80">
        <h2 className="text-xl mb-4">Register</h2>

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
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </div>
  );
}
