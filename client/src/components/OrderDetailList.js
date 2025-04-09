import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Context} from "../index";
import {NavLink} from "react-router-dom";
import OrderDetailItem from "./OrderDetailItem";
import {observer} from "mobx-react-lite";

const OrderDetailList = ({order}) => {
    const {orderDetailStore} = useContext(Context)
    const [orderDetails, setOrderDetails] = useState([])


    const getOrderDetails = async () => {
        await orderDetailStore.getOrderDetailWithFacade(order.OrderID).then(res => setOrderDetails(res))
    }

    useEffect(() => {
        getOrderDetails()
    }, [order.OrderID, orderDetailStore.orderDetail.OrderDetailID]);

    return (
        <div className="space-y-4">
            {orderDetails.length > 0 &&
                orderDetails.map((item) => (
                    <OrderDetailItem key={item.OrderDetailID} orderDetail={item}/>
                ))}
        </div>
    );
};

export default observer(OrderDetailList);