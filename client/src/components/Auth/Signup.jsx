import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/authContext";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default User
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signup({ name, email, password, role }); // add role
      alert("Registered. Please sign in.");
      navigate("/login");
    } catch (err) {
      alert(err?.response?.data?.error || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 420, margin: "40px auto" }}>
      <h2>Sign Up</h2>

      <input
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{ width: "100%", padding: 10, marginTop: 12 }}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ width: "100%", padding: 10, marginTop: 12 }}
      />

      <input
        type="password"
        placeholder="Password (min 6)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ width: "100%", padding: 10, marginTop: 12 }}
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={{ width: "100%", padding: 10, marginTop: 12 }}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        style={{ marginTop: 16, width: "100%", padding: 10 }}
      >
        {loading ? "Creating..." : "Create Account"}
      </button>
    </form>
  );
}