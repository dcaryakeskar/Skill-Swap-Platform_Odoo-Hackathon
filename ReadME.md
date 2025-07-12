# ⚡ Skill Swap Platform

A full-stack mini platform enabling users to exchange skills directly with others. Users can list their skills, search others by skill, request swaps, and receive feedback — all powered by a robust Node.js + SQLite backend and a slick vanilla HTML/CSS/JS frontend.

---

## 🔧 Project Structure

```bash
skill-swap-platform/
├── backend/              # Express + SQLite Backend
│   ├── models/           # Sequelize models
│   ├── routes/           # API endpoints
│   ├── middleware/       # Auth, Admin check, etc.
│   ├── uploads/          # Uploaded profile images
│   └── index.js          # Main server entry point
├── frontend/             # UI built in Vanilla HTML/CSS/JS
│   ├── index.html        # Login + App root
│   ├── styles.css        # Tailored styles
│   └── app.js            # Login + fetch logic
├── database.sqlite       # SQLite DB file
└── README.md             # This documentation
```

---

## 🛠️ Technologies Used

### Backend:

* **Node.js + Express**: Server and REST API
* **Sequelize ORM**: Database models and queries
* **SQLite**: Lightweight local SQL database
* **bcryptjs**: Password hashing
* **jsonwebtoken (JWT)**: Secure authentication
* **multer**: Profile photo uploads

### Frontend:

* **Vanilla HTML/CSS/JavaScript**
* **Responsive Design** using pure CSS

---

## 🚀 Features Overview

### 👤 User Management

* Register and Login
* JWT-based session authentication
* Profile includes:

  * Name
  * Email
  * Location (optional)
  * Profile Photo (optional)
  * Skills Offered & Wanted
  * Availability (e.g., weekends, evenings)
  * Privacy toggle: public/private

### 🔁 Skill Swaps

* Users can browse and search other public users by skill (e.g., "React", "Excel")
* Request skill swaps with others
* Accept/Reject/Cancel swap offers
* View pending, active, or rejected swaps

### ⭐ Feedback & Rating

* Leave feedback post swap
* Star-based average rating is updated
* Prevent multiple feedbacks per swap

### 🔐 Admin Panel

* View all users and swaps
* Ban inappropriate users
* Reject spammy skill descriptions
* Broadcast platform-wide messages (e.g., downtime alert)
* Download user reports, feedback logs, and swap statistics

---

## 🔄 API Endpoints

### Auth Routes

```
POST /api/auth/register      # Register new user
POST /api/auth/login         # Login and receive JWT
```

### User Routes

```
GET /api/users/profile        # Get logged-in user profile
PUT /api/users/profile        # Update profile
POST /api/users/upload        # Upload profile photo
GET /api/users/search?q=React # Search users by skill
```

### Swap Routes

```
POST   /api/swaps/           # Create new swap
GET    /api/swaps/           # View all relevant swaps
PUT    /api/swaps/:id        # Accept/Reject/Cancel swap
DELETE /api/swaps/:id        # Delete unaccepted swap
```

### Feedback Routes

```
POST /api/feedback/:swapId   # Submit feedback after swap
```

### Admin Routes

```
PUT  /api/admin/user/ban/:id     # Ban user
PUT  /api/admin/skill/review     # Reject bad skill descriptions
PUT  /api/admin/message          # Broadcast system message
PUT  /api/admin/report           # Get all users + stats
```

---

## 🛡️ Security

* Passwords hashed using `bcryptjs`
* JWT tokens for all protected routes
* Role-based middleware (user vs admin)
* Sanitization of user input
* Profile photo upload restricted to `.jpg`, `.png`, `.jpeg`

---

## 🧪 Sample JSONs

### 🧍 Register

```json
{
  "name": "Arya",
  "email": "arya@example.com",
  "password": "123456"
}
```

### 🔐 Login

```json
{
  "email": "arya@example.com",
  "password": "123456"
}
```

### 🔁 Swap Request

```json
{
  "recipientId": 2,
  "offeredSkill": "Photoshop",
  "requestedSkill": "React"
}
```

### 📝 Feedback

```json
{
  "rating": 4,
  "comment": "Very skilled partner and great communication!"
}
```

---

## 🌐 Frontend UI Screens

| Screen        | Description                                                    |
| ------------- | -------------------------------------------------------------- |
| Login Page    | User enters email + password to log in                         |
| Register Page | User creates a new account                                     |
| Profile Page  | User updates photo, skills, availability, privacy              |
| Skill Search  | Browse/search users by skill offered/wanted                    |
| Swap Requests | View/accept/reject swaps (pending/active)                      |
| Feedback Form | Rate and comment after completed swap                          |
| Admin Panel   | Ban users, broadcast messages, review skills, download reports |

All screens are responsive and styled using clean modern CSS — minimalistic, readable, and hackathon-friendly.

---

## 🧠 Design Decisions

* Chose **SQLite** to simplify deployment and testing
* Used **vanilla JS** to make frontend hackathon-portable (no build step)
* Backend logic modularized into routes and middleware for clarity
* Role-based access using `isAdmin` and `isBanned` flags

---

## 🧪 Testing

* All backend routes tested using Postman
* Manual frontend testing via browser + dev tools
* Swap + feedback tested between 2 users

---

## ✅ How to Run

### 1. Start Backend

```bash
cd backend
node index.js
# Server runs on http://localhost:5000
```

### 2. Open Frontend

```bash
Open frontend/index.html in browser
# OR serve with Live Server in VS Code
```

---

## 📝 Notes for Hackathon Judges

* This project is fully offline-capable (SQLite + no frontend build system)
* User management, swaps, and feedback are **fully implemented and tested**
* Admin features are robust — logs, bans, message broadcast all work
* UI is responsive and modular — can be themed quickly for demo
* Designed with performance and simplicity in mind

---

## 📥 Future Scope (Optional Add-ons)

* Skill-based match recommendations
* Chat between users
* Location-based skill mapping
* Gamification with badges & levels

---

## 👨‍💻 Developed By

* Arya Keskar
* Tanay Shah
* Aditya Deshmukh
* Suyash Agarwal

---

## 🏁 End of Documentation

This README is fully self-contained and suitable for sharing in submissions, GitHub repos, or with judges.
