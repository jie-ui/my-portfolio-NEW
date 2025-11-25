# 🌐 Personal Portfolio Website (Full Stack)

This is my **full stack personal portfolio application** built with **React (Frontend)** and **Node.js + Express + MongoDB (Backend)**.  
It showcases my background, skills, featured projects, and includes full CRUD functionality with authentication and user roles.

---

## 📁 Project Structure

portfolio-fullstack/

├── client/ # React frontend

├── server/ # Node/Express backend

└── README.md

---

## 🖥️ Frontend (React)

### Pages
- **Home** – Welcome section and introduction
- **About Me** – Background, profile, skills
- **Projects** – Featured projects with descriptions
- **Services** – Skills and capabilities
- **Contact Me** – Contact information + interactive contact form
- **Signup / Signin** – Authentication pages
- **Education / Project Management** – Forms and CRUD pages (Admin only)

### Features
- Responsive UI using **React + CSS Modules**
- **React Router** navigation
- Contact form with validation
- API integration with backend
- State management for form inputs and authentication
- Role-based UI (User vs Admin)

---

## 🛠 Backend (Node.js + Express + MongoDB)

### Features
- JWT Authentication (Signup / Signin / Signout)
- User roles: **Admin** and **User**
- Protected routes
- CRUD operations for:
  - Contacts
  - Education / Qualifications
  - Projects
- MongoDB Atlas integration

### API Endpoints (Sample)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Create new user |
| POST | `/auth/signin` | Login user (JWT) |
| GET | `/auth/signout` | Logout |
| GET | `/contact` | Get all contacts |
| POST | `/contact` | Create contact |
| PUT | `/contact/:id` | Update contact |
| DELETE | `/contact/:id` | Delete contact |

---

## 🧰 Technologies Used

### Frontend
- React
- React Router
- CSS Modules

### Backend
- Node.js
- Express
- MongoDB (Atlas)
- Mongoose
- JSON Web Tokens (JWT)

### Tools
- Git & GitHub
- Postman (API testing)
- Vercel / Render (Deployment)

---

## 🚀 Live Demo
The website is deployed here:

👉 **Live Website:
---

## 📦 GitHub Repository

👉 **Client + Server Repository:**  
https://github.com/jie-ui/my-portfolio-NEW

---

## 🧪 How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/jie-ui/my-portfolio-NEW.git
cd my-portfolio-NEW


#Setup Backend
cd server
npm install
npm run dev

#Setup Frontend
cd ../client
npm install
npm run dev

