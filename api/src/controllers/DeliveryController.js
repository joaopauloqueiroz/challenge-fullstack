const Delivery = require('../models/Delivery');

module.exports = {
  async store (req, res, next) {
    return res.json({ status: true})
  }
}