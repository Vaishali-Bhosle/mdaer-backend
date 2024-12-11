const roleMiddleware = (requiredRoles) => {
  return (req, res, next) => {
      if (!requiredRoles.includes(req.user.role)) {
          return res.status(403).json({ message: 'Access forbidden: insufficient permissions' });
      }
      next();
  };
};

module.exports = roleMiddleware;
