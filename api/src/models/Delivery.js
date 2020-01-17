const { Schema, model } = require('mongoose');

const DeliverySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  address: {
    street: {
      type: String
    },
    number: {
      type: Number
    },
    neighborhood: {
      type: String
    },
    complement: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    country: {
      type: String
    }
  },
  geolocation: {
    latitude: {
      type: String,
      required: true
    },
    longitude: {
      type: String,
      required: true
    }
  }
})

module.exports = model('Delivery', DeliverySchema)