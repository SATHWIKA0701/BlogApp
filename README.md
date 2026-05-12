# Blog Platform – Full Stack MERN Application

## Overview

This project is a full-stack Blog Platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It supports role-based access for Authors and Users, secure authentication using JWT, article management, commenting, profile image uploads using Cloudinary, and protected routes.

The application is divided into two major parts:

* **Frontend** – React + Vite + Tailwind CSS
* **Backend** – Node.js + Express.js + MongoDB

---

# Features

## Authentication & Authorization

* User Registration
* Author Registration
* Secure Login using JWT
* Logout functionality
* Protected Routes
* Role-Based Access Control
* Change Password feature
* Token verification middleware

## Author Features

* Create articles
* Edit articles
* Soft delete / restore articles
* View own articles
* Upload profile image
* Manage author profile

## User Features

* View all active articles
* Read article details
* Add comments to articles
* View author details

## Additional Features

* Cloudinary image upload integration
* Error boundaries in frontend
* Zustand state management
* REST API architecture
* MongoDB schema validation
* Cookie-based authentication
* CORS configuration

---

# Tech Stack

## Frontend

* React 19
* Vite
* Tailwind CSS
* Axios
* React Router
* React Hook Form
* Zustand
* React Hot Toast

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs
* Multer
* Cloudinary
* Cookie Parser
* CORS
* dotenv

---

# Project Structure

```bash
BLOG(WEEK5)
│
├── Backend
│   ├── APIs
│   │   ├── AuthorApi.js
│   │   ├── CommonApi.js
│   │   ├── UserApi.js
│   │   └── AdminApi.js
│   │
│   ├── config
│   │   ├── cloudinary.js
│   │   ├── cloudinaryUpload.js
│   │   └── multer.js
│   │
│   ├── middlewares
│   │   ├── verifyToken.js
│   │   └── checkAuthor.js
│   │
│   ├── Models
│   │   ├── ArticleModel.js
│   │   └── UserModel.js
│   │
│   ├── services
│   │   └── authService.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── Frontend
│   ├── src
│   │   ├── components
│   │   ├── store
│   │   ├── lib
│   │   ├── styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
└── SETUP_INSTRUCTIONS.txt
```

---

# Backend Analysis

## Backend Architecture

The backend follows a modular REST API architecture.

### Main Components

| Component   | Purpose                             |
| ----------- | ----------------------------------- |
| APIs        | Handles API routes                  |
| Models      | MongoDB schemas                     |
| Services    | Business logic                      |
| Middlewares | Authentication & authorization      |
| Config      | Upload and Cloudinary configuration |

---

## Backend Workflow

### Authentication Flow

1. User sends login credentials.
2. Backend validates credentials using bcrypt.
3. JWT token is generated.
4. Token is stored in cookies.
5. Protected APIs verify token using middleware.

---

## Database Models

### User Model

Stores:

* First Name
* Last Name
* Email
* Password
* Role
* Profile Image
* Account Status

### Article Model

Stores:

* Author ID
* Title
* Category
* Content
* Comments
* Active Status
* Timestamps

---

## Important APIs

### Common APIs

| Method | Endpoint                      | Description           |
| ------ | ----------------------------- | --------------------- |
| POST   | `/common-api/login`           | User login            |
| GET    | `/common-api/logout`          | Logout                |
| PUT    | `/common-api/change-password` | Change password       |
| GET    | `/common-api/check-auth`      | Verify authentication |

### Author APIs

| Method | Endpoint                          | Description            |
| ------ | --------------------------------- | ---------------------- |
| POST   | `/author-api/users`               | Register author        |
| POST   | `/author-api/articles`            | Create article         |
| GET    | `/author-api/articles/:authorId`  | Get author articles    |
| PUT    | `/author-api/articles`            | Update article         |
| PATCH  | `/author-api/articles/:id/status` | Delete/Restore article |

### User APIs

| Method | Endpoint                | Description       |
| ------ | ----------------------- | ----------------- |
| POST   | `/user-api/users`       | Register user     |
| GET    | `/user-api/articles`    | Get all articles  |
| GET    | `/user-api/article/:id` | Get article by ID |
| PUT    | `/user-api/articles`    | Add comment       |

---

# Frontend Analysis

## Frontend Architecture

The frontend is built using React with component-based architecture.

### Main Functional Areas

| Folder     | Purpose              |
| ---------- | -------------------- |
| components | UI components        |
| store      | Zustand global state |
| lib        | API configuration    |
| styles     | Shared styles        |

---

## Major Components

| Component           | Purpose             |
| ------------------- | ------------------- |
| Home.jsx            | Homepage            |
| Login.jsx           | Login page          |
| Register.jsx        | Registration page   |
| WriteArticle.jsx    | Article editor      |
| AddArticle.jsx      | Create article form |
| EditArticleForm.jsx | Update article      |
| ArticleById.jsx     | Article details     |
| AuthorArticles.jsx  | Author dashboard    |
| AuthorProfile.jsx   | Author profile      |
| UserProfile.jsx     | User profile        |
| ProtectedRoute.jsx  | Route protection    |
| ErrorBoundary.jsx   | Error handling      |

---

## State Management

The application uses Zustand for:

* Authentication state
* User data
* Article state
* API synchronization

---

# Security Features

## Authentication Security

* JWT Token Authentication
* Password hashing using bcrypt
* Protected API routes
* Cookie-based sessions

## Authorization Security

* Role-based route protection
* Article ownership validation
* Secure middleware verification

---

# Image Upload System

The application uses:

* Multer for file upload handling
* Cloudinary for cloud image storage

### Upload Flow

1. User selects image.
2. Multer processes image.
3. Image uploaded to Cloudinary.
4. Cloudinary URL stored in MongoDB.

---

# Environment Variables

Create a `.env` file inside the Backend folder.

```env
PORT=4000
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

# Installation Guide

## Clone Repository

```bash
git clone <repository-url>
cd BLOG(WEEK5)
```

---

# Backend Setup

```bash
cd Backend
npm install
npm run dev
```

Backend runs on:

```bash
http://localhost:4000
```

---

# Frontend Setup

Open another terminal.

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Application Flow

## User Flow

1. User registers.
2. User logs in.
3. User views articles.
4. User opens article details.
5. User comments on articles.

## Author Flow

1. Author registers.
2. Author logs in.
3. Author writes article.
4. Article stored in MongoDB.
5. Author edits/deletes/restores article.

---

# Error Handling

The project includes:

* Centralized backend error middleware
* React Error Boundary
* Validation errors
* Authentication errors
* 404 route handling

---

# Future Improvements

* Admin dashboard
* Rich text editor
* Article likes system
* Search and filtering
* Pagination
* Dark mode
* Notifications
* Real-time chat/comments
* Bookmark system
* Email verification
* Forgot password functionality
* Article analytics dashboard

---

# Learning Outcomes

This project demonstrates:

* Full Stack MERN Development
* REST API Design
* JWT Authentication
* Role-Based Authorization
* MongoDB Relationships
* Cloudinary Integration
* React State Management
* Secure Backend Development
* Protected Routing
* File Upload Handling

---

# Conclusion

This Blog Platform project is a complete MERN stack application implementing secure authentication, role-based access control, article management, commenting functionality, and cloud-based image uploads.

It demonstrates real-world full-stack application architecture and industry-standard development practices.

---

# Author

Developed as a MERN Stack Blog Platform Project.
