const mongoose = require("mongoose");

const subcatSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.SubCategory || mongoose.model("SubCategory", subcatSchema);
