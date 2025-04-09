import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Context} from "../index";
import Order from "../components/Order";
import {observer} from "mobx-react-lite";
import OrderItem from "../components/OrderItem";
import OrderMoadal from "../components/OrderMoadal";

const OrderList = () => {
    const {orderStore, userStore, orderDetailStore} = useContext(Context)
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const [orders, setOrders] = useState([])
    const [isStatusUpdate, setIsStatusUpdate] = useState(false)

    const onStatusUpdate = () => setIsStatusUpdate(true)
    const getOrders = async () => {
        await orderStore.getOrderByUserId(userStore.user.id).then(res => setOrders(res))
    }

    const toggleOrder = (orderId) => {
        setExpandedOrderId(prev => prev === orderId ? null : orderId);
    };

    const dynamicOrders = useMemo(() => {
        return orders.sort((a, b) => b.OrderID - a.OrderID)
    }, [orders])

    useEffect(() => {
        getOrders()
    }, [orderStore.order.OrderStatus, orderStore.order]);

    if (userStore.isLoading && orders.length === 0) {
        return (
            <div className="max-w-2xl mx-auto p-4 md:p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            <div className="h-10 bg-gray-200 rounded-xl"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else if (orders.length === 0) {
        return (
            <div className="max-w-2xl mx-auto p-5 flex justify-center items-center">
                <p>У вас еще нет заказов</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className='text-4xl md:text-5xl font-bold text-[#054C73] mb-6 text-center lg:text-left'>Заказы</h1>
            {orders.length > 0 && dynamicOrders.map(order => (
                <div
                    key={order.OrderID}
                    className="mb-4 overflow-hidden rounded-lg bg-white shadow-sm transition-all"
                >
                    <div
                        className="cursor-pointer p-4 hover:bg-gray-50"
                        onClick={() => toggleOrder(order.OrderID)}
                    >
                        <OrderItem order={order} id={order.OrderID}/>

                        <div className="mt-2 flex justify-end">
                            <svg
                                className={`w-5 h-5 text-gray-400 transition-transform ${
                                    expandedOrderId === order.OrderID ? 'rotate-180' : ''
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </div>
                    </div>

                    <div
                        className={`grid transition-all duration-300 ease-in-out transform ${
                            expandedOrderId === order.OrderID
                                ? 'grid-rows-[1fr] opacity-100 translate-y-0'
                                : 'grid-rows-[0fr] opacity-0 -translate-y-2'
                        }`}
                    >
                        <div className="overflow-hidden border-t">
                            <Order order={order} onStatusUpdate={onStatusUpdate}/>
                        </div>
                    </div>
                </div>
            ))}
            {orderStore.orderConfirm && <OrderMoadal onClose={orderStore.closeOrderConfirm} id={expandedOrderId}/>}
        </div>
    );
};

export default observer(OrderList);