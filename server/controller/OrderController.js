const ApiError = require('../Error/ApiError');
const {CartDetail, Order, OrderDetail} = require('../models/model');
class OrderController {
    async createOrderByBasketId(req, res, next) {
        try {
            const { UserID, OrderDate, OrderStatus, TotalPrice, CartID} = req.body
            const order = await Order.create({ UserID, OrderDate, OrderStatus, TotalPrice})
            const cartProducts = await CartDetail.findAll({ where: { CartID:  CartID} })
            cartProducts.forEach(cartProduct => {
                OrderDetail.create({
                    OrderID: order['OrderID'], FacadeID: cartProduct['FacadeID'], Quantity: cartProduct['Quantity'],
                    PricePerUnit: cartProduct['PricePerUnit']
                })
            })
            await CartDetail.destroy({ where: { CartID: CartID } })
            return res.json(order)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOrderByOrderID(req, res, next) {
        try {
            const { id } = req.body
            const order = await Order.findOne({ where: { OrderID: id } })
            return res.json(order)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOrderByUserID(req, res, next) {
        try {
            const { userId } = req.body
            const order = await Order.findAll({ where: { UserID: userId } })
            return res.json(order)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeStatusByOrderID(req, res, next) {
        try {
            const { id, status } = req.body
            const updated = await Order.update({ OrderStatus: status }, { where: { OrderID: id } })
            return res.json(updated)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeTotalPriceByOrderID(req, res, next) {
        try {
            const { id, price } = req.body
            const updated = await Order.update({ TotalPrice: price }, { where: { OrderID: id } })
            return res.json(updated)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delOrder(req, res, next) {
        try {
            const { id } = req.body
            const deleted = await Order.destroy({ where: { OrderID: id } })
            return res.json(deleted)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new OrderController()