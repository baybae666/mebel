import {$authHost} from "../http/http";

const OrderDetailService = {
    async createOrderDetail(OrderID, FacadeID, Quantity, PricePerUnit) {
        return await $authHost.post('/api/orderDetail/createOrderProduct', {OrderID, FacadeID, Quantity, PricePerUnit})
    },

    async getOrderDetailWithFacade(orderId) {
        return await $authHost.post('/api/orderDetail/getOrderProductsWithAssortmentInfoByOrderId', {orderId})
    },

    async getOrderDetailByOrderId(orderId) {
        return await $authHost.post('/api/orderDetail/getOrderProductByOrderID', {orderId})
    },

    async delOrderDetail(orderId) {
        return await $authHost.post('/api/orderDetail/deleteOrderProductByOrderId', {orderId})
    }
}

export default OrderDetailService