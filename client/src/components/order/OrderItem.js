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
            className="flex flex-col md:flex-row justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow mb-4">
            <div className="flex-1 pr-4">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-black text-xm">Заказ от {new Date(order.OrderDate).toLocaleDateString()}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${order.OrderStatus === 'Оформлен' ? 'bg-teal-100 text-teal-800' : 'bg-red-300 text-white '}`}>
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
                            src={process.env.REACT_APP_API_URL + orderDetail.PhotoURL}
                            className="w-12 h-18 object-cover rounded border border-gray-200"
                        />
                    ))}
                </div>
            </div>
            {userStore.user.isAdmin && <button onClick={e => {
                e.stopPropagation()
                delOrder()
            }} className="text-red-600 hover:text-red-700 text-sm underline">
                Удалить заказ
            </button>}
        </div>
    );
};

export default observer(OrderItem);