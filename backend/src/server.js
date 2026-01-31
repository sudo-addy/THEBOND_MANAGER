const fs = require('fs');

try {
  require('dotenv').config();
  const express = require('express');
  const cors = require('cors');
  const mongoose = require('mongoose');
  const { createServer } = require('http');
  const { Server } = require('socket.io');
  const compression = require('compression');
  const helmet = require('helmet');

  // Route imports
  const authRoutes = require('./routes/auth');
  const bondsRoutes = require('./routes/bonds');
  const portfolioRoutes = require('./routes/portfolio');
  const tradingRoutes = require('./routes/trading');
  const usersRoutes = require('./routes/users');
  const aiRoutes = require('./routes/ai');
  const paymentRoutes = require('./routes/payments');

  // Middleware
  const { errorHandler } = require('./middleware/errorHandler');
  const { rateLimiter } = require('./middleware/rateLimiter');
  const { requestLogger } = require('./middleware/logger');
  const { corsMiddleware } = require('./middleware/cors');
  const { sanitizeInput } = require('./middleware/validation');
  const { performanceMonitor } = require('./middleware/monitor');

  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
      methods: ['GET', 'POST']
    }
  });

  // Security & Performance Middleware (order matters!)
  app.use(helmet()); // Security Headers
  app.use(corsMiddleware); // Enhanced CORS
  app.use(compression()); // Gzip Compression
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(sanitizeInput); // XSS Protection
  app.use(requestLogger); // Request Logging
  app.use(performanceMonitor); // Performance Monitoring
  app.use(rateLimiter); // Rate Limiting

  // Database connection
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bond_platform')
    .then(() => console.log('✓ MongoDB connected'))
    .catch(err => console.error('✗ MongoDB connection error:', err));

  // Routes
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/bonds', bondsRoutes);
  app.use('/api/v1/portfolio', portfolioRoutes);
  app.use('/api/v1/trading', tradingRoutes);
  app.use('/api/v1/users', usersRoutes);
  app.use('/api/v1/ai', aiRoutes);
  app.use('/api/v1/payments', paymentRoutes);

  // Health check
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // WebSocket
  io.on('connection', (socket) => {
    console.log(`✓ User connected: ${socket.id}`);

    socket.on('subscribe', (data) => {
      socket.join(data.channel);
      console.log(`✓ User ${socket.id} subscribed to ${data.channel}`);
    });

    socket.on('disconnect', () => {
      console.log(`✗ User disconnected: ${socket.id}`);
    });
  });

  // Export io for services
  app.locals.io = io;

  // Error handling middleware
  app.use(errorHandler);

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });

  const PORT = process.env.PORT || 3210;
  httpServer.listen(PORT, () => {
    console.log(`\n🚀 Server running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 WebSocket enabled\n`);
  });

  module.exports = { app, io, httpServer };
} catch (error) {
  fs.writeFileSync('server_crash.txt', error.stack + '\n' + error.message);
  console.error(error);
  process.exit(1);
}
