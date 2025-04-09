import {$authHost} from "../http/http";

const OrderService = {
    async createOrder(UserID, OrderDate, OrderStatus, TotalPrice, CartID) {
        return await $authHost.post('/api/order/createOrderByBasketId', {UserID, OrderDate, OrderStatus, TotalPrice, CartID})
    },

    async getByOrderId(id) {
        return await $authHost.post('/api/order/getOrderByOrderID', {id})
    },

    async getByUserId(userId) {
        return await $authHost.post('/api/order/getOrderByUserID', {userId})
    },

    async updateStatus(id, status) {
        return await $authHost.put('/api/order/changeStatusByOrderId', {id, status})
    },

    async updateTotalPrice(id, price) {
        return await $authHost.put('/api/order/changeTotalPriceByOrderId', {id, price})
    },

    async delOrder(id) {
        return await $authHost.post('/api/order/del', {id})
    }
}

export default OrderService;