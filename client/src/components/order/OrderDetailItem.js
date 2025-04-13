import React, {useContext, useEffect} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const OrderDetailItem = ({orderDetail}) => {
    const {orderDetailStore, userStore, } = useContext(Context)

    return (
        <div className="flex flex-col gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            {/* Изображение с сохранением пропорций */}
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg">
                <img
                    src={process.env.REACT_APP_API_URL + orderDetail.PhotoURL}
                    alt={orderDetail.FacadeName}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent"/>
            </div>

            {/* Информация о товаре */}
            <div className="space-y-2">
                <h3 className="text-bold font-semibold text-[#054C73]">
                    {orderDetail.FacadeName}
                </h3>

                <div className="flex flex-wrap gap-2">
                    <div className="flex-1 min-w-[140px] bg-gray-100 px-3 py-2 text-gray-600 rounded-md">
                        <span className="text-sm font-medium text-black ">Цена: </span>
                        <span className="text-base ">
              {orderDetail.PricePerUnit.toLocaleString()} руб.
            </span>
                    </div>

                    <div className="flex-1 min-w-[140px] bg-gray-100 text-gray-600 px-3 py-2 rounded-md">
                        <span className="text-sm font-medium text-black">Количество: </span>
                        <span className="text-base">
              {orderDetail.Quantity} шт.
            </span>
                    </div>
                </div>
            </div>

            {/* Стоимость и кнопка удаления */}
            <div className="flex items-center justify-between mt-2">
                <div className="text-lg font-bold text-black">
                    {(orderDetail.Quantity * orderDetail.PricePerUnit).toLocaleString()} руб.
                </div>
            </div>
        </div>
    );
};

export default observer(OrderDetailItem);