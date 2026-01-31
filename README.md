# Infrastructure Bond Tokenization Platform

A blockchain-based platform for tokenizing infrastructure bonds, enabling public-private funding with AI-powered analytics.

## 🚀 Features

- **Tokenized Bonds**: Infrastructure bonds represented as ERC-20 tokens
- **AI Analytics**: Smart scoring algorithm for risk and return analysis
- **Secure Trading**: Atomic transactions with wallet integration
- **RBAC**: Role-based access control (Admin, Issuer, User)
- **Compliance**: KYC document upload and verification
- **Real-time Data**: WebSocket integration for live updates

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Express.js, MongoDB, Redis, WebSocket (Socket.IO)
- **Blockchain**: Solidity (Polygon/Ethereum), Hardhat
- **DevOps**: Docker, Docker Compose

## 🏁 Getting Started

### Prerequisites

- Docker & Docker Compose
- Node.js v18+ (for local dev)

### Quick Start (Docker)

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd CoDevians_9.12_SD_G9
   ```

2. **Run the setup script**
   ```bash
   ./run.sh
   ```
   Select Option 2: "Start All Services (Docker Compose)"

3. **Access the application**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:3210](http://localhost:3210)
   - MongoDB: localhost:27017

### Local Development

1. **Backend Setup**
   ```bash
   cd backend
   cp .env.example .env
   # Update .env with your secrets (JWT_SECRET is required)
   npm install
   npm run dev
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   cp .env.local.example .env.local
   npm install
   npm run dev
   ```

3. **Database Seeding (Important)**
   ```bash
   cd backend
   npm run seed
   ```
   This will populate the database with demo users, bonds, and portfolios.

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@bondplatform.demo` | `Admin@CIH2026` |
| **Premium** | `premium@bondplatform.demo` | `Premium@CIH2026` |
| **Basic** | `basic@bondplatform.demo` | `Basic@CIH2026` |
| **Free** | `free@bondplatform.demo` | `Free@CIH2026` |

## 🧪 Testing

We use Jest for backend testing.

```bash
cd backend
# Run all tests
npm test

# Run specific test file
npm test -- auth.test.js
```

## 📚 API Documentation

See [API.md](docs/API.md) for detailed API endpoint documentation.

## 🔐 Security Checks

- **Environment**: Critical variables are validated on startup.
- **Input Validation**: All inputs are sanitized and validated.
- **Role Control**: Admin routes protected by RBAC middleware.
- **Rate Limiting**: Global rate limiting enabled to prevent abuse.

## 📄 License

MIT License - CoDevians 2026
