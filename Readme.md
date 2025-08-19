# Ratings Platform

A full-stack web application that allows users to submit ratings for stores registered on the platform.  
The application supports three roles: **System Administrator**, **Normal User**, and **Store Owner** — each with different access levels and functionalities.

---

## 🚀 Tech Stack

- **Backend**: Express.js (Node.js Framework)  
- **Database**: MySQL  
- **Frontend**: React.js  

---

## 📌 Features

### 👨‍💻 System Administrator
- Add new stores, normal users, and admin users.  
- Dashboard with:
  - Total number of users  
  - Total number of stores  
  - Total number of submitted ratings  
- Manage users:
  - View users (Normal/Admin) with Name, Email, Address, and Role  
  - Add new users with validations  
  - Apply filters on Name, Email, Address, Role  
- Manage stores:
  - View stores with Name, Email, Address, and Rating  
- View user details (if user is a Store Owner → also see store rating).  
- Secure logout functionality.  

---

### 👤 Normal User
- User registration and login.  
- Signup form fields:
  - Name (20–60 chars)  
  - Email (valid format)  
  - Address (max 400 chars)  
  - Password (8–16 chars, at least one uppercase + one special character)  
- Update password after login.  
- View all registered stores with:
  - Store Name  
  - Address  
  - Overall Rating  
  - User’s Submitted Rating  
- Search stores by **Name** or **Address**.  
- Submit new ratings (1–5).  
- Modify their submitted rating.  
- Secure logout functionality.  

---

### 🏬 Store Owner
- Login and password update functionality.  
- Dashboard with:
  - List of users who submitted ratings for their store  
  - Average rating of their store  
- Secure logout functionality.  

---

## 📊 Validations
- **Name**: 20–60 characters  
- **Address**: up to 400 characters  
- **Password**: 8–16 characters, must contain at least one uppercase letter and one special character  
- **Email**: must follow standard email format  

---


