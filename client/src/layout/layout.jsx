// src/layout/Layout.jsx
import { NavLink, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/authContext'; // 导入useAuth
import styles from './layout.module.css';
import v7 from '@/assets/v7.jpg';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 关键修改：使用AuthProvider的状态
  const { token, user, signout } = useAuth();

  // 从AuthProvider的状态计算派生值
  const isLoggedIn = !!token;
  const userName = user?.name || user?.email || "";
  const userRole = (user?.role || "").toLowerCase();

  const handleLogout = async () => {
    await signout(); // 使用AuthProvider的退出方法
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