import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCTROUTER } from "../utils/consts";
import { Context } from "../index";
import Notification from "./Notification";

const FacadeItem = ({ facade }) => {
    const navigate = useNavigate();
    const { cartStore } = useContext(Context);
    const [showNotification, setShowNotification] = useState(false);
    const offNotification = () => setShowNotification(false)
    const navigateToProduct = () => navigate(PRODUCTROUTER + "/" + facade.FacadeID);

    const handleAddToCart = () => {
        cartStore.addToCart(facade.FacadeID, 1);
        setShowNotification(true); // Показываем уведомление
    };

    return (
        <div
            className="
        facadeItem
        w-[90%] sm:w-[236px] md:w-[280px]
        h-auto sm:h-[300px] md:h-[350px]
        flex flex-col items-center justify-center
        mb-4 bg-white rounded-[15px] shadow"
        >
            <div
                className="h-[70%] w-full px-5 py-1 mt-3 sm:w-2/3 sm:h-[70%]"
                onClick={navigateToProduct}
            >
                <img
                    className="facade-img h-full w-full rounded-[5px] shadow object-cover"
                    src={process.env.REACT_APP_API_URL + facade.PhotoURL}
                    alt={facade.FacadeName}
                />
            </div>

            <div className="w-full h-[40%] flex flex-col items-center justify-around">
                <h2
                    className="
            font-medium text-[14px] sm:text-[14px] md:text-[16px]
            text-[#070707] text-center w-[90%] sm:w-[80%]"
                    onClick={navigateToProduct}
                >
                    {facade.FacadeName}
                </h2>

                <span
                    className="font-medium text-lg sm:text-xl text-[#070707]"
                >
          {facade.Price} руб/шт
        </span>

                <button
                    className="
            w-10/12 sm:w-6/12 mb-2
            min-h-[30px] max-h-[24px] sm:min-h-[22px] sm:max-h-[26px]
            h-[25%] sm:h-[30%]
            bg-[#054C73] rounded-[40px]
            font-medium text-sm sm:text-base text-white"
                    onClick={handleAddToCart}
                >
                    Купить
                </button>
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

export default FacadeItem;
