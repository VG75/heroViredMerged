# UniApply - Local Development Setup Guide

A unified university application management system for students to apply to universities and for admins to review applications.

## Tech Stack

### Backend
- **Framework:** Express.js
- **Database:** PostgreSQL 15 (Docker)
- **Cache:** Redis (Docker)
- **ORM:** Sequelize
- **Authentication:** JWT

### Frontend
- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v7

---

## Prerequisites

Before you begin, ensure you have installed:
- **Node.js** >= 18.0.0
- **Docker** and **Docker Compose**
- **npm** or **yarn**
- **Git**

---

## Local Development Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd heroViredMerged
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Update .env with your values (or use defaults for local dev):
# - DATABASE_URL=postgres://postgres:admin123@localhost:5433/uniapply
# - JWT_SECRET=<generate a secure random string>
# - PORT=5000
# - REDIS_URL=redis://localhost:6379
```

**Generate a secure JWT secret:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
Copy the output and replace `JWT_SECRET` value in `.env`

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# .env should contain:
# VITE_API_URL=http://localhost:5000/api
```

### 4. Start Docker Services

```bash
cd ../backend

# Start PostgreSQL and Redis
docker-compose up -d

# Verify containers are running
docker-compose ps
```

You should see:
- `backend-postgres-1` running on port 5433
- `my-redis` running on port 6379

### 5. Initialize Database

```bash
# Start backend server (will create tables automatically)
npm run dev
```

The backend will:
- Connect to PostgreSQL
- Create database tables using Sequelize
- Connect to Redis
- Start server on http://localhost:5000

### 6. Seed Database (Optional)

```bash
# In a new terminal, from backend directory
node seed.js
```

This creates:
- 3 sample universities (IIT Delhi, IIT Bombay, BITS Pilani)
- 9 sample programs

### 7. Start Frontend

```bash
cd ../frontend
npm run dev
```

Frontend will start on http://localhost:3000

---

## Running the Application

### Start All Services

**Terminal 1 - Docker:**
```bash
cd backend
docker-compose up -d
```

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 3 - Frontend:**
```bash
cd frontend
npm run dev
```

### Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **API Documentation:** See `backend/API_TESTING.md`

---

## Default Test Account

After seeding, you can create test accounts:

**Register a student:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Student",
    "email": "student@test.com",
    "password": "test123",
    "role": "STUDENT"
  }'
```

**Register an admin:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Admin",
    "email": "admin@test.com",
    "password": "admin123",
    "role": "ADMIN"
  }'
```

---

## Troubleshooting

### Port 5432 Already in Use

If you have PostgreSQL installed locally, it may conflict with Docker:

**Solution:** We use port 5433 for Docker PostgreSQL to avoid conflicts.

If you still have issues:
```bash
# Check what's using port 5432
sudo lsof -i :5432

# Stop local PostgreSQL (if needed)
sudo service postgresql stop
```

### Docker Containers Won't Start

```bash
# Stop and remove all containers
docker-compose down -v

# Restart fresh
docker-compose up -d
```

### Backend Won't Connect to Database

1. Check Docker containers are running: `docker-compose ps`
2. Verify .env has correct DATABASE_URL
3. Wait 5-10 seconds after starting Docker for PostgreSQL to initialize
4. Check logs: `docker-compose logs postgres`

### Frontend Can't Connect to Backend

1. Verify backend is running on http://localhost:5000
2. Check frontend/.env has `VITE_API_URL=http://localhost:5000/api`
3. Check browser console for CORS errors
4. Restart frontend dev server after .env changes

---

## Available Scripts

### Backend
```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
node seed.js     # Seed database with sample data
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Docker
```bash
docker-compose up -d      # Start containers in background
docker-compose down       # Stop and remove containers
docker-compose down -v    # Stop and remove containers + volumes
docker-compose ps         # List running containers
docker-compose logs       # View logs
```

---

## Project Structure

```
heroViredMerged/
├── backend/
│   ├── src/
│   │   ├── config/         # Database & Redis config
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/     # Auth, caching, etc.
│   │   ├── models/         # Sequelize models
│   │   ├── routes/         # API routes
│   │   └── server.js       # Entry point
│   ├── .env.example
│   ├── docker-compose.yml
│   ├── package.json
│   └── seed.js
│
├── frontend/
│   ├── src/
│   │   ├── api/            # Axios config
│   │   ├── components/     # React components
│   │   ├── context/        # React context
│   │   ├── pages/          # Page components
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env.example
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

---

## Features

### Student Features
- Register and login
- Browse universities and programs
- Create and submit applications
- Upload documents
- Track application status
- Create support tickets
- Make payments

### Admin Features
- Admin dashboard
- Review student applications
- Verify/reject documents
- Update application status
- Respond to support tickets
- View payment history

---

## Next Steps

- See `backend/API_TESTING.md` for complete API documentation
- Configure production environment variables for deployment
- Set up CI/CD pipeline
- Add automated testing

---

## Production Deployment

### Environment Variables

**Backend (Render):**
- `DATABASE_URL` - Provided by Render PostgreSQL addon
- `JWT_SECRET` - Strong random string
- `PORT` - Provided by Render
- `CLIENT_URL` - Your Vercel frontend URL
- `REDIS_URL` - Optional: Render Redis addon

**Frontend (Vercel):**
- `VITE_API_URL` - Your Render backend URL + `/api`

### Deployment Notes

1. **Render Backend:**
   - Use Render's PostgreSQL addon (managed database)
   - Port will be 5432 (Render default)
   - Set all environment variables in Render dashboard
   - Build command: `npm install`
   - Start command: `npm start`

2. **Vercel Frontend:**
   - Set `VITE_API_URL` in Vercel environment variables
   - Build command: `npm run build`
   - Output directory: `dist`

---

## Support

For issues or questions, please check:
- `backend/API_TESTING.md` for API documentation
- Docker logs: `docker-compose logs`
- Backend logs in terminal
- Browser console for frontend errors

---

## License

[Add your license here]
