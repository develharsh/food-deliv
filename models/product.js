const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    cost: {
      Temporary: {
        type: Number,
        required: true,
      },
      Week: {
        type: Number,
        required: true,
      },
      Month: {
        type: Number,
        required: true,
      },
    },
    description: {
      type: String,
      required: true,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: mongoose.Schema.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    daySpecific: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Product || mongoose.model("Product", productSchema);
