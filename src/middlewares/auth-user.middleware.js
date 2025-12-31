import jwt from "jsonwebtoken";

const userAuthentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token not found" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    if(!decoded.purpose || decoded.purpose !== "reset_password") {
      req.user = { id: decoded.id, role: decoded.role, username: decoded.username };
    }
    else {
      req.user = { id: decoded.id, purpose: decoded.purpose };
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export { userAuthentication };