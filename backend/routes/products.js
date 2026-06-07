const router = require("express").Router();
const mongoose = require("mongoose");
const Product = require("../models/Product");
const { auth, adminOnly } = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).lean();
    res.json(products);
  } catch {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Некорректный ID товара" });
    }

    const product = await Product.findById(req.params.id).lean();

    if (!product) {
      return res.status(404).json({ message: "Товар не найден" });
    }

    res.json(product);
  } catch {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.post("/", auth, adminOnly, async (req, res) => {
  try {
    const { name, price, category, country, image, description } = req.body;

    if (!name || !category || !country || price === undefined || price === "") {
      return res.status(400).json({ message: "Заполни обязательные поля" });
    }

    const product = await Product.create({
      name: name.trim(),
      price: Number(price),
      category: category.trim(),
      country: country.trim(),
      image: image?.trim() || "/test.webp",
      description: description?.trim() || "",
    });

    res.status(201).json(product);
  } catch {
    res.status(500).json({ message: "Ошибка создания товара" });
  }
});

router.delete("/:id", auth, adminOnly, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Некорректный ID товара" });
    }

    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Товар не найден" });
    }

    res.json({ message: "Товар удалён" });
  } catch {
    res.status(500).json({ message: "Ошибка удаления товара" });
  }
});

module.exports = router;
