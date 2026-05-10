module.exports = function (req, res, next) {
  try {
    // CHECK ROLE
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    next();
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Admin Middleware Error",
    });
  }
};
