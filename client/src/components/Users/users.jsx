import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "@/api/http";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    aboutMe: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please login.");
        setLoading(false);
        return;
      }

      
      const profileRes = await http.get("/profile/me");
      setCurrentUser(profileRes.data.data);

    
      const role = profileRes.data.data.role?.toLowerCase?.() || "";
      if (role !== "admin") {
        setError("Access denied. Admin only.");
        setLoading(false);
        return;
      }

   
      const usersRes = await http.get("/users");
      setUsers(usersRes.data.data || usersRes.data);
      setError("");
    } catch (err) {
      console.error("❌ Failed to fetch users:", err);
      setError(err.response?.data?.error || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };


  const handleAddUser = async () => {
    try {
      const res = await http.post("/users", formData);
      setUsers((prev) => [...prev, res.data.data]);
      setIsAddingUser(false);
      resetForm();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add user");
    }
  };


  const handleUpdateUser = async () => {
    try {
      const updateData = { ...formData };
      if (!updateData.password) delete updateData.password;

      const res = await http.put(`/users/${editingUser._id}`, updateData);
      setUsers((prev) =>
        prev.map((u) =>
          u._id === editingUser._id ? res.data.data : u
        )
      );
      setEditingUser(null);
      resetForm();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to update user");
    }
  };


  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await http.delete(`/users/${userId}`);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete user");
    }
  };


  const startEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
      aboutMe: user.aboutMe || ""
    });
  };


  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "user",
      aboutMe: ""
    });
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setIsAddingUser(false);
    resetForm();
  };


  if (loading) return <div className="loading-text">Loading users...</div>;

  
  if (error) {
    return (
      <div className="error-box">
        <h2 className="error-title">⚠️ Error</h2>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  // main page
  return (
    <div className="users-page">
      <div className="header-row">
        <div>
          <h2 className="page-title">👥 User Management</h2>
          <p className="user-count">
            Total users: <span>{users.length}</span>
          </p>
        </div>
        <button onClick={() => setIsAddingUser(true)} className="btn-add">
          + Add New User
        </button>
      </div>

      {/* add/edit */}
      {(isAddingUser || editingUser) && (
        <div className="user-form">
          <h3 className="form-title">
            {isAddingUser ? "Add New User" : "Edit User"}
          </h3>

          <div className="form-grid">
            <div className="form-field">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-field">
              <label>
                Password {editingUser && "(leave blank to keep current)"}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-field">
              <label>Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="form-field full-width">
              <label>About Me</label>
              <textarea
                name="aboutMe"
                rows="3"
                value={formData.aboutMe}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-buttons">
            <button
              onClick={isAddingUser ? handleAddUser : handleUpdateUser}
              className="btn-primary"
            >
              {isAddingUser ? "Add User" : "Update User"}
            </button>
            <button onClick={cancelEdit} className="btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* users List */}
      {users.length === 0 ? (
        <div className="no-users">No users found.</div>
      ) : (
        <div className="user-table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>About</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.aboutMe || "-"}</td>
                  <td>
                    <button
                      onClick={() => startEdit(user)}
                      className="btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="btn-delete"
                      disabled={user._id === currentUser?._id}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
