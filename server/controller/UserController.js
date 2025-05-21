const { User, Order} = require('../models/model');
const ApiError = require('../Error/ApiError');
const bcrypt = require('bcrypt');
const tokenService = require('../services/tokenService'); // Создать tokenService
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer')

class UserController {

    async changePassword(req, res, next) {
        try {
            const {id, word, password} = req.body
            const user = await User.findOne({where: {UserID: id}})
            if (user.CheckWord === word) {
                const hashedPassword = await bcrypt.hash(password, 10);
                const updated = await User.update({ PasswordHash: hashedPassword }, { where: { UserID: id } })

                return res.json({status: true})
            }
            throw ApiError.badRequest('Введен неверный активационный код')


        } catch (e) {
            next(ApiError.badRequest((e.message)))
        }
    }

    // Регистрация
    async registration(req, res, next) {
        try {
            const { Fullname, Email, Phone, CheckWord, PasswordHash } = req.body;

            const existingUser = await User.findOne({ where: { Phone } });
            if (existingUser) {
                return next(ApiError.badRequest('Пользователь с таким номером уже существует.'));
            }

            const hashedPassword = await bcrypt.hash(PasswordHash, 10);
            const user = await User.create({ Fullname, Email, Phone, CheckWord, PasswordHash: hashedPassword });
            const tokens = tokenService.generateTokens({ id: user.UserID, fullname: user.Fullname, Email: user.Email, Phone: user.Phone, isAdmin: user.IsAdmin });
            await tokenService.saveToken(user.UserID, tokens.refreshToken);

            res.cookie('refreshToken', tokens.refreshToken, {
                maxAge: 10 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            });
            return res.json({ user: { id: user.UserID, fullname: user.Fullname, email: user.Email,phone: user.Phone, isAdmin: user.IsAdmin }, tokens });
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

            const tokens = tokenService.generateTokens({ id: user.UserID, fullname: user.Fullname, Email: user.Email, Phone: user.Phone, isAdmin: user.IsAdmin });
            await tokenService.saveToken(user.UserID, tokens.refreshToken);

            res.cookie('refreshToken', tokens.refreshToken, {
                maxAge: 10 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            });
            return res.json({ user: { id: user.UserID, fullname: user.Fullname, email: user.Email, phone: user.Phone, isAdmin: user.IsAdmin }, tokens });
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
            const token = req.headers.authorization?.split(' ')[1];
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
            const tokens = tokenService.generateTokens({ id: user.UserID, fullname: user.Fullname, Email: user.Email, Phone: user.Phone, isAdmin: user.IsAdmin });

            await tokenService.saveToken(user.UserID, tokens.refreshToken);
            res.cookie('refreshToken', tokens.refreshToken, {
                maxAge: 10 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            });

            return res.json({ user: { id: user.UserID, fullname: user.Fullname, email: user.Email, phone: user.Phone, isAdmin: user.IsAdmin }, tokens });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async changeNameByUserID(req, res, next) {
        try {
            const { id, name } = req.body
            const updated = await User.update({ Fullname: name }, { where: { UserID: id } })
            const user = await User.findOne({ where: { UserID: id } });
            return res.json({user: { id: user.UserID, fullname: user.Fullname, email: user.Email, phone: user.Phone, isAdmin: user.IsAdmin }})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeEmailByUserID(req, res, next) {
        try {
            const { id, email } = req.body
            const updated = await User.update({ Email: email }, { where: { UserID: id } })
            const user = await User.findOne({ where: { UserID: id } });
            return res.json({user: { id: user.UserID, fullname: user.Fullname, email: user.Email, phone: user.Phone, isAdmin: user.IsAdmin }})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changePhoneByUserID(req, res, next) {
        try {
            const { id, phone } = req.body
            const updated = await User.update({ Phone: phone }, { where: { UserID: id } })
            const user = await User.findOne({ where: { UserID: id } });
            return res.json({user: { id: user.UserID, fullname: user.Fullname, email: user.Email, phone: user.Phone, isAdmin: user.IsAdmin }})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const users = await User.findAll();
            return res.json({users})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}






module.exports = new UserController();
