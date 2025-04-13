import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {ORDERLISTROUTER, PROFILEROUTER} from "../utils/consts";
import PersonalData from "../components/profile/PersonalData";
import OrderList from "../components/order/OrderList";
import OrdersIcon from "../components/order/OrdersIcon";
import UserIcon from "../components/icons/UserIcon";
import {observer} from "mobx-react-lite";
import UserList from "../components/profile/UserList";
import {Context} from "../index";
import UsersListIcon from "../components/icons/UsersListIcon";
import FacadeSection from "../components/profile/FacadeSection";
import ProductIcon from "../components/icons/ProductIcon";

const Profile = () => {
    const {userStore} = useContext(Context)
    const {section} = useParams()
    const [currentTab, setCurrentTab] = useState('lk')
    const navigation = useNavigate()


    const checkTab = () => {
        if (section === 'lk') {
            setCurrentTab('lk')
        }
        if (section === 'orders') {
            setCurrentTab('orders')
        }
        if (section === 'users') {
            setCurrentTab('users')
        }
        if (section === 'products') {
            setCurrentTab('products')
        }
    }

    useEffect(() => {
        checkTab()
    }, [section]);

    return (
        <div className="min-h-[70vh] w-screen sm:w-4/5 m-auto">
            <h1 className='text-4xl md:text-5xl font-bold text-[#054C73] mb-6 text-center lg:text-left mt-5'>Личный кабинет</h1>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className={`flex flex-col md:flex-row gap-8 ${currentTab === 'products' ? 'flex-col justify-center' : ''}`}>
                    <div className="w-full md:w-64 lg:w-72 space-y-2">
                        <div
                            onClick={() => {
                                navigation(PROFILEROUTER + '/lk')
                            }}
                            className={`p-4 rounded-xl cursor-pointer transition-all flex items-center ${
                                currentTab === 'lk'
                                    ? 'bg-white shadow-md border-2 border-[#054C73] text-[#054C73]'
                                    : 'bg-white hover:bg-gray-50 border border-gray-200'
                            }`}
                        >
                            <UserIcon className='w-5 h-5 me-2'/>
                            <span className="font-medium">Личные данные</span>
                        </div>

                        {userStore.user.isAdmin && <div
                            onClick={() => {
                                navigation(PROFILEROUTER + '/users')
                            }}
                            className={`p-4 rounded-xl cursor-pointer transition-all flex items-center ${
                                currentTab === 'users'
                                    ? 'bg-white shadow-md border-2 border-[#054C73] text-[#054C73]'
                                    : 'bg-white hover:bg-gray-50 border border-gray-200'
                            }`}
                        >
                            <UsersListIcon className="w-5 h-5 me-2" />
                            <span className="font-medium">Пользователи</span>
                        </div>}

                        {userStore.user.isAdmin && <div
                            onClick={() => {
                                navigation(PROFILEROUTER + '/products')
                            }}
                            className={`p-4 rounded-xl cursor-pointer transition-all flex items-center ${
                                currentTab === 'products'
                                    ? 'bg-white shadow-md border-2 border-[#054C73] text-[#054C73]'
                                    : 'bg-white hover:bg-gray-50 border border-gray-200'
                            }`}
                        >
                            <ProductIcon className="w-5 h-5 me-2" />
                            <span className="font-medium">Товары</span>
                        </div>}

                        <div
                            onClick={() => navigation(PROFILEROUTER + '/orders' + '/' + userStore.user.id)}
                            className={`p-4 rounded-xl cursor-pointer transition-all flex items-center ${
                                currentTab === 'orders'
                                    ? 'bg-white shadow-md border-2 border-[#054C73] text-[#054C73]'
                                    : 'bg-white hover:bg-gray-50 border border-gray-200'
                            }`}
                        >
                            <OrdersIcon className='w-5 h-5 me-2'/>
                            <span className="font-medium">Мои заказы</span>
                        </div>
                    </div>

                    <div className="flex-1 bg-white rounded-xl shadow-sm md:p-8">
                        {currentTab === 'lk' ? <PersonalData/> : currentTab === 'orders' ? <OrderList/> : currentTab === 'users' ? <UserList/> : <FacadeSection/>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(Profile);