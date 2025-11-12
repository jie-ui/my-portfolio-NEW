// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import http from "@/api/http";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    aboutMe: ""
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please login.");
        setLoading(false);
        return;
      }

      const res = await http.get("/profile/me"); 
      console.log("✅ User data:", res.data); 
      const userData = res.data.data;
      setUser(userData);
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        aboutMe: userData.aboutMe || ""
      });
      setError("");
    } catch (err) {
      console.error("❌ Failed to fetch user:", err);
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateSuccess(false);
    
    try {
      const res = await http.put(`/users/${user._id}`, formData);
      console.log("✅ Profile updated:", res.data);
      
      setUser(res.data.data);
      setIsEditing(false);
      setUpdateSuccess(true);
      
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (err) {
      console.error("❌ Failed to update profile:", err);
      setError(err.response?.data?.error || "Failed to update profile");
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      aboutMe: user.aboutMe || ""
    });
    setIsEditing(false);
    setError("");
  };

  if (loading) {
    return (
      <div className="p-4 text-gray-500 italic text-center">
        Loading your profile...
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="p-4 text-red-600 font-semibold text-center">
        ⚠️ {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4 text-yellow-600 font-semibold text-center">
        No user data found.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 rounded-xl shadow-lg bg-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">👤 My Profile</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Edit Profile
          </button>
        )}
      </div>

      {updateSuccess && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg">
          ✅ Profile updated successfully!
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg">
          ⚠️ {error}
        </div>
      )}

      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              About Me
            </label>
            <textarea
              name="aboutMe"
              value={formData.aboutMe}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <input
              type="text"
              value={user.role}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
            />
            <p className="text-xs text-gray-500 mt-1">Role cannot be changed</p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="border-b pb-3">
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-lg font-medium text-gray-800">{user.name}</p>
          </div>

          <div className="border-b pb-3">
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-medium text-gray-800">{user.email}</p>
          </div>

          <div className="border-b pb-3">
            <p className="text-sm text-gray-500">Role</p>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
              user.role === 'admin' 
                ? 'bg-purple-100 text-purple-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {user.role}
            </span>
          </div>

          <div className="pb-3">
            <p className="text-sm text-gray-500">About Me</p>
            <p className="text-gray-700 mt-1">{user.aboutMe || "Not provided."}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;