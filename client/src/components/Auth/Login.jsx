import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/authContext";

export default function Login() {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signin(email, password);   
      alert("Login successful");
      navigate("/");
    } catch (err) {
      alert(err?.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 420, margin: "40px auto" }}>
      <h2>Sign In</h2>
      <div style={{ marginTop: 12 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: 10 }}
        />
      </div>
      <div style={{ marginTop: 12 }}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: 10 }}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        style={{ marginTop: 16, width: "100%", padding: 10 }}
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
