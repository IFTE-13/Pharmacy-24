# Pharmacy 24

**Pharmacy 24** is a web-based pharmacy management system built with **Next.js**, designed to streamline administrative tasks for pharmacy operations.  
It provides an **admin dashboard** for managing users, products, and transactions, with secure authentication and role-based access control.  
The application leverages a **MySQL database**, **JWT for authentication**, and a **modern UI with shadcn/ui components**.

---

![ui](https://github.com/user-attachments/assets/725ec310-8f0b-4eef-bdae-17a34d1c8b12)

## 🚀 Features

- **Admin Dashboard**: Manage users, products, and transactions with a user-friendly interface.  
- **User Management**: View and manage non-admin user details (ID, name, email, role, phone, address).  
- **Product Management**: Create, update, and delete products (name, price, company) with confirmation prompts for deletions.  
- **Transaction Tracking**: View all transactions with details (ID, user ID, email, amount, description).  
- **Profile Management**: Admins can update their profile (name, phone, address) and change passwords securely.  
- **Role-Based Access Control**: Restricts access to admin routes (`/admin`, `/api/users`, `/api/products`) to admin users only.  
- **Authentication**: Secure JWT-based authentication with cookie-based token storage.  
- **Responsive UI**: Built with **shadcn/ui** components and **Tailwind CSS** for a modern, responsive design.  
- **Toast Notifications**: User feedback via `react-hot-toast` for actions like product creation, updates, deletions, and profile changes.  

---

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, shadcn/ui, Tailwind CSS  
- **Backend**: Next.js API Routes, MySQL, JWT  
- **Libraries**:
  - `jsonwebtoken` for authentication  
  - `bcryptjs` for password hashing  
  - `react-hot-toast` for notifications  
  - `lucide-react` for icons  
- **Database**: MySQL  
- **Environment**: Node.js  

---

## 📦 Prerequisites

- **Node.js** (v18 or higher)  
- **MySQL** (v8 or higher)  
- **Git**  
- **npm** or **yarn**

## ⚙️ Installation

1. **Clone the Repository**:
```bash
git clone https://github.com/your-username/pharmacy-24.git
cd pharmacy-24
```
2. Install Dependencies:
```bash
npm install
```
3. Set Up Environment Variables:
Create a .env.local file in the root directory and add:
```bash
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=pharmacy_24_db
JWT_SECRET=your_jwt_secret_key
```
4. Set Up MySQL Database:
```bash
CREATE DATABASE pharmacy_24_db;
USE pharmacy_24_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') NOT NULL,
  phone VARCHAR(50),
  address TEXT,
  created_at DATETIME NOT NULL
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  company VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL
);

CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  email VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  description TEXT NOT NULL,
  created_at DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```
Insert a sample admin user (password: admin123 hashed with bcrypt):
```bash
INSERT INTO users (name, email, password, role, created_at)
VALUES ('Admin User', 'admin@example.com', '$2a$10$your_bcrypt_hashed_password', 'admin', NOW());
```
Generate bcrypt hash for admin123:
```bash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('admin123', 10).then(hash => console.log(hash));"
```
5. Run the Development Server:
```bash
npm run dev
```
6. Open http://localhost:3000 in your browser.

---

## 📖 Usage
### 🔑 Login
- Navigate to /login and use credentials (e.g., admin@example.com, admin123).
- Admins are redirected to /admin, users to /shop.

### 📊 Admin Dashboard
- Users Tab: View all non-admin users.
- Products Tab: Add, edit, or delete products (with confirmation prompts).
- Transactions Tab: View all transactions.
- Profile Tab: Update admin profile or change password.

### ⚠️ Error Handling
- Unauthorized (401) or forbidden (403) errors redirect to /login or /shop with toast notifications.
- Toast notifications provide feedback for all actions.

---

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch:
```bash
git checkout -b feature/YourFeature
```
3. Commit your changes:
```bash
git commit -m "Add YourFeature"
```
4. Push to the branch:
```bash
git push origin feature/YourFeature
```
   
---

## 💡 Shout-Out to Grok

This project was developed with the assistance of Grok, an AI created by xAI

Grok provided guidance on:
* Fixing middleware issues
* Resolving database schema errors
* Implementing toast notifications
* Generating this README

### Special thanks to Grok (version: continuously updated as of September 17, 2025) for its insightful debugging and code suggestions! 🎉

--- 

## 📜 License
This project is licensed under the MIT License. See the LICENSE file for details.
