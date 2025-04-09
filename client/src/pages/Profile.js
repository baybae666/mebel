import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {ORDERLISTROUTER, PROFILEROUTER} from "../utils/consts";
import PersonalData from "../components/PersonalData";
import OrderList from "./OrderList";
import OrdersIcon from "../components/OrdersIcon";
import UserIcon from "../components/UserIcon";
import {observer} from "mobx-react-lite";

const Profile = () => {
    const {section} = useParams()
    const [currentTab, setCurrentTab] = useState(true)
    const navigation = useNavigate()
    const checkTab = () => section === 'orders' ? setCurrentTab(false) : setCurrentTab(true)

    useEffect(() => {
        checkTab()
    }, [section]);

    return (
        <div className="min-h-[70vh] w-4/5 m-auto">
            <h1 className='text-4xl md:text-5xl font-bold text-[#054C73] mb-6 text-center lg:text-left mt-5'>Личный кабинет</h1>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-64 lg:w-72 space-y-2">
                        <div
                            onClick={() => {
                                navigation(PROFILEROUTER + '/lk')
                            }}
                            className={`p-4 rounded-xl cursor-pointer transition-all flex items-center ${
                                currentTab
                                    ? 'bg-white shadow-md border-2 border-[#054C73] text-[#054C73]'
                                    : 'bg-white hover:bg-gray-50 border border-gray-200'
                            }`}
                        >
                            <UserIcon className='w-5 h-5 me-2'/>
                            <span className="font-medium">Личные данные</span>
                        </div>
                        <div
                            onClick={() => navigation(PROFILEROUTER + '/orders')}
                            className={`p-4 rounded-xl cursor-pointer transition-all flex items-center ${
                                !currentTab
                                    ? 'bg-white shadow-md border-2 border-[#054C73] text-[#054C73]'
                                    : 'bg-white hover:bg-gray-50 border border-gray-200'
                            }`}
                        >
                            <OrdersIcon className='w-5 h-5 me-2'/>
                            <span className="font-medium">Мои заказы</span>
                        </div>
                    </div>

                    <div className="flex-1 bg-white rounded-xl shadow-sm p-6 md:p-8">
                        {currentTab ? <PersonalData/> : <OrderList/>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(Profile);