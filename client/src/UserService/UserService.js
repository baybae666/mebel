import {$authHost, $host} from "../http/http";

const UserService = {
    async registration(Fullname, Email, Phone, PasswordHash) {
        return new Promise(resolve => resolve($authHost.post('/api/user/registration', {Fullname, Email, Phone, PasswordHash})));
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

    async refresh() {
        return new Promise(resolve => resolve($authHost.get('/api/user/refresh')));
    }
}

export default UserService;