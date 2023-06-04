const UserToken = require('../models/userToken.js');
const jwt = require('jsonwebtoken');

const verifyRefreshToken = (refreshToken) => {
  console.log('refreshToken', refreshToken);
  const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;

  return new Promise((resolve, reject) => {
    UserToken.findOne({ token: refreshToken }, (err, doc) => {
      if (!doc)
        return reject({ error: true, message: 'Invalid Refresh Token' });

      jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
        console.log('tokenDetails', tokenDetails);
        console.log('err tokendetails', err);
        if (err)
          return reject({ error: true, message: 'Invalid refresh token' });
        resolve({
          tokenDetails,
          error: false,
          message: 'Valid refresh token',
        });
      });
    });
  });
};

module.exports = verifyRefreshToken;
