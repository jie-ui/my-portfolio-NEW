// src/layout/Layout.jsx
import { NavLink, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import http from '@/api/http'; 
import styles from './layout.module.css';
import v7 from '@/assets/v7.jpg';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState(
    (localStorage.getItem("role") || "").toLowerCase() 
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);


    const cachedRole = (localStorage.getItem("role") || "").toLowerCase();
    setUserRole(cachedRole);

    if (token) {
      http.get("/profile/me")
        .then(res => {
          const userData = res.data?.data || {};
          const role = (userData.role || "user").toLowerCase();
          setUserName(userData.name || userData.email || "");
          setUserRole(role);
          localStorage.setItem("role", role); 
        })
        .catch(err => {
          console.error("❌ Failed to fetch /profile/me:", err.response?.data || err.message);
          const status = err.response?.status;
        
          if (status === 401 || status === 403) {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            setIsLoggedIn(false);
            setUserName("");
            setUserRole("");
            navigate("/login");
          }
        });
    } else {
      setUserName("");
      setUserRole("");
    }
  }, [location, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setUserName("");
    setUserRole("");
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleUsers = () => {
    navigate("/users");
  };

  return (
    <>

      <header className={styles.topbar}>
        <div className={styles.container}>
          <div className={styles.headerRow}>
            <img src={v7} alt="Logo" className={styles.logo} />

            <div className={styles.rightNav}>
              {isLoggedIn ? (
                <>
              
                  {userRole === "admin" && (
                    <button onClick={handleUsers} className={styles.logoutBtn}>
                      👥 Users
                    </button>
                  )}

                  <button onClick={handleProfile} className={styles.logoutBtn}>
                    👤 Profile
                  </button>

                  <button onClick={handleLogout} className={styles.logoutBtn}>
                    🚪 Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className={styles.link}>Sign In</NavLink> |
                  <NavLink to="/signup" className={styles.link}>Sign Up</NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <nav className={`${styles.navrow} ${styles.subbar}`}>
        <NavLink to="/">Home</NavLink> |
        <NavLink to="/about">About Me</NavLink> |
        <NavLink to="/projects">Projects</NavLink> |
        <NavLink to="/services">Services</NavLink> |
        <NavLink to="/contact">Contact Me</NavLink> |
        <NavLink to="/education">Education</NavLink>
      </nav>

   
      <div className={styles.content}>
        <Outlet />
      </div>
    </>
  );
}
