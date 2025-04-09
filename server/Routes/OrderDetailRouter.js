const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const orderProductController = require('../controller/OrderDetailsController')

//Объединенные

router.post('/getOrderProductsWithAssortmentInfoByOrderId', authMiddleware, orderProductController.getOrderProductsWithAssortmentInfoByOrderId)

//

router.post('/createOrderProduct', authMiddleware, orderProductController.createOrderProduct)

router.post('/getOrderProductByOrderID', authMiddleware, orderProductController.getOrderProductByOrderID)

router.post('/deleteOrderProductByOrderId', authMiddleware, orderProductController.deleteOrderProductByOrderId)

module.exports = router