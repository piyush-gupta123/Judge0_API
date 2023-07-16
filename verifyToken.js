import jwt from "jsonwebtoken";

const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({Message: "You Are Not Authenticated"})

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({Message: "Invalid Token"})
    req.User = user;
    next();
  });
};

export default verifyUser;