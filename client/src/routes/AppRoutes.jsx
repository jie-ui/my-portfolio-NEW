import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home/Home.jsx';
import About from '../components/About/About.jsx';
import Projects from '../components/Projects/Projects.jsx';
import AddProject from '../components/Projects/AddProject.jsx';
import Services from '../components/Services/Services.jsx';
import Contact from '../components/Contact/Contact.jsx';
import Login from '../components/Auth/Login.jsx';
import Signup from '../components/Auth/Signup.jsx';
import Education from '../components/Education/Education.jsx';
import Profile from '../components/profile/Profile.jsx';
import User from '../components/Users/users.jsx';
import ContactRecords from '../components/Contact/ContactRecords.jsx';
import Layout from '../layout/layout.jsx';
import ProtectedRoute from '../components/protectedRoute.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
       
        <Route 
          path="about" 
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          } 
        />
        
        
        <Route 
          path="projects" 
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="projects/add" 
          element={
            <ProtectedRoute role="admin">
              <AddProject />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="education" 
          element={
            <ProtectedRoute >
              <Education />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="services" 
          element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          } 
        />
   
  
        <Route path="contact" element={<Contact />} />

        {/*  Admin  */}
        <Route 
          path="contact-records" 
          element={
            <ProtectedRoute role="admin">
              <ContactRecords />
            </ProtectedRoute>
          } 
        />
           


        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="profile" element={<Profile />} />
        <Route 
          path="users" 
          element={
            <ProtectedRoute role="admin">
              <User />
            </ProtectedRoute>
          } 
        />
      
      </Route>
    </Routes>
  );
}