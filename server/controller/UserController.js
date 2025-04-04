const { User } = require('../models/model');
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const tokenService = require('../services/tokenService'); // Создать tokenService
const { validationResult } = require('express-validator'); // Используйте для валидации

class UserController {
    // Регистрация
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Ошибка валидации', errors.array()));
            }

            const { Fullname, Email, Phone, PasswordHash } = req.body;

            const existingUser = await User.findOne({ where: { Phone } });
            if (existingUser) {
                return next(ApiError.badRequest('Пользователь с таким номером уже существует.'));
            }

            const hashedPassword = await bcrypt.hash(PasswordHash, 10);
            const user = await User.create({ Fullname, Email, Phone, PasswordHash: hashedPassword });
            const tokens = tokenService.generateTokens({ id: user.UserID, Email: user.Email, Phone: user.Phone, isAdmin: user.IsAdmin });
            await tokenService.saveToken(user.UserID, tokens.refreshToken);

            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json({ user: { id: user.UserID, email: user.Email,phone: user.Phone, isAdmin: user.IsAdmin }, tokens });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    // Логин
    async login(req, res, next) {
        try {
            const { Phone, PasswordHash } = req.body;

            const user = await User.findOne({ where: { Phone } });
            if (!user) {
                return next(ApiError.badRequest('Пользователь с таким email не найден.'));
            }

            const isPasswordValid = await bcrypt.compare(PasswordHash, user.PasswordHash);
            if (!isPasswordValid) {
                return next(ApiError.badRequest('Неверный пароль.'));
            }

            const tokens = tokenService.generateTokens({ id: user.UserID, Email: user.Email, Phone: user.Phone, isAdmin: user.IsAdmin });
            await tokenService.saveToken(user.UserID, tokens.refreshToken);

            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json({ user: { id: user.UserID, email: user.Email, phone: user.Phone, isAdmin: user.IsAdmin }, tokens });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    // Логаут
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            if (!refreshToken) {
                return next(ApiError.badRequest('Токен не найден.'));
            }

            await tokenService.removeToken(refreshToken);
            res.clearCookie('refreshToken');
            return res.json({ message: 'Вы успешно вышли из системы.' });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    // Проверка авторизации
    async checkAuth(req, res, next) {
        try {
            const token = req.headers.Authorization?.split(' ')[1];
            if (!token) {
                return next(ApiError.unauthorized('Токен отсутствует.'));
            }

            const userData = tokenService.validateAccessToken(token);
            if (!userData) {
                return next(ApiError.unauthorized('Токен недействителен.'));
            }
            return res.json({ user: userData, accessToken: token });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    // Обновление токенов
    async refresh(req, res, next) {
        try {
            console.log("Cookies: ", req.cookies);
            const { refreshToken } = req.cookies;
            if (!req.cookies.refreshToken) {
                console.log("refreshToken отсутствует в cookies.");
            }

            const userData = tokenService.validateRefreshToken(refreshToken);
            const tokenFromDb = await tokenService.findToken(refreshToken);

            if (!userData || !tokenFromDb) {
                return next(ApiError.unauthorized('Токен недействителен.'));
            }

            const user = await User.findByPk(userData.id);
            const tokens = tokenService.generateTokens({ id: user.UserID, Email: user.Email, Phone: user.Phone, isAdmin: user.IsAdmin });

            await tokenService.saveToken(user.UserID, tokens.refreshToken);
            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });

            return res.json({ user: { id: user.UserID, email: user.Email, phone: user.Phone, isAdmin: user.IsAdmin }, tokens });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new UserController();
