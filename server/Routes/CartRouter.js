const Router = require('express');
const cartController = require('../controller/CartController');
const authMiddleware = require('../middleware/authMiddleware');

const router = new Router();

// Получить содержимое корзины
router.get('/', authMiddleware, cartController.getCart);

// Добавить товар в корзину
router.post('/add', authMiddleware, cartController.addToCart);

// Добавить товар в корзину
router.post('/minus', authMiddleware, cartController.minusQuantity);

// Удалить товар из корзины
router.delete('/remove/:cartDetailId', authMiddleware, cartController.removeFromCart);

// Очистить корзину
router.delete('/clear', authMiddleware, cartController.clearCart);

module.exports = router;
