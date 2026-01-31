const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user to get current role and kyc_status
    const user = await User.findById(decoded.user_id).select('role kyc_status');
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = {
      user_id: decoded.user_id,
      role: user.role,
      kyc_status: user.kyc_status
    };
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { authMiddleware };
