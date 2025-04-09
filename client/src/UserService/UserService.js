import {$authHost, $host} from "../http/http";

const UserService = {
    async registration(Fullname, Email, Phone, CheckWord, PasswordHash) {
        return new Promise(resolve => resolve($authHost.post('/api/user/registration', {Fullname, Email, Phone, CheckWord, PasswordHash})));
    },

    async login(Phone, PasswordHash) {
        return new Promise(resolve => resolve($authHost.post('/api/user/login', {Phone, PasswordHash})));
    },

    async logout() {
        return new Promise(resolve => resolve($authHost.post('/api/user/logout')));
    },

    async checkAuth() {
        return new Promise(resolve => resolve($authHost.get('/api/user/check')));
    },

    async getAllusers() {
        return new Promise(resolve => resolve($authHost.get('/api/user/getAllUsers')));
    },

    async updateName(id, name) {
        return await $authHost.put('/api/user/changeNameByUserId', {id, name})
    },

    async updateEmail(id, email) {
        return await $authHost.put('/api/user/changeEmailByUserId', {id, email})
    },

    async updatePhone(id, phone) {
        return await $authHost.put('/api/user/changePhoneByUserId', {id, phone})
    },

    async updatePassword(id, password, word) {
        return await $authHost.put('/api/user/changePasswordByUserId', {id, password, word})
    },

    async refresh() {
        return new Promise(resolve => resolve($authHost.get('/api/user/refresh')));
    }
}

export default UserService;