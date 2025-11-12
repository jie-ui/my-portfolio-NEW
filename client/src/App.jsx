
// App.jsx
import Layout from './layout/layout.jsx'
import AppRoutes from './routes/AppRoutes.jsx'
import './App.css'
import AuthProvider from "@/auth/authContext";

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
    
  );
}
