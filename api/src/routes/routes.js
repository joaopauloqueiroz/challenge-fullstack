const routes = require('express').Router;
const DeliveryController = require('../controllers/DeliveryController')

routes.post("/deliveries", DeliveryController.store);

module.exports = routes