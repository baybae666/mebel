const { Cart, CartDetail, Facade } = require('../models/model');
const ApiError = require('../error/ApiError');

class CartController {
    // Получить содержимое корзины
    async getCart(req, res, next) {
        try {
            const userId = req.user.id;

            const cart = await Cart.findOne({
                where: { UserID: userId },
                include: [
                    {
                        model: CartDetail,
                        include: [{ model: Facade }],
                    },
                ],
            });

            // Если корзина пуста, вернуть пустые данные
            if (!cart || !cart.CartDetails?.length) {
                return res.json({ items: [], totalPrice: 0 });
            }

            const cartDetails = cart.CartDetails.map((detail) => ({
                CartDetailID: detail.CartDetailID,
                FacadeID: detail.FacadeID,
                Quantity: detail.Quantity,
                PricePerUnit: detail.PricePerUnit,
                Facade: detail.Facade, // Данные фасада
            }));

            return res.json({
                items: cartDetails,
                totalPrice: cart.TotalPrice,
            });
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    // Добавить товар в корзину
    async addToCart(req, res, next) {
        try {
            const userId = req.user.id;
            const { facadeId, quantity } = req.body;

            if (!facadeId || quantity <= 0) {
                return next(ApiError.badRequest('Неверные данные для добавления в корзину'));
            }

            let cart = await Cart.findOne({ where: { UserID: userId } });
            if (!cart) {
                cart = await Cart.create({ UserID: userId, TotalPrice: 0 });
            }

            const facade = await Facade.findByPk(facadeId);
            if (!facade) {
                return next(ApiError.badRequest('Фасад не найден'));
            }

            let cartDetail = await CartDetail.findOne({
                where: { CartID: cart.CartID, FacadeID: facadeId },
            });

            if (cartDetail) {
                cartDetail.Quantity += 1;
                await cartDetail.save();
            } else {
                cartDetail = await CartDetail.create({
                    CartID: cart.CartID,
                    FacadeID: facadeId,
                    Quantity: quantity,
                    PricePerUnit: facade.Price,
                });
            }
            const cartDetails = await CartDetail.findAll({
                where: { CartID: cart.CartID },
                attributes: ['PricePerUnit', 'Quantity'], // Получить только нужные поля
            });

            cart.TotalPrice = cartDetails.reduce(
                (total, item) => total + item.PricePerUnit * item.Quantity,
                0
            );

            await cart.save();

            return res.json(cartDetail);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }


    async minusQuantity(req, res, next) {
        try {
            const userId = req.user.id;
            const { facadeId, quantity } = req.body;

            if (!facadeId || quantity <= 0) {
                return next(ApiError.badRequest('Неверные данные'));
            }

            let cart = await Cart.findOne({ where: { UserID: userId } });

            const facade = await Facade.findByPk(facadeId);
            if (!facade) {
                return next(ApiError.badRequest('Фасад не найден'));
            }

            let cartDetail = await CartDetail.findOne({
                where: { CartID: cart.CartID, FacadeID: facadeId },
            });

            if (cartDetail && cartDetail.Quantity > 1) {
                cartDetail.Quantity -= 1;
                await cartDetail.save();
            } else {
                await cartDetail.destroy();
            }
            const cartDetails = await CartDetail.findAll({
                where: { CartID: cart.CartID },
                attributes: ['PricePerUnit', 'Quantity'], // Получить только нужные поля
            });

            cart.TotalPrice = cartDetails.reduce(
                (total, item) => total + item.PricePerUnit * item.Quantity,
                0
            );

            await cart.save();

            return res.json(cartDetail);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    // Удалить товар из корзины
    async removeFromCart(req, res, next) {
        try {
            const userId = req.user.id;
            const { cartDetailId } = req.params;

            const cart = await Cart.findOne({ where: { UserID: userId } });
            if (!cart) {
                return next(ApiError.badRequest('Корзина не найдена'));
            }

            const cartDetail = await CartDetail.findOne({
                where: { CartDetailID: cartDetailId, CartID: cart.CartID },
            });
            if (!cartDetail) {
                return next(ApiError.badRequest('Товар не найден в корзине'));
            }

            await cartDetail.destroy();

            const cartDetails = await CartDetail.findAll({
                where: { CartID: cart.CartID },
                attributes: ['PricePerUnit', 'Quantity'], // Получить только нужные поля
            });

            if (cartDetails.length > 0) {
                cart.TotalPrice = cartDetails.reduce(
                    (total, item) => total + item.PricePerUnit * item.Quantity,
                    0
                );
            } else {
                cart.TotalPrice = 0;
            }


            await cart.save();

            return res.json({ message: 'Товар удалён из корзины' });
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    // Очистить корзину
    async clearCart(req, res, next) {
        try {
            const userId = req.user.id;

            const cart = await Cart.findOne({ where: { UserID: userId } });
            if (!cart) {
                return next(ApiError.badRequest('Корзина не найдена'));
            }

            await CartDetail.destroy({ where: { CartID: cart.CartID } });

            cart.TotalPrice = 0;
            await cart.save();

            return res.json({ message: 'Корзина очищена' });
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
}

module.exports = new CartController();
