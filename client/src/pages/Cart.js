import React, {useContext, useEffect} from "react";
import { observer } from "mobx-react-lite";
import CartItem from "../components/CartItem";
import {Context} from "../index";
import {NavLink} from "react-router-dom";
import {CATALOGROUTER} from "../utils/consts";

const Cart = observer(() => {
    const {cartStore } = useContext(Context);

    useEffect(() => {
        cartStore.fetchCart();
    }, [cartStore.fetchCart]);
    // Функция для изменения количества товара
    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity < 1) return;
        cartStore.addToCart(id, newQuantity);
    };

    const handleQuantityMinus = (id, newQuantity) => {
        cartStore.minus(id, newQuantity);
    };

    // Функция для удаления товара из корзины
    const handleRemove = (id) => {
        cartStore.removeFromCart(id);
    };

    // Функция для оформления заказа
    const handleCheckout = () => {
        alert('Рано')
        // Логика отправки заказа на сервер
    };


    if (cartStore.error) {
        return <p className="text-center text-red-500">{cartStore.error}</p>;
    }

    return (
        <div className="mx-auto py-6 w-4/5">
            <h1 className="text-2xl sm:text-4xl font-bold text-[#054C73] mb-6 text-left">
                Оформление заказа
            </h1>

            <div className="space-y-4">
                {cartStore.cart.length > 0 ? (
                    cartStore.cart.map((item) => (
                        <CartItem
                            key={item.FacadeID}
                            cartItem={item}
                            photo={item.Facade.PhotoURL}
                            minus={handleQuantityMinus}
                            onQuantityChange={handleQuantityChange}
                            onRemove={handleRemove}
                        />
                    ))
                ) : (
                    <div className='h-[45vh] flex justify-start items-center mt-16 flex-col gap-4'>
                        <p className="text-center text-3xl text-gray-600">Корзина пуста</p>
                        <NavLink to={CATALOGROUTER}><button className='bg-[#054C73] text-white mt-10 text-lg font-medium px-6 py-3 rounded-full hover:bg-[#033952] transition'>Перейти в каталог</button></NavLink>
                    </div>
                )}
            </div>
            {cartStore.cart.length > 0 && <div className='w-full mt-5 h-[1px] bg-black opacity-20'></div>}
            {cartStore.cart.length > 0 && (
                <div className="mt-8 flex flex-col items-center">
                    <div className="flex items-center justify-between w-full max-w-md text-xl font-semibold mb-4">
                        <span>Итого:</span>
                        <span>{cartStore.totalPrice.toLocaleString()} руб.</span>
                    </div>

                    <button
                        onClick={handleCheckout}
                        className="bg-[#054C73] text-white text-lg font-medium px-6 py-3 rounded-full hover:bg-[#033952] transition"
                    >
                        Оформить заявку
                    </button>
                </div>
            )}

            {cartStore.cart.length > 0 && <p className="opacity-70 tracking-wider text-xl w-4/5 m-auto mt-10 text-justify">
                После оформления заявки наш специалист свяжется с вами по указанному при регистрации номеру телефона. Во
                время разговора он уточнит детали вашего заказа и согласует удобное время для личной встречи, чтобы
                обсудить все нюансы и начать процесс создания фасадов по индивидуальному проекту.
            </p>}

        </div>
    );
});

export default Cart;
