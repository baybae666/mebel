import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const OrderItem = ({id, order}) => {
    const {orderDetailStore, userStore, orderStore} = useContext(Context)
    const [orderDetails, setOrderDetails] = useState([])
    const getOrderDetails = async () => {
        await orderDetailStore.getOrderDetailWithFacade(id).then(res => setOrderDetails(res))
    }

    const delOrder = async () => {
        await orderStore.delOrder(id)
    }

    useEffect(() => {
        getOrderDetails()
    }, [id]);

    return (
            <div
                className="flex flex-col relative md:flex-row justify-between me-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow mb-4">
                <div className="flex-1 pr-4">
                    <div className="flex justify-between items-start mb-2">
                        <span
                            className="text-black text-xm">Заказ от {new Date(order.OrderDate).toLocaleDateString()}</span>
                        <span
                            className={`text-xs px-2 py-1 rounded-full ${order.OrderStatus === 'Оформлен' ? 'bg-teal-100 text-teal-800' : 'bg-red-300 text-white '}`}>
                        {order.OrderStatus}
                    </span>
                    </div>

                    <div className="mb-2">
                        <p className="text-xm font-normal text-[#054C73] tracking-wider mb-1">Состав заказа:</p>
                        <div className="text-sm text-gray-600">
                            {orderDetails.map((orderDetail, index) => (
                                <span key={orderDetail.OrderDetailID}>
                                {orderDetail.FacadeName} ({orderDetail.Quantity} шт.)
                                    {index !== orderDetailStore.orderDetails.length - 1 && '; '}
                            </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end mt-4 md:mt-0 md:w-64">
                    <div className="flex items-center mb-2">
                    <span className="text-sm text-gray-600 mr-2">
                        {orderDetails.length} товара(-ов)
                    </span>
                        <span className="text-lg font-semibold text-gray-800">
                        {order.TotalPrice} руб.
                    </span>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-end">
                        {orderDetails.map(orderDetail => (
                            <img
                                key={orderDetail.OrderDetailID}
                                alt={orderDetail.FacadeName}
                                src={orderDetail.PhotoURL}
                                className="w-12 h-18 object-cover rounded border border-gray-200"
                            />
                        ))}
                    </div>
                </div>
                {userStore.user.isAdmin && (
                    <button
                        onClick={e => {
                            e.stopPropagation();
                            delOrder();
                        }}
                        className="absolute -right-8 top-1/2 -translate-y-1/2 p-2 text-red-400 hover:text-red-600 transition-colors
                md:-right-10 md:p-2.5"
                        title="Удалить заказ"
                    >
                        <svg
                            className="w-5 h-5 md:w-6 md:h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                    </button>
                )}
            </div>
    );
};

export default observer(OrderItem);