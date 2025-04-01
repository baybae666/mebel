import { makeAutoObservable } from "mobx";
import UserService from "../UserService/UserService";
import axios from "axios";

export default class UserStore {
    _user = null; // Информация о пользователе
    _isAuth = false; // Авторизован ли пользователь
    _error = null; // Ошибка
    _isLoading = false; // Состояние загрузки

    constructor() {
        makeAutoObservable(this);
    }

    // Сеттеры и геттеры
    setUser(user) {
        this._user = user;
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
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
}

