const Router = require('express');
const router = new Router();
const facadeRoutes = require('./FasadeRouter');
const userRotes = require('./UserRouter');
const CartRoutes = require('./CartRouter');

router.use('/user', userRotes);
router.use('/cart', CartRoutes);
router.use('/facade', facadeRoutes)

module.exports = router