import React, {useContext, useEffect} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const OrderDetailItem = ({orderDetail}) => {
    const {orderDetailStore, userStore, } = useContext(Context)

    return (
        <div
            className="flex flex-col sm:flex-row items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-all group">
            {/* Изображение */}
            <div className="relative w-full min-w-[128px] sm:w-32 h-48 overflow-hidden rounded-xl">
                <img
                    src={process.env.REACT_APP_API_URL + orderDetail.PhotoURL}
                    alt={orderDetail.FacadeName}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-50/20 to-transparent"/>
            </div>

            {/* Информация о товаре */}
            <div className="flex-1 w-full space-y-2">
                <h3 className="text-lg font-bold text-[#054C73]">{orderDetail.FacadeName}</h3>
                <div className="flex flex-col gap-4 justify-center">
                    <div className="bg-gray-100 min-w-[176px] w-[10vw] px-3 py-1 rounded-full text-gray-600">
                        <span className="font-medium text-black">Цена: </span>
                        {orderDetail.PricePerUnit.toLocaleString()} руб.
                    </div>
                    <div className="bg-gray-100 px-3 min-w-[176px] w-[10vw] py-1 rounded-full text-gray-600">
                        <span className="font-medium text-black">Кол-во: </span>
                        {orderDetail.Quantity} шт.
                    </div>
                </div>
            </div>

            {/* Стоимость и кнопка удаления */}
            <div className="sm:text-right w-full sm:w-auto space-y-2">
                <div className="text-lg font-bold text-black">
                    {(orderDetail.Quantity * orderDetail.PricePerUnit).toLocaleString()} руб.
                </div>
            </div>
        </div>
    );
};

export default observer(OrderDetailItem);