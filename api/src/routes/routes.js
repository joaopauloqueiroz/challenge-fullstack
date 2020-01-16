const routes = require('express').Router();
const DeliveryController = require('../controllers/DeliveryController')
const validate = require('../validator')

routes.post("/deliveries", validate.create, DeliveryController.store);

routes.get("/deliveries", DeliveryController.index);

routes.delete("/deliveries/:id", DeliveryController.destroy);

routes.delete("/deliveries", DeliveryController.destroyAll);

module.exports = routes