# FRONTEND README.md

````md
# Frontend – Blog Platform

## Overview
This is the frontend part of the Blog Platform project built using React.js, Vite, Tailwind CSS, and Zustand.

The frontend handles:
- User Interface
- Routing
- Authentication UI
- Article Management UI
- State Management
- API Communication

---

# Technologies Used

- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- Zustand
- React Hook Form
- React Hot Toast

---

# Folder Structure

```bash
Frontend
│
├── public
│
├── src
│   ├── components
│   ├── store
│   ├── lib
│   ├── styles
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── README.md
````

---

# Installation Commands

## Step 1: Open Terminal

```bash
cd Frontend
```

---

## Step 2: Install Dependencies

```bash
npm install
```

This command installs all required frontend packages.

---

# Important Packages Installation

## Install React Router

```bash
npm install react-router-dom
```

Purpose:

* Page navigation
* Protected routes

---

## Install Axios

```bash
npm install axios
```

Purpose:

* API calls to backend

---

## Install Tailwind CSS

```bash
npm install -D tailwindcss @tailwindcss/vite
```

Purpose:

* Styling
* Responsive UI

---

## Install Zustand

```bash
npm install zustand
```

Purpose:

* Global state management

---

## Install React Hook Form

```bash
npm install react-hook-form
```

Purpose:

* Form validation
* Form handling

---

## Install React Hot Toast

```bash
npm install react-hot-toast
```

Purpose:

* Notification messages

---

# Run Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Frontend Workflow

## User Authentication Flow

1. User opens login page.
2. User enters credentials.
3. Axios sends request to backend.
4. Backend verifies credentials.
5. JWT token returned.
6. User redirected to dashboard.

---

## Article Viewing Flow

1. Frontend fetches articles using Axios.
2. Articles displayed dynamically.
3. User clicks article.
4. Detailed article page opens.

---

## Article Creation Flow

1. Author enters article data.
2. Form validated.
3. Data sent to backend.
4. MongoDB stores article.
5. UI updates automatically.

---

# Important Frontend Concepts

## React Components

Reusable UI blocks.

Examples:

* Navbar
* Footer
* ArticleCard
* LoginForm

---

## React Router

Used for:

* Navigation
* Dynamic routes
* Protected routes

---

## Zustand State Management

Used to store:

* User authentication
* User details
* Article data

---

## Axios

Used for:

* GET requests
* POST requests
* PUT requests
* DELETE requests

---

## Tailwind CSS

Used for:

* Fast UI design
* Responsive layouts
* Utility-first styling

---

# Protected Routes

Protected routes allow only authenticated users.

Example:

* Only authors can access article creation page.

---

# Error Handling

Frontend handles:

* Invalid login
* API errors
* Route errors
* Form validation errors

---

# Build Frontend

```bash
npm run build
```

Purpose:

* Creates production-ready build.

---

# Preview Production Build

```bash
npm run preview
```

---

# Frontend Learning Outcomes

* React Component Architecture
* Routing
* State Management
* API Integration
* Responsive Design
* Authentication Handling
* Form Validation

---

# Conclusion

The frontend provides a responsive and dynamic user interface for the Blog Platform using modern React development practices.





