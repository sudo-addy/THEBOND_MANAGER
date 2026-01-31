# API Documentation

## Authentication

### Register
`POST /api/v1/auth/register`
- **Body**: `{ email, password, name }`
- **Response**: User object and token

### Login
`POST /api/v1/auth/login`
- **Body**: `{ email, password }`
- **Response**: `{ success: true, tokens: { access_token }, user }`

## Bonds

### List Bonds
`GET /api/v1/bonds`
- **Query**: `page`, `limit`, `risk` (low/medium/high)
- **Response**: Paginated list of bonds

### Get Bond Details
`GET /api/v1/bonds/:id`
- **Response**: Bond details

### Create Bond (Admin Only)
`POST /api/v1/bonds`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ name, issuer, coupon_rate, ... }`

## Trading

### Buy Bond
`POST /api/v1/trading/buy`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ bond_id, quantity, price_per_unit }`
- **Response**: Transaction details

## Users

### Upload KYC
`POST /api/v1/users/kyc`
- **Headers**: `Authorization: Bearer <token>`, `Content-Type: multipart/form-data`
- **Body**: `document` (File)

### Get Profile
`GET /api/v1/users/profile`

## AI Service

### Analyze Bond
`GET /api/v1/ai/analyze/:bondId`
- **Response**: `{ risk_score, expected_returns, recommendation_score, market_sentiment }`

### Chat
`POST /api/v1/ai/chat`
- **Body**: `{ message }`
- **Response**: `{ reply }`
