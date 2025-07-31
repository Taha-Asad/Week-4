# Real-Time Chat Application

A modern, full-stack real-time chat application developed as part of the **Skillify Zone Internship**. Built using **Node.js**, **Express**, and **MongoDB**, it supports user authentication, WebSocket-based communication, and media sharing via Cloudinary.

---

## 🧠 Key Features

* **User Authentication** — Secure registration and login with JWT
* **Real-Time Messaging** — Bi-directional communication using Socket.IO
* **Persistent Storage** — MongoDB stores users and chat messages
* **Media Uploads** — Image support via Cloudinary integration
* **Modular Codebase** — Cleanly structured backend for easy maintenance

---

## 📁 Project Structure

```
Week-4-main/
│
├── backend/
│   ├── config/             # MongoDB connection
│   ├── src/
│   │   ├── controllers/    # Auth and messaging logic
│   │   ├── middleware/     # JWT & password hashing
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # REST API endpoints
│   │   ├── lib/            # Cloudinary, Socket.IO, utilities
│   │   └── server.js       # Backend entry point
│   └── package.json        # Backend scripts & dependencies
│
├── frontend/               # Placeholder (if needed)
├── package.json            # Root project scripts
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the `backend/` directory:

```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4. Start the Server

```bash
npm start
```

This will spin up the backend server and initialize WebSocket connections.

---

## 📡 API Reference

### Authentication

* `POST /api/auth/register` — Register a new user
* `POST /api/auth/login` — Login and receive JWT token

### Messages

* `GET /api/messages/:id` — Fetch messages between users
* `POST /api/messages` — Send a message

---

## 🧩 Backend Modules

### Controllers

* `authController.js` — Handles registration and login
* `messagesController.js` — Processes message send/receive

### Models

* `userModel.js` — User schema
* `messageModel.js` — Chat message schema

### Middleware

* `authMiddleware.js` — Route protection with JWT
* `hashPassword.js` — Password hashing logic

### Lib

* `cloudinary.js` — Cloudinary setup for media
* `socket.js` — WebSocket logic
* `utlis.js` — Utility functions

---

## 💻 Scripts

```bash
npm run build   # Build frontend (if any) and prepare environment
npm start       # Run backend server
```

---

## 💡 Notes

* Designed for easy expansion — frontend integration is optional
* Consider adding form validation and error handling for production use
* Deployment ready for platforms like Heroku, Railway, or Vercel (for frontend)

---

## ✍️ Author

Developed by a Skillify Zone intern as part of the 4th-week project challenge.

---

## 📄 License

This project is open-source for educational and internship evaluation purposes.
