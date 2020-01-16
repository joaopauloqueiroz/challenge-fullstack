const routes = require('express').Router();
const DeliveryController = require('../controllers/DeliveryController')
const validate = require('../middlewares/validator')

routes.post("/deliveries", validate.create, DeliveryController.store);

routes.get("/deliveries", DeliveryController.index);

module.exports = routes