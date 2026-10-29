# 🟢 Russo’s View — Enter the Multiverse

**A Marvel-inspired MERN Stack E-Commerce Experience**

Explore a universe of legendary heroes, iconic collectibles, and powerful artifacts. Russo’s View is an e-commerce web application inspired by the Marvel universe, designed with a modern green-themed interface and a responsive user experience.

🌐 **Live Website:** https://russos-view.vercel.app/  
💻 **GitHub Repository:** https://github.com/dtharunraj/russos-view

## ✨ Features

- 🦸 **Marvel-Inspired Store** — Discover merchandise inspired by iconic heroes and the multiverse.
- 🛍️ **Product Catalog** — Browse collectibles, apparel, accessories, and superhero-inspired products.
- 🔐 **Authentication** — Firebase Authentication integration, including Google sign-in setup.
- 🛒 **Shopping Cart** — Add products to your cart and manage your selections.
- 📱 **Responsive Design** — Designed for desktop and mobile screens.
- 🟢 **Modern UI** — A green-themed interface with a superhero-inspired visual identity.
- 🚀 **Cloud Deployment** — Frontend hosted on Vercel and backend hosted on Render.

## 🛒 Product Categories

- T-Shirts & Hoodies
- Caps & Hats
- Watches
- Serum Bottles & Collectibles
- Thor Hammers & Props
- Iron Man Helmets
- Spider-Man Accessories
- X-Men & Fantastic Four Merchandise
- Action Figures & Collectibles

## 🛠️ Tech Stack

**Frontend**
- React.js
- JavaScript
- Tailwind CSS
- Firebase Authentication

**Backend**
- Node.js
- Express.js
- MongoDB

**Tools & Deployment**
- Git and GitHub
- Vercel
- Render
- Firebase Console

## ⚙️ Getting Started

### Prerequisites

Make sure you have installed:

- Node.js and npm
- Git
- A Firebase project
- MongoDB connection details for backend development

### 1. Clone the Repository

```bash
git clone https://github.com/dtharunraj/russos-view.git
cd russos-view
```

### 2. Set Up the Frontend

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` directory:

```env
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
```

Replace the placeholder values with your Firebase Web App configuration.

Start the development server:

```bash
npm start
```

### 3. Set Up the Backend

Open a separate terminal:

```bash
cd backend
npm install
```

Configure the required backend environment variables in `backend/.env`, based on the variables referenced by your backend code.

**Never commit `.env` files, private keys, database passwords, or payment secrets to GitHub.**

Start the backend using the script defined in `backend/package.json`, for example:

```bash
npm start
```


## 🌍 Deployment

- **Frontend:** Vercel
- **Backend:** Render

For production, configure the frontend to use the deployed backend URL and set the required Firebase environment variables in Vercel.

## 🔒 Security Notes

- Keep private credentials out of source control.
- Store backend secrets in Render environment variables.
- Configure Firebase Authentication and authorized domains in Firebase Console.
- Validate and secure backend routes before handling real customer data or payments.

## 🎯 Project Goal

Russo’s View aims to combine superhero-inspired collectibles with a modern e-commerce experience while demonstrating practical skills in React, Tailwind CSS, Firebase Authentication, Node.js, and Express.

## 👨‍💻 Author

**Tharun Raj**

- GitHub: [@dtharunraj](https://github.com/dtharunraj)

---

*Enter the multiverse. Discover your next legendary collectible. 🟢*
