# Windows Setup & Run Guide

## Prerequisites
1.  **Node.js**: Installed.
2.  **MongoDB**: Installed (Found at `C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe`).

## 1. Environment Setup (One-time)

### A. Fix MongoDB Connection
The backend requires IPv4. We have updated `backend/.env` to use `127.0.0.1` instead of `localhost`.
If you reset changes, ensure this line exists in `backend/.env`:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/bond_platform
```

### B. Create Data Directory
MongoDB needs a place to store data. Run this in PowerShell (Administrator):
```powershell
mkdir c:\data\db
```

### C. Seed Database
This populates the app with demo users and bonds.
```bash
cd backend
npm run seed
```

## 2. Running the Project (Every Time)

You need to run **3 separate terminals**.

### Terminal 1: Database
Start the MongoDB server manually (since it's not in your PATH).
**PowerShell:**
```powershell
& "C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe" --dbpath="c:\data\db"
```
**Git Bash:**
```bash
"/c/Program Files/MongoDB/Server/8.2/bin/mongod.exe" --dbpath="c:\data\db"
```

### Terminal 2: Backend
```bash
cd backend
npm run dev
```
*Wait for "✓ MongoDB connected" and "✓ Redis Client Connected" (or warning).*

### Terminal 3: Frontend
```bash
cd frontend
npm run dev
```
*Access at: http://localhost:3000*

## 3. Login Credentials

| Role | Email | Password |
|------|-------|----------|
| **Retail** | `basic@bondplatform.demo` | `Basic@CIH2026` |
| **Institution** | `premium@bondplatform.demo` | `Premium@CIH2026` |
| **Admin** | `admin@bondplatform.demo` | `Admin@CIH2026` |

## Troubleshooting
- **500 Error on Login**: Ensure Terminal 1 (MongoDB) is running AND `backend/.env` uses `127.0.0.1`. Restart Terminal 2 after changes.
- **Redis Warning**: "Redis Connection Failed" in Backend is normal if you don't have Redis installed. The app will work without it.
