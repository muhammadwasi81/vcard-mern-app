const mongoose = require('mongoose');

const cardSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    telephone: {
      type: String,
      required: [true, 'Please add a phone number'],
    },
    qrCode: {
      type: String,
      required: [true, 'Please add a QR code'],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Card', cardSchema);
