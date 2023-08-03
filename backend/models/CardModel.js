const mongoose = require('mongoose');

const cardSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    cardName: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    website: {
      type: String,
      required: false,
    },
    notes: {
      type: String,
      required: false,
    },
    occupations: [
      {
        positionTitle: {
          type: String,
          required: false,
        },
        organizationName: {
          type: String,
          required: false,
        },
      },
    ],
    phoneNumbers: [
      {
        type: {
          type: String,
          required: false,
        },
        number: {
          type: String,
          required: false,
        },
      },
    ],
    socialLinks: [
      {
        type: {
          type: String,
          required: false,
        },
        link: {
          type: String,
          required: false,
        },
      },
    ],
    emails: [
      {
        emailInput: {
          type: String,
          required: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Card', cardSchema);
