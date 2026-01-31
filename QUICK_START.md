# Quick Start Guide - Updated Features

## 🆕 New Features Available

### 1. Password Reset (Backend Implementation)

**Frontend Flow**:
1. User visits `/forgot-password`
2. Enters email → Backend sends OTP
3. Enters OTP + new password → Password reset complete

**API Endpoints**:
- `POST /api/v1/auth/forgot-password` - Sends OTP to email
- `POST /api/v1/auth/reset-password` - Verifies OTP and updates password

**Test It**:
```bash
# Use demo account
Email: demo@bondplatform.com
Password: Demo@123

# Request OTP
curl -X POST http://localhost:3210/api/v1/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@bondplatform.com"}'

# Check backend console for OTP (or email if SMTP configured)
# Then reset password with OTP
```

---

### 2. Sell Bonds

**How to Use**:
1. Buy some bonds first (need holdings)
2. Navigate to portfolio
3. Select bond to sell
4. Enter quantity and price
5. Confirm sale → Wallet credited

**API Endpoint**:
```bash
POST /api/v1/trading/sell

Body:
{
  "bond_id": "YOUR_BOND_ID",
  "quantity": 5,
  "price_per_unit": 1050
}
```

---

### 3. Complete Portfolio API

Now includes:
- `GET /portfolio` - Full portfolio overview
- `GET /portfolio/holdings` - Detailed holdings
- `GET /portfolio/performance` - P&L calculations

---

### 4. Wallet Deposits

**API Endpoint**:
```bash
POST /api/v1/payments/deposit

Body:
{
  "amount": 50000,
  "method": "upi"
}
```

**Frontend**: Visit `/deposit` page

---

## 🔧 Configuration Changes

### Frontend Environment Variables

**NEW REQUIRED VARIABLES** in `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3210/api/v1
NEXT_PUBLIC_SOCKET_URL=http://localhost:3210
```

**Old EmailJS variables** are now optional (deprecated).

---

### Backend Environment Variables

**UPDATED** in `backend/.env`:
- `JWT_SECRET` - Now uses secure 64-char hex key
- `JWT_REFRESH_SECRET` - Now uses secure 64-char hex key
- `MONGODB_URI` - Works for both local and Docker

---

## 🐳 Docker Improvements

All services now have health checks:

```bash
# Start services
docker-compose up -d

# Check health status
docker ps

# You should see "healthy" after 30-60 seconds
```

---

## 📝 Demo Account Credentials

```
Email: demo@bondplatform.com
Password: Demo@123
Initial Balance: ₹10,00,000 (paper trading)
```

**Admin Account**:
```
Email: admin@bondplatform.com
Password: Admin@123
```

---

## 🚀 Running the Platform

### Option 1: Docker (Recommended)
```bash
docker-compose up --build
```
- Backend: http://localhost:3210
- Frontend: http://localhost:3000
- MongoDB: localhost:27017
- Redis: localhost:6379

### Option 2: Local Development
```bash
# Terminal 1: Backend
cd backend
npm install
npm run dev

# Terminal 2: Frontend
cd frontend
npm install
npm run dev
```

---

## 📚 API Documentation

Full documentation available at: [docs/API.md](docs/API.md)

**Newly Documented Endpoints**: 15+
- Password reset flow
- Sell bonds
- Portfolio endpoints
- Payment endpoints
- Profile management

---

## ✅ What's Fixed

- ✅ Socket connection port (was 3211, now 3210)
- ✅ JWT secrets (now cryptographically secure)
- ✅ OTP security (moved from client to server)
- ✅ MongoDB connection (works in Docker & local)
- ✅ Missing environment variables
- ✅ Docker health checks
- ✅ Missing sell bond feature
- ✅ Incomplete API documentation
- ✅ Duplicate profile endpoint removed

---

## 🧪 Test Scenarios

### 1. Complete User Journey
```
1. Register → Login
2. Deposit funds (₹50,000)
3. Browse bonds (/marketplace)
4. Buy bond (10 units)
5. Check portfolio
6. Sell bond (5 units)
7. Check updated balance
```

### 2. Password Reset
```
1. Go to /forgot-password
2. Enter email
3. Check console/email for OTP
4. Enter OTP + new password
5. Login with new password
```

### 3. Real-time Updates
```
1. Open two browser windows
2. Login to same account
3. Buy bond in window 1
4. See portfolio update in window 2 (via WebSocket)
```

---

## 🔐 Security Notes

1. **JWT Secrets**: Generated new secure keys. **DO NOT commit to Git in production**
2. **OTP Storage**: Currently in-memory (use Redis in production)
3. **Email Service**: Configure SMTP for production (currently Ethereal for dev)
4. **Rate Limiting**: 100 requests/minute per IP
5. **CORS**: Configured for localhost (update for production domain)

---

## 📞 Support

For issues or questions:
1. Check [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)
2. Review [docs/API.md](docs/API.md)
3. Check console logs (backend terminal)
4. Verify environment variables are set

---

*Updated: January 31, 2026*
