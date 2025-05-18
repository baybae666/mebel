import React, {useContext, useState} from 'react';
import Order from "../components/order/Order";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import OrderMoadal from "../components/order/OrderMoadal";
import {useNavigate} from "react-router-dom";
import {PROFILEROUTER} from "../utils/consts";

const OrderConfirm = () => {
    const {orderStore} = useContext(Context)
    const navigate = useNavigate()
    // const checkOrder = () => orderStore.order.OrderID ? navigate(PROFILEROUTER + '/orders)' : ''
     useEffect(() => {
    // Сбросить выбранного пользователя при загрузке страницы
        userStore.onpPickUserId(null);
    }, []);


    return (
        <div className='flex min-h-[70vh] h-fit flex-col w-4/5 m-auto justify-center-center py-8'>
            <h1 className='text-4xl md:text-5xl font-bold text-[#054C73] mb-6 text-center lg:text-left'>Оформление заказа</h1>
            {orderStore.order.OrderID && <Order order={orderStore.order}/>}
            {orderStore.orderConfirm && <OrderMoadal onClose={orderStore.closeOrderConfirm} id={orderStore.order.OrderID}/>}
        </div>
    );
};

export default observer(OrderConfirm);
