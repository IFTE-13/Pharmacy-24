# Pharmacy 24

**Pharmacy 24** is a web-based pharmacy management system built with **Next.js**, designed to streamline administrative tasks for pharmacy operations.  
It provides an **admin dashboard** for managing users, products, and transactions, with secure authentication and role-based access control.  
The application leverages a **MySQL database**, **JWT for authentication**, and a **modern UI with shadcn/ui components**.

---

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