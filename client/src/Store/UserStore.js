import { makeAutoObservable } from "mobx";
import UserService from "../UserService/UserService";
import axios from "axios";

export default class UserStore {
    _user = null; // Информация о пользователе
    _isAuth = false; // Авторизован ли пользователь
    _error = null; // Ошибка
    _isLoading = false; // Состояние загрузки
    _users = [];
    pickUserId = null

    constructor() {
        makeAutoObservable(this);
    }

    // Сеттеры и геттеры
    setUser(user) {
        this._user = user;
    }

    setUsers(users) {
        this._users = users;
    }

    onpPickUserId(user) {
        this.pickUserId = user;
    }

    setAuth(isAuth) {
        this._isAuth = isAuth;
    }

    setError(error) {
        this._error = error;
    }

    setLoading(isLoading) {
        this._isLoading = isLoading;
    }

    get user() {
        return this._user;
    }

    get users() {
        return this._users;
    }

    get isAuth() {
        return this._isAuth;
    }

    get error() {
        return this._error;
    }

    get isLoading() {
        return this._isLoading;
    }

    // Методы
    async register(fullname, email, phone, passwordHash) {
        this.setLoading(true);
        this.setError(null);
        try {
            const response = await UserService.registration(fullname, email, phone, passwordHash);
            localStorage.setItem('accessToken', response.data.tokens.accessToken);
            this.setUser(response.data.user);
            this.setAuth(true);
        } catch (error) {
            this.setError(error.message);
        } finally {
            this.setLoading(false);
        }
    }

    async login(phone, passwordHash) {
        this.setLoading(true);
        this.setError(null);
        try {
            const response = await UserService.login(phone, passwordHash);
            localStorage.setItem('accessToken', response.data.tokens.accessToken);
            this.setUser(response.data.user);
            this.setAuth(true);
        } catch (error) {
            this.setError(error.message);
        } finally {
            this.setLoading(false);
        }
    }

    async logout() {
        this.setLoading(true);
        this.setError(null);
        try {
            await UserService.logout();
            this.setUser(null);
            this.setAuth(false);
        } catch (error) {
            this.setError(error.message);
        } finally {
            this.setLoading(false);
        }
    }

    async checkAuth() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}api/user/refresh`, { withCredentials: true })
            localStorage.setItem('accessToken', response.data.tokens.accessToken);
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            await this.logout()
            console.log(e.response?.data?.message)
        }
    }

    async getAll(){
        try {
            const {data} = await UserService.getAllusers()
            this.setUsers(data.users)
            return data
        } catch (e) {
            return e
        }
    }

    async updateName(id, name){
        try {
            const {data} = await UserService.updateName(id, name)
            this.setUser(data.user)
            return true
        } catch (e) {
            return e
        }
    }

    async updateEmail(id, email){
        try {
            const {data} = await UserService.updateEmail(id, email)
            this.setUser(data.user)
            return true
        } catch (e) {
            return e
        }
    }

    async updatePhone(id, phone){
        try {
            const {data} = await UserService.updatePhone(id, phone)
            this.setUser(data.user)
            return true
        } catch (e) {
            return e
        }
    }

    async updatePassword(id, password, code){
        try {
            const {data} = await UserService.updatePassword(id, password, code)
            return true
        } catch (e) {
            throw e
        }
    }

    async sentCode(Phone, email){
        try {
            const {data} = await UserService.sentCode(Phone, email)
            return true
        } catch (e) {
            throw e
        }
    }
}

