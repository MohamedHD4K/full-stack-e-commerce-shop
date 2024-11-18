const Product = require("../model/productModel");

const product_post = async (req, res) => {
  try {
    const { title, about, img, price } = req.body;
    let product = new Product({
      title,
      about,
      img,
      price,
      user: req.user._id,
    });

    product = await product.save();

    return res.send(product);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

module.exports = { product_post };
