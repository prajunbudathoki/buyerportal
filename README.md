# Buyer Portal - Real Estate Favourites

A clean, full-stack real estate buyer portal for managing property favourites. Built as a technical assessment for Junior Full-Stack Engineer role.

## Tech Stack

- **Backend:** Node.js, Express.js, TypeScript, Prisma ORM, PostgreSQL, JWT, bcryptjs, Zod.
- **Frontend:** React (Vite), TypeScript, Axios, React Router DOM, Tailwind CSS, Lucide icons.

## Project Structure

```
buyer-portal/
  backend/           # Express server & Prisma configuration
    prisma/          # Database schema and seed script
    src/             # Source code (controllers, routes, etc.)
  frontend/          # React application
    src/             # Source code (components, pages, hooks, etc.)
  README.md          # Project documentation
```

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- PostgreSQL (Local or Docker)

### Backend Setup

1. `cd backend`
2. `npm install`
3. Create `.env` from `.env.example` and update `DATABASE_URL` and `JWT_SECRET`.
4. Run migrations: `npx prisma migrate dev --name init`
5. Seed database: `npm run prisma:seed`
6. Start dev server: `npm run dev` (Runs on http://localhost:5000)

### Frontend Setup

1. `cd frontend`
2. `npm install`
3. Create `.env` from `.env.example` and update `VITE_API_URL` (default is http://localhost:5000/api).
4. Start dev server: `npm run dev` (Runs on http://localhost:5173)

## Example User Flow

1. **Register:** Go to `/register`, enter name, email, and password.
2. **Login:** Redirected to `/login` (or automatic login), enter credentials.
3. **Dashboard:** View all available real estate properties.
4. **Favourite:** Click the heart icon on a property to add it to your "My Favourites".
5. **View Favourites:** Toggle to the "Favourites" view to see only your saved properties.
6. **Remove Favourite:** Click the heart icon again to remove it from your list.
7. **Logout:** Click the logout button to clear the session.

## Security Decisions

- **Password Hashing:** Used `bcryptjs` with 10 salt rounds to hash passwords before storing.
- **JWT Authentication:** Implemented stateless authentication using JSON Web Tokens.
- **Ownership Rules:** Favourites are strictly linked to the authenticated user's ID extracted from the JWT. Users cannot modify or view others' favourites.
- **Input Validation:** Used `Zod` to strictly validate request bodies on the server-side.
- **Protected Routes:** Frontend dashboard is protected; unauthorized users are redirected to login.
