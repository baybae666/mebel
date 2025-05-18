import React from "react";
import { observer } from "mobx-react-lite";

const CartItem = ({ cartItem, onQuantityChange, photo, onRemove, minus}) => {
    const { FacadeID, CartDetailID, Facade, PricePerUnit, Quantity } = cartItem;


    return (
        <div
            className="flex w-4/5 m-auto relative bg-white shadow-lg flex-col pt-2 px-10 sm:flex-row items-center rounded-xl sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 border-b pb-6">
            <div className="w-32 h-full p-2 sm:w-40 sm:h-56 rounded object-cover">
                <img
                    src={process.env.REACT_APP_API_URL + photo}
                    alt={Facade.FacadeName}
                    className="w-full h-full sm:w-40 sm:h-56 rounded object-cover"
                />
            </div>

            {/* Информация о товаре */}
            <div className="h-1/2 flex-1 self-center text-center sm:text-left">
                <h3 className="text-2xl font-semibold text-[#054C73]">{Facade.FacadeName}</h3>
                <p className="text-lg text-gray-600 mt-2">
                    от {PricePerUnit.toLocaleString()} руб.
                </p>
            </div>
            <div className="flex items-center self-center justify-center sm:justify-start space-x-4">
                <button
                    onClick={() => minus(FacadeID, Quantity)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                    -
                </button>
                <span className="text-lg">{Quantity}</span>
                <button
                    onClick={() => onQuantityChange(FacadeID, Quantity + 1)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                    +
                </button>
            </div>

            <div className='text-xl font-semibold self-center'>
                <span className='text-base font-medium'>Стоимость от</span> <br/>
                {Quantity * PricePerUnit} руб.
            </div>

                <div className="absolute mt-4 sm:mt-auto bottom-0 right-5">
                    <button
                        onClick={() => onRemove(CartDetailID)}
                        className="text-black underline"

                    >
                        Удалить
                    </button>
                </div>

        </div>
    );
};

export default observer(CartItem);
