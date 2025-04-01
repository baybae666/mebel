const Router = require('express');
const userController = require('../controller/UserController');
const authMiddleware = require('../middleware/authMiddleware'); // Для авторизации
const { body } = require('express-validator'); // Валидация

const router = new Router();

// Регистрация
router.post(
    '/registration',
    [
        body('Fullname').notEmpty().withMessage('Имя обязательно'),
        body('Email').isEmail().withMessage('Некорректный email'),
        body('Phone').notEmpty().withMessage('Телефон обязателен'),
        body('PasswordHash').isLength({ min: 6 }).withMessage('Пароль должен быть не менее 6 символов'),
    ],
    userController.registration
);

// Логин
router.post('/login', userController.login);

// Логаут
router.post('/logout', userController.logout);

// Проверка авторизации (authMiddleware для проверки токена)
router.get('/check', authMiddleware, userController.checkAuth);

// Обновление токенов
router.get('/refresh', userController.refresh);

module.exports = router;
