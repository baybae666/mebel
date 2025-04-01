const jwt = require('jsonwebtoken');
const { Token } = require('../models/model'); // Предполагается, что вы используете Sequelize и есть модель Token в БД
const ApiError = require('../error/ApiError');

class TokenService {
    // Генерация токенов (access и refresh)
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
        return { accessToken, refreshToken };
    }

    // Валидация access-токена
    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    // Валидация refresh-токена
    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    // Сохранение refresh-токена в БД
    async saveToken(UserID, RefreshToken) {
        const tokenData = await Token.findOne({ where: { UserID } });
        if (tokenData) {
            tokenData.RefreshToken = RefreshToken;
            return tokenData.save();
        }
        return await Token.create({ UserID, RefreshToken });
    }

    // Удаление refresh-токена из БД
    async removeToken(RefreshToken) {
        const tokenData = await Token.destroy({ where: { RefreshToken } });
        return tokenData;
    }

    // Поиск токена в БД
    async findToken(RefreshToken) {
        const tokenData = await Token.findOne({ where: { RefreshToken } });
        return tokenData;
    }
}

module.exports = new TokenService();
