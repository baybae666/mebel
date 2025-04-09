import {$authHost, $host} from "../http/http";

const UserService = {
    async registration(Fullname, Email, Phone, PasswordHash) {
        return new Promise(resolve => resolve($authHost.post('/api/user/registration', {Fullname, Email, Phone, PasswordHash})));
    },

    async login(Phone, PasswordHash) {
        return new Promise(resolve => resolve($authHost.post('/api/user/login', {Phone, PasswordHash})));
    },

    async sentCode(phone, email) {
        return new Promise(resolve => resolve($authHost.post('/api/user/sentCode', {phone, email})));
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

    async updatePassword(id, password, code) {
        return await $authHost.put('/api/user/changePasswordByUserId', {id, password, code})
    },

    async refresh() {
        return new Promise(resolve => resolve($authHost.get('/api/user/refresh')));
    }
}

export default UserService;