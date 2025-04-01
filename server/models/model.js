const sequelize = require('../db');
const { DataTypes } = require('sequelize');

// Таблица пользователей
const User = sequelize.define('User', {
    UserID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Fullname: { type: DataTypes.STRING(50), allowNull: false },
    PasswordHash: { type: DataTypes.STRING(255), allowNull: false },
    Email: { type: DataTypes.STRING(100), unique: true, allowNull: false },
    Phone: { type: DataTypes.STRING(15), allowNull: true },
    IsAdmin: { type: DataTypes.BOOLEAN, defaultValue: false }, // Признак администратора
});

// Таблица токенов
const Token = sequelize.define('Token', {
    TokenID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    UserID: { type: DataTypes.INTEGER, allowNull: false }, // Привязка к пользователю
    RefreshToken: { type: DataTypes.TEXT, allowNull: false }, // Сохранение refresh-токена
});


// Таблица заказов
const Order = sequelize.define('Order', {
    OrderID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    UserID: { type: DataTypes.INTEGER, allowNull: false },
    OrderDate: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    OrderStatus: { type: DataTypes.STRING(20), allowNull: false, defaultValue: "Pending" },
    TotalPrice: { type: DataTypes.FLOAT, allowNull: false },
});

// Таблица фасадов
const Facade = sequelize.define('Facade', {
    FacadeID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    FacadeName: { type: DataTypes.STRING(100), allowNull: false },
    Material: { type: DataTypes.STRING(255), allowNull: false },
    Backside: { type: DataTypes.STRING(50), allowNull: false },
    Batch: { type: DataTypes.STRING(50), allowNull: false },
    Cover: { type: DataTypes.STRING(50), allowNull: false },
    Patina: { type: DataTypes.STRING(50), allowNull: false },
    SpaceForGlass: { type: DataTypes.BOOLEAN, allowNull: false },
    Direction: { type: DataTypes.STRING(50), allowNull: false },
    Guarantee: { type: DataTypes.STRING(50), allowNull: false },
    Price: { type: DataTypes.FLOAT, allowNull: false },
    Description: { type: DataTypes.STRING(355), allowNull: false },
    PhotoURL: { type: DataTypes.STRING(255), allowNull: true },
});

// Таблица деталей заказа
const OrderDetail = sequelize.define('OrderDetail', {
    OrderDetailID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    OrderID: { type: DataTypes.INTEGER, allowNull: false },
    FacadeID: { type: DataTypes.INTEGER, allowNull: false },
    Quantity: { type: DataTypes.INTEGER, allowNull: false },
    PricePerUnit: { type: DataTypes.FLOAT, allowNull: false },
});

// Таблица корзины
const Cart = sequelize.define('Cart', {
    CartID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    UserID: { type: DataTypes.INTEGER, allowNull: false },
    TotalPrice: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
});

// Таблица деталей корзины
const CartDetail = sequelize.define('CartDetail', {
    CartDetailID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    CartID: { type: DataTypes.INTEGER, allowNull: false },
    FacadeID: { type: DataTypes.INTEGER, allowNull: false },
    Quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    PricePerUnit: { type: DataTypes.FLOAT, allowNull: false },
});

// Определение связей
User.hasMany(Token, { foreignKey: 'UserID' });
Token.belongsTo(User, { foreignKey: 'UserID' });

User.hasMany(Order, { foreignKey: 'UserID' });
Order.belongsTo(User, { foreignKey: 'UserID' });

Order.hasMany(OrderDetail, { foreignKey: 'OrderID' });
OrderDetail.belongsTo(Order, { foreignKey: 'OrderID' });

Facade.hasMany(OrderDetail, { foreignKey: 'FacadeID' });
OrderDetail.belongsTo(Facade, { foreignKey: 'FacadeID' });

User.hasOne(Cart, { foreignKey: 'UserID' });
Cart.belongsTo(User, { foreignKey: 'UserID' });

Cart.hasMany(CartDetail, { foreignKey: 'CartID' });
CartDetail.belongsTo(Cart, { foreignKey: 'CartID' });

Facade.hasMany(CartDetail, { foreignKey: 'FacadeID' });
CartDetail.belongsTo(Facade, { foreignKey: 'FacadeID' });

module.exports = {
    User,
    Token,
    Order,
    Facade,
    OrderDetail,
    Cart,
    CartDetail,
};
