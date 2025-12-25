# 🏫 AITSP Community Website

A full-stack **Community Web Portal** where members can register, login, create posts, like, comment, and interact.  
Admin can manage users, approve posts, and maintain the community system.

## 🌐 Live Project Links

Frontend: https://community-web-frontend.onrender.com  
Backend API: https://community-web-backend.onrender.com/api

## 👤 Default Admin Login

Use the below credentials to access Admin Dashboard:

Email: vishruth.admin@gmail.com
Password: admin

## ✨ Features

### 🔐 Authentication

- Register & Login
- JWT Based Authentication
- Forgot & Reset Password

### 👤 User Features

- Update Profile + Bio
- Upload Profile Picture
- Profile Visibility: Public / Private
- View Members Directory
- Create Blog Post
- Like & Comment
- Logout

### 📝 Blog Features

- Create Post
- View Public Posts
- Like System
- Comment System
- Draft → Pending → Published Workflow

### 🛡️ Admin Features

- Admin Dashboard
- View Total Users & Posts Count
- Approve / Reject Posts
- Delete Posts
- Suspend / Activate Users

## 🗂️ Project Structure

community-website
├── backend
├── frontend

## ⚙️ Tech Stack

**Frontend**

- React JS
- Material UI
- Axios
- Tailwind CSS

**Backend**

- Node JS
- Express JS
- MongoDB
- JWT Authentication
- Multer (Profile Uploads)

## ▶️ Run Locally

### Backend

cd backend
npm install
npm start

### Frontend

cd frontend
npm install
npm start

Open → http://localhost:3000

## 🌍 Deployment

### Backend

Hosted on Render

### Frontend

Hosted on Render

## 📝 Environment Variables

### Backend `.env`

MONGO_URI=your_mongodb_string
JWT_SECRET=your_secret
PORT=5000

### Frontend `.env`

REACT_APP_API=https://community-web-backend.onrender.com/api

## 🙌 Contributors

Developed by **Vishruth Gowda**  
Feel free to improve and contribute!
