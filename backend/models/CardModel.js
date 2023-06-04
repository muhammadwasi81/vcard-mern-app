const mongoose = require('mongoose');

const cardSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      unique: true,
      required: false,
    },
    telephone: {
      type: String,
      required: false,
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
module.exports = mongoose.model('Card', cardSchema);
