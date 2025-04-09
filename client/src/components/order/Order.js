import React, {useContext, useState} from 'react';
import OrderDetailList from "./OrderDetailList";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import MailIcon from "../icons/MailIcon";
import PhoneIcon from "../icons/PhoneIcon";
import UserIcon from "../icons/UserIcon";
import CancelIcon from "../icons/CancelIcon";

const Order = ({order}) => {
    const {orderStore, userStore} = useContext(Context)
    const updateStatus = async () => {
        await orderStore.updateStatus(order.OrderID, 'Не оформлен')
    }
    return (
        <div className="bg-white  p-6 md:p-8 mx-auto max-w-4xl ">
            {/* Шапка заказа */}
            <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-[#054C73]">Заказ №{order.OrderID}</h2>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600">
                    {new Date(order.OrderDate).toLocaleDateString()}
                </span>
                    </div>
                </div>

                {order.OrderStatus === 'Оформлен' && (
                    <div
                        className="bg-teal-100 text-teal-800 px-4 py-2 rounded-full font-medium flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"/>
                        </svg>
                        {order.OrderStatus}
                    </div>
                )}
            </div>

            {/* Основной контент */}
            <div className="grid gap-8 xl:grid-cols-[1fr_250px]">
                {/* Список товаров */}
                <OrderDetailList order={order}/>

                {/* Блок с информацией о получателе */}
                <div className="bg-[#eee] p-6 rounded-xl border border-[#eee]">
                    <h3 className="font-bold text-lg text-[#054C73] mb-4">Данные получателя</h3>
                    <div className="space-y-3.5 text-black">
                        <div className="flex items-center gap-2">
                            <UserIcon className="w-5 h-5 text-[#054C73]"/>
                            <span>{userStore.user.fullname}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <PhoneIcon className="w-5 h-5 text-[#054C73]"/>
                            <span>{userStore.user.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MailIcon className="w-5 h-5 text-blue-500"/>
                            <span>{userStore.user.email}</span>
                        </div>
                        <div className="pt-4 mt-4 border-t text-[#054C73]">
                            <div className="flex flex-col justify-between items-center">
                                <span className="font-bold">Итого:</span>
                                <span className="text-2xl font-bold text-black">
                            {order.TotalPrice.toLocaleString()} руб.
                        </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Кнопка действия */}
            <div className="mt-8 flex justify-end">
                {order.OrderStatus === 'Не оформлен' ?
                    <button
                        onClick={() => orderStore.openOrderConfirm()}
                        className="px-6 py-3 bg-[#054C73] hover:bg-[#033952] text-white rounded-xl font-medium transition-all flex items-center gap-2 hover:shadow-md"
                    >
                        <ArrowRightIcon className="w-5 h-5"/>
                        Оформить заказ
                    </button> : userStore.user.isAdmin ?
                        <button
                            onClick={updateStatus}
                            className="px-6 py-3 bg-[#054C73] hover:bg-[#033952] text-white rounded-xl font-medium transition-all flex items-center gap-2 hover:shadow-md"
                        >
                            <CancelIcon className="w-5 h-5" />
                            Отменить оформление
                        </button> :

                        <a href='tel:89111111111'
                           className="px-6 py-3 bg-[#054C73] hover:bg-[#033952] text-white rounded-xl font-medium transition-all flex items-center gap-2 hover:shadow-md"
                        >
                            <PhoneIcon className="w-5 h-5"/>
                            Связаться с нами
                        </a>
                }
            </div>

        </div>
    );
};

export default observer(Order);