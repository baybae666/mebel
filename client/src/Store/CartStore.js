import { makeAutoObservable } from "mobx";
import CartService from "../UserService/CartService";

export default class CartStore {
    _cart = []; // Список товаров
    _totalPrice = 0;
    _isLoading = false;
    _error = null;
    _cartId = null;

    constructor() {
        makeAutoObservable(this);
    }

    // Сеттеры и геттеры
    setCart(cart) {
        this._cart = cart;
    }

    setCartId(id) {
        this._cartId = id;
    }

    setTotalPrice(price) {
        this._totalPrice = price;
    }

    setLoading(loading) {
        this._isLoading = loading;
    }

    setError(error) {
        this._error = error;
    }

    get cart() {
        return this._cart;
    }

    get cartId() {
        return this._cartId;
    }

    get totalPrice() {
        return this._totalPrice;
    }

    get isLoading() {
        return this._isLoading;
    }

    get error() {
        return this._error;
    }

    // Методы
    async fetchCart() {
        this.setLoading(true);
        this.setError(null);
        try {
            const { items, totalPrice, cartId } = await CartService.getCart();
            this.setCart(items || []);
            this.setTotalPrice(totalPrice || 0);
            this.setCartId(cartId)
        } catch (error) {
            this.setError(error.message);
        } finally {
            this.setLoading(false);
        }
    }

    async addToCart(facadeId, quantity) {
        if (!facadeId || quantity <= 0) {
            this.setError("Некорректные данные для добавления");
            return;
        }

        this.setLoading(true);
        try {
            await CartService.addToCart(facadeId, quantity);
            await this.fetchCart(); // Обновляем корзину полностью
        } catch (error) {
            this.setError(error.message);
        } finally {
            this.setLoading(false);
        }
    }

    async minus(facadeId, quantity) {
        if (!facadeId || quantity <= 0) {
            this.setError("Некорректные данные");
            return;
        }

        this.setLoading(true);
        try {
            await CartService.minus(facadeId, quantity);
            await this.fetchCart(); // Обновляем корзину полностью
        } catch (error) {
            this.setError(error.message);
        } finally {
            this.setLoading(false);
        }
    }


    async removeFromCart(cartDetailId) {
        this.setLoading(true);
        try {
            await CartService.removeFromCart(cartDetailId);
            await this.fetchCart(); // Обновляем корзину после удаления товара
        } catch (error) {
            this.setError(error.message);
        } finally {
            this.setLoading(false);
        }
    }


    async clearCart() {
        this.setLoading(true);
        try {
            await CartService.clearCart();
            this.setCart([]);
            this.setTotalPrice(0);
        } catch (error) {
            this.setError(error.message);
        } finally {
            this.setLoading(false);
        }
    }

    calculateTotalPrice() {
        this.setTotalPrice(
            this._cart.reduce((total, item) => total + item.Quantity * item.PricePerUnit, 0)
        );
    }
}

