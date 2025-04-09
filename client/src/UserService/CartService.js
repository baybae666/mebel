import { $authHost } from "../http/http";

const CartService = {
    getCart() {
        return new Promise((resolve, reject) => {
            $authHost.get('/api/cart/')
                .then(response => resolve(response.data))
                .catch(error => reject(error));
        });
    },

    addToCart(facadeId, quantity) {
        return new Promise((resolve, reject) => {
            $authHost.post('/api/cart/add', { facadeId, quantity })
                .then(response => resolve(response.data))
                .catch(error => reject(error));
        });
    },

    minus(facadeId, quantity, userId) {
        return new Promise((resolve, reject) => {
            $authHost.post('/api/cart/minus', { facadeId, quantity, userId })
                .then(response => resolve(response.data))
                .catch(error => reject(error));
        });
    },

    removeFromCart(cartDetailId) {
        return new Promise((resolve, reject) => {
            $authHost.delete(`/api/cart/remove/${cartDetailId}`)
                .then(response => resolve(response.data))
                .catch(error => reject(error));
        });
    },

    clearCart() {
        return new Promise((resolve, reject) => {
            $authHost.delete('/api/cart/clear')
                .then(response => resolve(response.data))
                .catch(error => reject(error));
        });
    }
};

export default CartService;
