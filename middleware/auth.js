const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //getting token from header
  const token = req.header('x-auth-token');

  //checking token
  if (!token) {
    //unauthorized
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  //verifying token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
