const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const User = require('../models/User');

// Get profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.user_id);
    res.json({ success: true, user: user.toJSON() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    // Only allow specific fields to be updated
    const allowedFields = [
      'name', 'phone', 'bio', 'location', 'company', 'website',
      'socialLinks', 'preferences'
    ];

    const updates = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    // Validate bio length
    if (updates.bio && updates.bio.length > 500) {
      return res.status(400).json({
        success: false,
        error: 'Bio must be 500 characters or less'
      });
    }

    // Validate website URL format
    if (updates.website && updates.website !== '') {
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      if (!urlPattern.test(updates.website)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid website URL format'
        });
      }
    }

    updates.updated_at = Date.now();

    const user = await User.findByIdAndUpdate(
      req.user.user_id,
      updates,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.json({ success: true, user: user.toJSON() });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Upload profile picture
router.post('/profile/picture', authMiddleware, async (req, res) => {
  try {
    const { profilePicture } = req.body;

    if (!profilePicture) {
      return res.status(400).json({
        success: false,
        error: 'Profile picture is required'
      });
    }

    // Validate base64 format
    if (!profilePicture.startsWith('data:image/')) {
      return res.status(400).json({
        success: false,
        error: 'Invalid image format. Must be a base64 encoded image'
      });
    }

    // Check file size (base64 is ~33% larger, so 5MB * 1.33 ≈ 6.65MB in base64)
    const sizeInBytes = (profilePicture.length * 3) / 4;
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (sizeInBytes > maxSize) {
      return res.status(400).json({
        success: false,
        error: 'Image size must be less than 5MB'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.user_id,
      { profilePicture, updated_at: Date.now() },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.json({ success: true, user: user.toJSON() });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const upload = require('../middleware/upload');

// Submit KYC
router.post('/kyc', authMiddleware, upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload a KYC document' });
    }

    const savedPath = `/uploads/kyc/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      req.user.user_id,
      {
        $push: { kyc_documents: savedPath },
        kyc_status: 'verified' // Auto-approved for demo purpose
      },
      { new: true }
    );

    res.json({
      success: true,
      message: 'KYC document submitted successfully',
      user: user.toJSON()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
