const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
      // req.user is populated from the JWT authentication middleware
      if (req.user && req.user.role === requiredRole) {
        next(); // Proceed if the role matches
      } else {
        return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      }
    };
  };
  
  module.exports = roleMiddleware;
  