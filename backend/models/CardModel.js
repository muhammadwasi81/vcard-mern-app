const mongoose = require("mongoose");

const cardSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    telephone: {
      type: String,
      required: [true, "Please add a phone number"],
    },
    image: {
      type: String,
      required: false,
    },
    birthday: {
      type: Date,
      required: false,
    },
    website: {
      type: String,
      required: false,
    },
    snapchat: {
      type: String,
      required: false,
    },
    instagram: {
      type: String,
      required: false,
    },
    linkedin: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Card", cardSchema);
