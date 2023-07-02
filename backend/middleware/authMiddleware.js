const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../controllers/userController');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not Authorized, token failed' });
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const refreshToken = asyncHandler(async (req, res) => {
  const { token } = req.body; // Change here: access token from req.body, not req
  console.log(token, 'req.body.token'); // Change log statement to reflect this
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      console.log(decoded, 'decoded');
      const user = await User.findById(decoded.id);
      console.log(user, 'user');

      if (!user) {
        throw new Error('User not found');
      }

      if (user.refreshToken !== token) {
        throw new Error('Refresh token is not valid');
      }

      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);
      console.log(newAccessToken, newRefreshToken, 'new tokens');
      return res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Refresh token failed' });
    }
  } else {
    return res.status(400).json({ message: 'Refresh token not found' });
  }
});

module.exports = { protect, refreshToken };
