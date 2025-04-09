const Router = require('express');
const router = new Router();
const facadeRoutes = require('./FasadeRouter');
const userRotes = require('./UserRouter');
const CartRoutes = require('./CartRouter');
const OrderDetailRoutes = require('./OrderDetailRouter');
const OrderRoutes = require('./OrderRouter')

router.use('/user', userRotes);
router.use('/cart', CartRoutes);
router.use('/facade', facadeRoutes)
router.use('/orderDetail', OrderDetailRoutes)
router.use('/order', OrderRoutes)

module.exports = router