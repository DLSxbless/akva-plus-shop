exports.getProducts = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 20;

  const products = await Product.find()
    .skip((page - 1) * limit)
    .limit(limit);

  res.json(products);
};

