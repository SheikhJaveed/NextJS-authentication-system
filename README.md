# **Next.js Authentication System 🔐**

This project implements a **secure authentication system** using Next.js, Node.js, and MongoDB. It includes **user registration, email verification, password reset, and token-based authentication** to enhance security.

## 🚀 **Features**
- **User Registration & Login** – Secure authentication with hashed passwords.
- **Email Verification** – Users must verify their email before accessing their accounts.
- **Password Reset** – Secure one-time token-based password reset.
- **Token-Based Authentication** – Secure user authentication without storing sensitive data.
- **Protected Routes** – Restrict access to authenticated users only.

## 🛠 **Tech Stack**
- **Frontend:** Next.js (React Framework)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Authentication:** JWT, Bcrypt
- **Email Service:** Nodemailer and Mailtrap


## 🏗 **Installation & Setup**
1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/nextjs-auth.git
   cd nextjs-auth

2.  **Install dependencies** <br>
     npm install

3. **Content of .env file** <br>
MONGODB_URI=your_mongodb_connection_string  <br>
JWT_SECRET=your_jwt_secret  <br>
EMAIL_USER=your_smtp_user  <br>
EMAIL_PASS=your_smtp_pass  <br>

4. **Run the server** <br>
npm run dev  <br>
Navigate to http://localhost:3000
