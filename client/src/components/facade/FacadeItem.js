import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCTROUTER } from "../../utils/consts";
import { Context } from "../../index";
import Notification from "../Notification";
import {observer} from "mobx-react-lite";

const FacadeItem = ({ facade }) => {
    const navigate = useNavigate();
    const { cartStore, userStore } = useContext(Context);
    const [cartProducts, setCartProducts] = useState([])
    const [currentQuantity, setCurrentQuantity] = useState(0);
    const [showNotification, setShowNotification] = useState(false);
    const offNotification = () => setShowNotification(false)
    const navigateToProduct = () => navigate(PRODUCTROUTER + "/" + facade.FacadeID);

    const cartItem = cartStore.cart.find(item => item.FacadeID === facade.FacadeID);

    useEffect(() => {
        if (cartItem) {
            setCurrentQuantity(cartItem.Quantity);
        }
    }, [cartItem]);

    const handleAddToCart = () => {
        cartStore.addToCart(facade.FacadeID, 1);
        setShowNotification(true);
    };

    const handleQuantityChange =async (id, newQuantity) => {
        if (newQuantity < 1) return;
        await cartStore.addToCart(id, newQuantity);
    };

    const handleQuantityMinus = async (id, newQuantity) => {
        await cartStore.minus(id, newQuantity, userStore.user.id);
    };

    // Функция для удаления товара из корзины
    const handleRemove = (id) => {
        cartStore.removeFromCart(id);
    };


    useEffect(() => {
        cartStore.fetchCart().then(res => {
            setCartProducts(res.map(product => product.FacadeID))
        })
    }, []);

    return (
        <div
            className="
        facadeItem
        hover:shadow-lg transition-shadow duration-300
        w-full sm:w-[236px] md:w-[280px]
        h-auto sm:h-[300px] md:h-[350px]
        flex flex-col items-center justify-center
        mb-4 bg-white rounded-[15px] shadow"
        >
            <div
                className="h-[70%] w-full px-5 py-1 mt-3 sm:w-2/3 sm:h-[70%]"
                onClick={navigateToProduct}
            >
                <img
                    loading="lazy"
                    className="facade-img h-full w-full rounded-[5px] shadow object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                    src={process.env.REACT_APP_API_URL + facade.PhotoURL}
                    alt={facade.FacadeName}
                />
            </div>

            <div className="w-full h-[40%] flex flex-col items-center justify-around">
                <h2
                    className="hover:text-[#054C73] transition-colors cursor-pointer
            font-medium text-[14px] sm:text-[14px] md:text-[16px]
            text-[#070707] text-center w-[90%] sm:w-[80%]"
                    onClick={navigateToProduct}
                >
                    {facade.FacadeName}
                </h2>

                <span
                    className="font-medium text-lg sm:text-xl text-[#070707]"
                >
          от {facade.Price} руб
        </span>


                {cartItem ? (
                    <div className="flex items-center gap-3 mb-2">
                        <button
                            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center
             bg-[#054C73] hover:bg-[#033952] text-white rounded-full
             transition-colors duration-300 active:scale-95"
                            onClick={() => handleQuantityMinus(facade.FacadeID, cartItem)}
                        >
                            <span className="">−</span>
                        </button>

                        <span className="font-medium min-w-[30px] text-center text-gray-800
                 border border-gray-200 rounded-lg py-1 px-3">
    {currentQuantity}
  </span>

                        <button
                            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center
             bg-[#054C73] hover:bg-[#033952] text-white rounded-full
             transition-colors duration-300 active:scale-95"
                            onClick={() => handleQuantityChange(facade.FacadeID, cartItem + 1)}
                        >
                            <span className="">+</span>
                        </button>
                    </div>
                ) : (
                    <button
                        className="w-full max-w-[160px] py-2 px-4 bg-[#054C73] hover:bg-[#033952]
           text-white rounded-full mb-2 font-medium transition-all duration-300
           text-sm sm:text-base md:text-[15px]
           hover:shadow-md active:scale-95"
                        onClick={handleAddToCart}
                    >
                        Купить
                    </button>
                )}
            </div>

            {showNotification && (
                <Notification
                    message="Товар добавлен в корзину"
                    duration={3000}
                    offShow={offNotification}
                />
            )}
        </div>
    );
};

export default observer(FacadeItem);
