# ✨ AUREA Jewelry Store — Full-Stack E-Commerce Website

A full-stack jewelry e-commerce web application built as a course project. 
Users can browse jewelry products, create an account, add items to their cart, 
and go through a checkout flow. Built with React on the frontend and 
Express + MongoDB on the backend.

## 🛠️ Tech Stack
**Frontend:** React, React Router, CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB (Mongoose)

## ✨ Features
- 🔐 User authentication (signup & login)
- 💍 Browse jewelry products by category
- 🛒 Add to cart/bag functionality
- 🧾 Checkout flow (no real payment processing — course project scope)
- 📩 Contact form
- 📱 Responsive design

## 📂 Project Structure

web project/
├── my_projnodejs/ # React frontend
│ └── src/
│ ├── components/
│ ├── pages/
│ └── context/
└── my-express-app/ # Express backend
├── models/
├── routes/
└── server.js


## 🚀 Getting Started

### Prerequisites
- Node.js installed on your machine
- A MongoDB connection (local or MongoDB Atlas)

### Setup

**1. Clone the repo**
```bash
git clone https://github.com/haleemabibi27/jewelry-store-react.git
cd jewelry-store-react
```

**2. Set up the backend**
```bash
cd my-express-app
npm install
```
Create a `.env` file inside `my-express-app` with:

MONGO_URI=your_mongodb_connection_string
PORT=5000

Then start the server:
```bash
node server.js
```

**3. Set up the frontend**
```bash
cd ../my_projnodejs
npm install
npm run dev
```

The app should now be running locally.

## 🎯 What I Learned
Building this project taught me how to connect a React frontend to an 
Express/MongoDB backend, manage global cart state using Context API, and 
implement user authentication in a full-stack application.

## 📬 Contact
Haleema Bibi — lesamona852@gmail.com
