const router = require("express").Router();
const mongoose = require("mongoose");
const Order = require("../models/Order");
const { auth } = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const { cart, total, customer, payment } = req.body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ message: "Корзина пустая" });
    }

    if (!customer?.fullName || !customer?.phone || !customer?.city || !customer?.address) {
      return res.status(400).json({ message: "Заполните данные доставки" });
    }

    if (!payment?.method) {
      return res.status(400).json({ message: "Выберите способ оплаты" });
    }

    const items = cart.map((item) => {
      if (!mongoose.Types.ObjectId.isValid(item._id)) {
        throw new Error("Некорректный ID товара");
      }

      return {
        productId: item._id,
        name: item.name,
        price: Number(item.price),
        qty: Number(item.qty || 1),
        image: item.image || "",
        category: item.category || "",
      };
    });

    const order = await Order.create({
      user: req.user._id,
      items,
      total: Number(total),
      customer: {
        fullName: customer.fullName,
        phone: customer.phone,
        email: customer.email || "",
        city: customer.city,
        address: customer.address,
        comment: customer.comment || "",
      },
      payment: {
        method: payment.method,
        mock: true,
      },
      status: "new",
    });

    res.status(201).json({
      message: "Заказ создан",
      order,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Ошибка создания заказа",
    });
  }
});

router.get("/my", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .lean();

    res.json(orders);
  } catch {
    res.status(500).json({ message: "Ошибка загрузки заказов" });
  }
});

module.exports = router;