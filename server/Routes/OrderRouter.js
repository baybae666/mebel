const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const orderController = require('../controller/OrderController')

router.post('/createOrderByBasketId', authMiddleware, orderController.createOrderByBasketId)

router.post('/del', orderController.delOrder)

router.post('/getOrderByOrderID', authMiddleware, orderController.getOrderByOrderID)
router.post('/getOrderByUserID', authMiddleware, orderController.getOrderByUserID)


router.put('/changeStatusByOrderId', authMiddleware, orderController.changeStatusByOrderID)
router.put('/changeTotalPriceByOrderId', authMiddleware, orderController.changeTotalPriceByOrderID)

module.exports = router