const {OrderDetail} = require("../models/model");
const facadeController = require('./FacadeConntroller')
const ApiError = require('../Error/ApiError');
class OrderProductController {

    // Объединенные методы

    async getOrderProductsWithAssortmentInfoByOrderId(req, res, next) {
        try {
            const {orderId} = req.body
            const orderProducts = await OrderDetail.findAll({where: {OrderID: orderId}})
            let ids = []
            orderProducts.forEach(orderProduct => {
                ids.push(orderProduct['FacadeID'])
            })
            const assortment = await facadeController.getFacadeByIdsFromBack(ids)
            let orderProductsWithAssortment = []
            orderProducts.forEach(orderProduct => {
                assortment.forEach(product => {
                    if (orderProduct['FacadeID'] === product['FacadeID']) {
                        orderProduct = JSON.parse(JSON.stringify(orderProduct))
                        product = JSON.parse(JSON.stringify(product))
                        delete product['FacadeID']
                        delete orderProduct['FacadeID']
                        orderProductsWithAssortment.push({...orderProduct, ...product})
                    }
                })
            })
            return res.json(orderProductsWithAssortment)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    //


    async createOrderProduct(req, res, next) {
        try {
            const {OrderID, FacadeID, Quantity, PricePerUnit} = req.body
            const orderProduct = await OrderDetail.create({OrderID, FacadeID, Quantity, PricePerUnit})
            return res.json(orderProduct)

        } catch (e){
            next(ApiError.badRequest(e.message))

        }

    }

    async getOrderProductByOrderID(req, res, next) {
        try {
            const {orderId} = req.body
            const orderProduct = await OrderDetail.findAll({where:{OrderID:orderId}})
            return res.json(orderProduct)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async deleteOrderProductByOrderId(req, res, next) {
        try {
            const {orderId} = req.body
            const deleted = await OrderDetail.destroy({where:{OrderDetailID:orderId}})
            return res.json(deleted)

        } catch (e){
            next(ApiError.badRequest(e.message))

        }

    }
}

module.exports = new OrderProductController()