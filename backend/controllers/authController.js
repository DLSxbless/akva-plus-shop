const User = require("../models/User");

// регистрация
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "Пользователь уже есть" });
    }

    const user = await User.create({ email, password });

    res.json({ token: user._id });
  } catch (err) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

// логин
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({ message: "Неверные данные" });
    }

    res.json({ token: user._id });
  } catch {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

// получить себя
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.headers.authorization);
    res.json(user);
  } catch {
    res.status(500).json({ message: "Ошибка" });
  }
};