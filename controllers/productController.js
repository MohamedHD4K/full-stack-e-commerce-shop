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

    console.log(product);
    return res.send(product);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

const product_get = async (req, res) => {
  const products = await Product.find();
  return res.send(products);
};

const product_delete = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).send({ message: "Item not found" });
    }

    res.send({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: "An error occurred" });
  }
};


module.exports = { product_post, product_get, product_delete };
