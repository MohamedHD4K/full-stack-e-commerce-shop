const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  tags: {
    type: [String],
    validate: {
      validator: function (v) {
        return v.length > 0;
      },
      message: "A product must have at least one tag.",
    },
  },
  comments: [
    {
      user: {
        type: String, 
        required: true,
      },
      text: {
        type: String, 
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now, 
      },
      img: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = product = mongoose.model("Products", productSchema);
