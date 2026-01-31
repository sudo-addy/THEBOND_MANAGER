try {
    console.log('Testing imports...');

    console.log('Loading dotenv...');
    require('dotenv').config();

    console.log('Loading express...');
    const express = require('express');
    const cors = require('cors');
    const mongoose = require('mongoose');
    const { createServer } = require('http');
    const { Server } = require('socket.io');

    console.log('Loading openai...');
    const OpenAI = require('openai');

    console.log('Loading routes/auth...');
    require('./src/routes/auth');
    console.log('Loading routes/bonds...');
    require('./src/routes/bonds');
    console.log('Loading routes/portfolio...');
    require('./src/routes/portfolio');
    console.log('Loading routes/trading...');
    require('./src/routes/trading');
    console.log('Loading routes/users...');
    require('./src/routes/users');
    console.log('Loading routes/ai...');
    require('./src/routes/ai');
    console.log('Loading routes/payments...');
    require('./src/routes/payments');

    console.log('Loading middleware...');
    require('./src/middleware/errorHandler');
    require('./src/middleware/rateLimiter');
    require('./src/middleware/logger');

    console.log('Initializing Express...');
    const app = express();
    const httpServer = createServer(app);
    const io = new Server(httpServer);

    console.log('Connecting to MongoDB...');
    // Mocking connect or using timeout to not hang
    // mongoose.connect(process.env.MONGODB_URI); 

    console.log('✅ PROTO-STARTUP SUCCESSFUL');
} catch (e) {
    console.error('❌ CRASH DETECTED');
    console.error(e);
}
