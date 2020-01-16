const Delivery = require('../models/Delivery');
const { validationResult } = require('express-validator');

module.exports = {
  async index (req, res) {
    const deliveries = await Delivery.find();
    return res.json(deliveries)
  },

  async store (req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { 
      name,
      weight,
      address,
      geolocation
    } = req.body;

    try {
      const delivery = await Delivery.create({
        name,
        weight,
        address,
        geolocation
      });

      return res.status(201).json(delivery)
    } catch (error) {
      return res.status(500).json({error: "Error to create Delivery"})
    }
  },
  async destroy (req, res) {
    const { id } = req.body;
    await Delivery.deleteOne({id})
    return res.status(200).json({ success: true })
  },

  async destroyAll (req, res) {
    await Delivery.remove()
    return res.status(200).json({ success: true })
  }
}