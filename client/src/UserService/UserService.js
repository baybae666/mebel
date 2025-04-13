import {$authHost, $host} from "../http/http";

const UserService = {
    // Регистрация нового пользователя
    async registration(Fullname, Email, Phone, CheckWord, PasswordHash) {
        return new Promise(resolve => resolve(
            $authHost.post('/api/user/registration', {Fullname, Email, Phone, CheckWord, PasswordHash})
        ));
    },

    // Авторизация пользователя (по телефону и паролю)
    async login(Phone, PasswordHash) {
        return new Promise(resolve => resolve(
            $authHost.post('/api/user/login', {Phone, PasswordHash})
        ));
    },

    // Выход из системы (удаление сессии)
    async logout() {
        return new Promise(resolve => resolve(
            $authHost.post('/api/user/logout')
        ));
    },

    // Проверка авторизации пользователя
    async checkAuth() {
        return new Promise(resolve => resolve(
            $authHost.get('/api/user/check')
        ));
    },

    // Получение списка всех пользователей (только для админов)
    async getAllusers() {
        return new Promise(resolve => resolve(
            $authHost.get('/api/user/getAllUsers')
        ));
    },

    // Обновление имени пользователя
    async updateName(id, name) {
        return await $authHost.put('/api/user/changeNameByUserId', {id, name})
    },

    // Обновление email пользователя
    async updateEmail(id, email) {
        return await $authHost.put('/api/user/changeEmailByUserId', {id, email})
    },

    // Обновление телефона пользователя
    async updatePhone(id, phone) {
        return await $authHost.put('/api/user/changePhoneByUserId', {id, phone})
    },

    // Смена пароля (требуется секретное слово)
    async updatePassword(id, password, word) {
        return await $authHost.put('/api/user/changePasswordByUserId', {id, password, word})
    },

    // Обновление access token через refresh token
    async refresh() {
        return new Promise(resolve => resolve(
            $authHost.get('/api/user/refresh')
        ));
    }
}

export default UserService;