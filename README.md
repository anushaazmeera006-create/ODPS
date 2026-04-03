# Organ Donation Management System

Full-stack web application for donor/recipient registration, organ request management, waiting-list prioritization, and organ-to-recipient matching.

## Tech Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: MySQL
- ORM: Prisma

## Project Structure

- `client`: React frontend
- `server`: Express API + Prisma
- `server/db`: SQL schema and seed files

## Features

- Register users as donor or recipient
- Donor can add available organs
- Recipient can request organ with urgency
- Matching engine:
  - filters same organ type
  - checks blood group compatibility
  - computes `priority_score = urgency + waiting_time_days`
  - sorts by highest priority
  - creates match and assigns hospital
  - marks organ as allocated
- Audit logs for key actions
- Dashboard stats for donors, recipients, and matches

## Database Setup

1. Create MySQL database:
   - Example: `organ_system`
2. In `server`, copy `.env.example` to `.env` and update `DATABASE_URL`.
   - Example: `DATABASE_URL="mysql://root:password@localhost:3306/organ_system"`
3. Run Prisma migration:
   - `npx prisma migrate dev --name init`
4. Seed data:
   - `npx prisma db seed`

SQL files are provided and include your full sample dataset:

- `server/db/schema.sql`
- `server/db/seed.sql`

You can execute these SQL files directly from MySQL Workbench (recommended for your dataset).

## Run Backend

```bash
cd server
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

Backend runs on `http://localhost:5000`.

## Run Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs on Vite default port (`http://localhost:5173`).

## API Endpoints

- `POST /register`
- `POST /donor/add-organ`
- `POST /recipient/request`
- `GET /organs`
- `GET /waiting-list`
- `POST /match/run`
- `GET /matches`
- `GET /stats`

## Postman Testing Flow

1. Register donor and recipient via `/register`.
2. Add organs using `/donor/add-organ`.
3. Create recipient request via `/recipient/request`.
4. Check `/waiting-list`.
5. Run `/match/run`.
6. Check `/matches`.
