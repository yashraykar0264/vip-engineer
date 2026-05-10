const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // GET HEADER

    const authHeader = req.header("Authorization");

    // NO HEADER

    if (!authHeader) {
      return res.status(401).json({
        message: "No Token",
      });
    }

    // GET TOKEN

    const token = authHeader.split(" ")[1];

    // NO TOKEN

    if (!token) {
      return res.status(401).json({
        message: "Invalid Token",
      });
    }

    // VERIFY

    const verified = jwt.verify(
      token,

      process.env.JWT_SECRET,
    );

    req.user = verified;

    next();
  } catch (error) {
    console.log(error);

    res.status(401).json({
      message: "Unauthorized",
    });
  }
};
