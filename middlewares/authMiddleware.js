const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

exports.authorizeSuperAdmin = (req, res, next) => {
  // Check if the current user is a Super Admin
  if (req.user.role !== 'Super Admin') {
    return res.status(403).json({ message: 'You do not have permission to perform this action' });
  }
  next();
};
