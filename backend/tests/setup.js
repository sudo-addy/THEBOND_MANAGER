const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

jest.setTimeout(30000);

// Global mocks
jest.mock('../src/services/emailService', () => ({
    sendWelcomeEmail: jest.fn().mockResolvedValue(true),
    sendTradeConfirmation: jest.fn().mockResolvedValue(true),
    sendDepositConfirmation: jest.fn().mockResolvedValue(true),
    sendMail: jest.fn().mockResolvedValue(true)
}));

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany();
    }
});
