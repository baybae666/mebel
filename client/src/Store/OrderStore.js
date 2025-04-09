import {makeAutoObservable} from "mobx";
import OrderService from "../UserService/OrderService";

class OrderStore {
    order = {}
    orders = []
    orderConfirm = false

    constructor() {
        makeAutoObservable(this)
    }

    setOrder(order) {
        this.order = order
    }

    setOrders(orders) {
        this.orders = orders
    }

    openOrderConfirm() {
        this.orderConfirm = true
    }

    closeOrderConfirm = () => {
        this.orderConfirm = false
    }

    getOrderConfirm = () => {
        return this.orderConfirm
    }

    async createOrder(UserID, OrderDate, OrderStatus, TotalPrice, CartID){
        try {
            const {data} = await OrderService.createOrder(UserID, OrderDate, OrderStatus, TotalPrice, CartID)
            this.setOrder(data)
            return true
        } catch (e) {
            return e
        }
    }

    async getOrderById(id){
        try {
            const {data} = await OrderService.getByOrderId(id)
            this.setOrder(data)
            return true
        } catch (e) {
            return e
        }
    }

    async getOrderByUserId(userId){
        try {
            const {data} = await OrderService.getByUserId(userId)
            this.setOrders(data)
            return data
        } catch (e) {
            return e
        }
    }

    async updateStatus(id, status){
        try {
            const {data} = await OrderService.updateStatus(id, status)
            this.setOrder(data)
            return true
        } catch (e) {
            return e
        }
    }


    async delOrder(id){
        try {
            const {data} = await OrderService.delOrder(id)
            this.setOrder({})
            return true
        } catch (e) {
            return e
        }
    }
}

export default OrderStore;