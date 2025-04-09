import {makeAutoObservable} from "mobx";
import OrderDetailService from "../UserService/OrderDetailService";

export default class OrderDetailsStore {
    orderDetail = {}
    orderDetails = []

    constructor() {
        makeAutoObservable(this)
    }

    setOrderDetail(detail) {
        this.orderDetail = detail
    }

    setOrderDetails(details) {
        this.orderDetails = details
    }

    async createOrderDetails(OrderID, FacadeID, Quantity, PricePreUnit) {
        try {
            const {data} = await OrderDetailService.createOrderDetail(OrderID, FacadeID, Quantity, PricePreUnit)
            this.setOrderDetail(data)
            return true
        } catch (e) {
            return e
        }
    }

    async getOrderDeatilsByOrderId(orderId) {
        try {
            const {data} = await OrderDetailService.getOrderDetailByOrderId(orderId)
            this.setOrderDetails(data)
            return true
        } catch (e) {
            return e
        }
    }

    async getOrderDetailWithFacade(orderId) {
        try {
            const {data} = await OrderDetailService.getOrderDetailWithFacade(orderId)
            this.setOrderDetails(data)
            return data
        } catch (e) {
            return e
        }
    }

    async delOrderDetail(orderId) {
        try {
            const {data} = await OrderDetailService.delOrderDetail(orderId)
            this.setOrderDetail({})
            return true
        } catch (e) {
            return e
        }
    }
}