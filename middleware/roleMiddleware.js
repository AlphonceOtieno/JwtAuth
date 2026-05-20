const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // req.user comes from authMiddleware (JWT decoded)
      const userRole = req.user?.role;

      if (!userRole) {
        return res.status(403).json({
          message: "Role not found",
        });
      }

      // check if user role is allowed
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          message: "Access denied: insufficient permissions",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
};

module.exports = roleMiddleware;