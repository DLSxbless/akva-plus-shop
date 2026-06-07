const jwt = require("jsonwebtoken");
const User = require("../models/User");

const getTokenFromHeaders = (req) => {
  const header = req.headers.authorization || "";

  if (header.startsWith("Bearer ")) {
    return header.slice(7);
  }

  return header;
};

const auth = async (req, res, next) => {
  const token = getTokenFromHeaders(req);

  if (!token) {
    return res.status(401).json({ message: "Требуется авторизация" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Пользователь не найден" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Недействительный токен" });
  }
};

const adminOnly = (req, res, next) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ message: "Доступ только для администратора" });
  }

  next();
};

module.exports = { auth, adminOnly, getTokenFromHeaders };
