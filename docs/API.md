# API Documentation

Base URL: `http://localhost:3210/api/v1`

## Authentication

### Register
`POST /api/v1/auth/register`

Create a new user account and automatically initialize their portfolio.

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecureP@ss123",
  "name": "John Doe"
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "_id": "abc123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user",
    "kyc_verified": false
  }
}
```

---

### Login
`POST /api/v1/auth/login`

Authenticate user and receive JWT access token.

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecureP@ss123"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Login successful",
  "tokens": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "user": {
    "_id": "abc123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user"
  }
}
```

---

### Send OTP
`POST /api/v1/auth/send-otp`

Generate and send OTP to user's email for verification purposes.

**Request Body**:
```json
{
  "email": "user@example.com",
  "purpose": "password_reset"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "OTP sent successfully to your email",
  "expiresIn": 600
}
```

---

### Forgot Password
`POST /api/v1/auth/forgot-password`

Initiate password reset by sending OTP to registered email.

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "If an account exists with this email, you will receive a password reset code"
}
```

---

### Reset Password
`POST /api/v1/auth/reset-password`

Reset password using OTP received via email.

**Request Body**:
```json
{
  "email": "user@example.com",
  "otp": "123456",
  "newPassword": "NewSecureP@ss456"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

**Error** (400):
```json
{
  "error": "Invalid or expired OTP"
}
```

---

## Bonds

### List Bonds
`GET /api/v1/bonds`

Retrieve paginated list of available bonds with optional filters. Results are cached with Redis for 60 seconds.

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 100)
- `risk` (optional): Filter by risk category (`low`, `medium`, `high`)
- `search` (optional): Text search by bond name or issuer

**Response** (200):
```json
{
  "success": true,
  "bonds": [
    {
      "_id": "bond123",
      "bond_id": "INFRA-2026-001",
      "name": "Maharashtra Metro Phase II",
      "issuer": "MMRDA",
      "coupon_rate": 8.5,
      "maturity_date": "2029-12-31",
      "par_value": 1000,
      "current_price": 1050,
      "units_available": 5000,
      "units_sold": 3000,
      "risk_category": "medium",
      "status": "active"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "pages": 3
  }
}
```

---

### Get Bond Details
`GET /api/v1/bonds/:id`

Retrieve detailed information about a specific bond.

**Response** (200):
```json
{
  "success": true,
  "bond": {
    "_id": "bond123",
    "bond_id": "INFRA-2026-001",
    "name": "Maharashtra Metro Phase II",
    "description": "Funding for metro expansion...",
    "issuer": "MMRDA",
    "coupon_rate": 8.5,
    "maturity_date": "2029-12-31",
    "par_value": 1000,
    "current_price": 1050,
    "units_available": 5000,
    "risk_category": "medium"
  }
}
```

---

### Get Bond Statistics
`GET /api/v1/bonds/stats`

Retrieve aggregate statistics for all bonds.

**Response** (200):
```json
{
  "success": true,
  "stats": {
    "total_bonds": 45,
    "total_value": 45000000,
    "average_yield": 7.8,
    "by_risk": {
      "low": 15,
      "medium": 20,
      "high": 10
    }
  }
}
```

---

### Create Bond (Admin Only)
`POST /api/v1/bonds`

Create a new bond offering (requires admin role).

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "bond_id": "INFRA-2026-002",
  "name": "Delhi Highway Expansion",
  "issuer": "NHAI",
  "description": "National highway development...",
  "coupon_rate": 7.2,
  "maturity_date": "2030-06-30",
  "par_value": 1000,
  "current_price": 1000,
  "units_available": 10000,
  "risk_category": "low"
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "Bond created successfully",
  "bond": { /* bond object */ }
}
```

---

## Trading

### Buy Bond
`POST /api/v1/trading/buy`

Purchase bonds using wallet balance. Uses MongoDB transactions to ensure atomicity.

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "bond_id": "bond123",
  "quantity": 10,
  "price_per_unit": 1050
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "Bond purchase successful",
  "transaction": {
    "transaction_id": "TXN-uuid",
    "type": "buy",
    "quantity": 10,
    "price_per_unit": 1050,
    "total_amount": 10500,
    "status": "confirmed"
  },
  "new_balance": 989500
}
```

**Error** (400):
```json
{
  "success": false,
  "error": "Insufficient funds. Balance: 5000, Required: 10500"
}
```

---

### Sell Bond
`POST /api/v1/trading/sell`

Sell bonds from portfolio and credit proceeds to wallet.

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "bond_id": "bond123",
  "quantity": 5,
  "price_per_unit": 1060
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "Bond sold successfully",
  "transaction": {
    "transaction_id": "TXN-uuid",
    "type": "sell",
    "quantity": 5,
    "price_per_unit": 1060,
    "total_amount": 5300,
    "status": "confirmed"
  },
  "new_balance": 994800
}
```

---

### Get Trading History
`GET /api/v1/trading`

Retrieve all transactions for authenticated user, sorted by most recent.

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "success": true,
  "trades": [
    {
      "transaction_id": "TXN-uuid",
      "type": "buy",
      "bond_id": {
        "name": "Maharashtra Metro Phase II",
        "bond_id": "INFRA-2026-001"
      },
      "quantity": 10,
      "price_per_unit": 1050,
      "total_amount": 10500,
      "timestamp": "2026-01-30T10:30:00Z",
      "status": "confirmed"
    }
  ]
}
```

---

## Portfolio

### Get Portfolio Overview
`GET /api/v1/portfolio`

Retrieve user's complete portfolio with holdings.

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "success": true,
  "portfolio": {
    "user_id": "abc123",
    "virtual_balance": 989500,
    "total_invested": 10500,
    "holdings": [
      {
        "bond_id": {
          "_id": "bond123",
          "name": "Maharashtra Metro Phase II",
          "coupon_rate": 8.5
        },
        "quantity": 10,
        "purchase_price": 1050
      }
    ]
  }
}
```

---

### Get Holdings
`GET /api/v1/portfolio/holdings`

Retrieve list of bond holdings with current values.

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "success": true,
  "holdings": [
    {
      "bond": { /* bond details */ },
      "quantity": 10,
      "purchase_price": 1050,
      "current_value": 10600
    }
  ]
}
```

---

### Get Performance Metrics
`GET /api/v1/portfolio/performance`

Calculate portfolio performance including unrealized P&L.

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "success": true,
  "performance": {
    "total_value": 1000100,
    "total_invested": 10500,
    "unrealized_pnl": 100,
    "pnl_percentage": 0.95,
    "holdings_count": 1
  }
}
```

---

## Payments

### Deposit Funds
`POST /api/v1/payments/deposit`

Add funds to wallet balance (simulated for demo).

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "amount": 50000,
  "method": "upi"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Deposit successful",
  "new_balance": 1050000,
  "deposit": {
    "amount": 50000,
    "method": "upi",
    "timestamp": "2026-01-31T12:00:00Z"
  }
}
```

---

### Get Wallet Balance
`GET /api/v1/payments/balance`

Retrieve current wallet balance.

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "success": true,
  "balance": 1050000
}
```

---

## Users

### Get Profile
`GET /api/v1/users/profile`

Retrieve authenticated user's profile details.

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "success": true,
  "user": {
    "_id": "abc123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user",
    "kyc_verified": true,
    "subscription_tier": "free"
  }
}
```

---

### Update Profile
`PUT /api/v1/users/profile`

Update user profile information.

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "name": "John Smith",
  "phone": "+91-9876543210"
}
```

**Response** (200):
```json
{
  "success": true,
  "user": { /* updated user object */ }
}
```

---

### Update Profile Picture
`POST /api/v1/users/profile-picture`

Upload profile picture (base64 encoded).

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "image": "data:image/png;base64,iVBORw0KGgoAAAANS..."
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Profile picture updated",
  "user": { /* user with profile_picture field */ }
}
```

---

### Upload KYC Document
`POST /api/v1/users/kyc`

Submit KYC document for verification.

**Headers**:
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Form Data**:
- `document`: File (PDF, JPG, PNG - max 5MB)

**Response** (200):
```json
{
  "success": true,
  "message": "KYC document uploaded successfully",
  "user": {
    "kyc_status": "pending"
  }
}
```

---

## AI Service

### Analyze Bond
`GET /api/v1/ai/analyze/:bondId`

Get AI-powered risk and return analysis for a specific bond.

**Response** (200):
```json
{
  "success": true,
  "analytics": {
    "risk_score": 6.5,
    "expected_returns": 8.2,
    "recommendation_score": 7.8,
    "market_sentiment": "positive",
    "insights": [
      "Strong government backing",
      "Moderate interest rate risk"
    ]
  }
}
```

---

### AI Chat
`POST /api/v1/ai/chat`

Interact with AI assistant for investment guidance.

**Request Body**:
```json
{
  "message": "What are the benefits of infrastructure bonds?"
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "reply": "Infrastructure bonds offer several benefits: 1) Stable returns backed by government projects..."
  }
}
```

---

## Error Responses

All endpoints may return these common error codes:

**400 Bad Request**:
```json
{
  "error": "Validation error message"
}
```

**401 Unauthorized**:
```json
{
  "error": "Invalid or expired token"
}
```

**403 Forbidden**:
```json
{
  "error": "Insufficient permissions"
}
```

**404 Not Found**:
```json
{
  "error": "Resource not found"
}
```

**429 Too Many Requests**:
```json
{
  "error": "Rate limit exceeded. Try again in 60 seconds"
}
```

**500 Internal Server Error**:
```json
{
  "error": "Internal server error"
}
```

---

## Rate Limiting

All endpoints are rate-limited to **100 requests per minute per IP address**. Exceeding this limit will result in a 429 status code.

## Authentication

Protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Tokens expire after **1 hour** (configurable via `JWT_EXPIRY` environment variable).

## WebSocket Events

The platform supports real-time updates via Socket.IO at `http://localhost:3210`.

### Events:
- `bond:price_update` - Real-time bond price changes
- `portfolio:update` - Portfolio value changes
- `transaction:confirmed` - Trade confirmations

---

*Last Updated: January 31, 2026*
