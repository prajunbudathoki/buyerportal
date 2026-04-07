# Buyer Portal – Take-Home Assessment

A simple full-stack buyer portal built for a real-estate broker.

This project allows users to register, log in, view available properties, and manage their favourite properties securely.

---

## Features

### Authentication
- User registration with **name, email, and password**
- User login using **JWT-based authentication**
- Passwords are securely hashed using **bcryptjs**

### Buyer Dashboard
- View authenticated user details (**name and role**)
- View a list of available properties
- Add properties to favourites
- Remove properties from favourites
- View **My Favourites**

### Security & Access Control
- Protected API routes using JWT
- Users can only view and modify **their own favourites**
- Duplicate favourites are prevented at the database level

---

## Tech Stack

### Backend
- Node.js
- TypeScript
- Express.js
- Prisma ORM
- PostgreSQL
- JWT
- bcryptjs

### Frontend
- React
- TypeScript
- Vite
- Axios
- React Router DOM

---

## Project Structure

```bash
buyer-portal/
  backend/
  frontend/
  screenshots/
  README.md