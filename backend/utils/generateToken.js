const UserToken = require('../models/userToken.js');
const jwt = require('jsonwebtoken');

const generateTokens = async () => {
  try {
    const payload = { _id: user._id };
    console.log(payload, 'payload userid');
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      {
        expiresIn: '15m',
      }
    );
    console.log(accessToken, 'access token');
    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_PRIVATE_KEY,
      {
        expiresIn: '30d',
      }
    );
    console.log(refreshToken, 'refresh token');
    const userToken = await UserToken({
      userId: user._id,
      token: refreshToken,
    });
    if (userToken) await userToken.remove();
    console.log(userToken, 'user token');

    await new UserToken({ userId: user._id, token: refreshToken }).save();
    return Promise.resolve({ accessToken, refreshToken });
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = generateTokens;
