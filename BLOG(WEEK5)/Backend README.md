# BACKEND README.md

```md
# Backend – Blog Platform

## Overview
This is the backend part of the Blog Platform project built using Node.js, Express.js, MongoDB, and JWT authentication.

The backend handles:
- Authentication
- Authorization
- REST APIs
- Database operations
- Image uploads
- Token verification

---

# Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- Cloudinary
- Cookie Parser
- CORS
- dotenv

---

# Folder Structure

```bash
Backend
│
├── APIs
│   ├── AuthorApi.js
│   ├── UserApi.js
│   ├── CommonApi.js
│   └── AdminApi.js
│
├── config
│   ├── cloudinary.js
│   ├── multer.js
│   └── cloudinaryUpload.js
│
├── middlewares
│   ├── verifyToken.js
│   └── checkAuthor.js
│
├── Models
│   ├── UserModel.js
│   └── ArticleModel.js
│
├── services
│
├── server.js
├── package.json
├── .env
└── README.md
````

---

# Installation Commands

## Step 1: Open Terminal

```bash
cd Backend
```

---

## Step 2: Install Dependencies

```bash
npm install
```

---

# Important Packages Installation

## Install Express

```bash
npm install express
```

Purpose:

* Backend framework
* API handling

---

## Install MongoDB & Mongoose

```bash
npm install mongoose mongodb
```

Purpose:

* Database connection
* Schema creation

---

## Install JWT

```bash
npm install jsonwebtoken
```

Purpose:

* Authentication
* Token generation

---

## Install bcryptjs

```bash
npm install bcryptjs
```

Purpose:

* Password hashing

---

## Install dotenv

```bash
npm install dotenv
```

Purpose:

* Environment variables

---

## Install CORS

```bash
npm install cors
```

Purpose:

* Frontend-backend communication

---

## Install Cookie Parser

```bash
npm install cookie-parser
```

Purpose:

* Cookie handling

---

## Install Multer

```bash
npm install multer
```

Purpose:

* File upload handling

---

## Install Cloudinary

```bash
npm install cloudinary
```

Purpose:

* Cloud image storage

---

# Environment Variables

Create a `.env` file.

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

# Run Backend

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:4000
```

---

# Backend Workflow

## Authentication Workflow

1. User sends login credentials.
2. Backend validates credentials.
3. Password checked using bcrypt.
4. JWT token generated.
5. Token stored in cookies.
6. Protected routes verify token.

---

## Article Creation Workflow

1. Author sends article data.
2. Middleware verifies token.
3. Backend validates author role.
4. Data stored in MongoDB.
5. Response returned to frontend.

---

## Image Upload Workflow

1. Multer receives image.
2. Image uploaded to Cloudinary.
3. Cloudinary URL generated.
4. URL stored in MongoDB.

---

# Important Backend Concepts

## Express.js

Used for:

* API creation
* Middleware handling
* Routing

---

## REST API

Used for communication between frontend and backend.

Methods used:

* GET
* POST
* PUT
* PATCH
* DELETE

---

## MongoDB

Used to store:

* Users
* Articles
* Comments

---

## Mongoose

Used for:

* Schema validation
* Database operations

---

## JWT Authentication

Used for:

* Secure login
* User verification
* Protected APIs

---

## bcryptjs

Used to hash passwords securely.

---

## Middleware

Used for:

* Authentication
* Authorization
* Error handling

---

# API Endpoints

## Common APIs

| Method | Endpoint                    | Purpose         |
| ------ | --------------------------- | --------------- |
| POST   | /common-api/login           | Login           |
| GET    | /common-api/logout          | Logout          |
| PUT    | /common-api/change-password | Change password |

---

## Author APIs

| Method | Endpoint                        | Purpose                |
| ------ | ------------------------------- | ---------------------- |
| POST   | /author-api/articles            | Create article         |
| PUT    | /author-api/articles            | Edit article           |
| PATCH  | /author-api/articles/:id/status | Delete/Restore article |

---

## User APIs

| Method | Endpoint              | Purpose           |
| ------ | --------------------- | ----------------- |
| GET    | /user-api/articles    | Get all articles  |
| GET    | /user-api/article/:id | Get article by ID |
| PUT    | /user-api/articles    | Add comments      |

---

# Security Features

* JWT Authentication
* Password Hashing
* Role-Based Authorization
* Protected Routes
* Secure Middleware

---

# Error Handling

Backend handles:

* Authentication errors
* Validation errors
* Database errors
* Route errors

---

# Backend Learning Outcomes

* REST API Development
* Authentication Systems
* MongoDB Integration
* Middleware Usage
* Cloudinary Integration
* Secure Backend Development

---

# Conclusion

The backend provides secure APIs, authentication, authorization, database management, and cloud image upload functionality for the Blog Platform.

```
```
