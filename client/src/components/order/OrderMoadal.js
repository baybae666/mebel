import React, {useContext} from 'react';
import {Context} from "../../index";
import {PROFILEROUTER} from "../../utils/consts";
import {useNavigate} from "react-router-dom";

const OrderMoadal = ({onClose, id}) => {
    const {orderStore, userStore} = useContext(Context)
    const navigate = useNavigate()
    const updateStatus = async () => {
        await orderStore.updateStatus(id, 'Оформлен').then(res => {
            navigate(PROFILEROUTER + '/orders' + '/' + userStore.user.id);
        })
    }
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div
                className="bg-white rounded-2xl w-full max-w-md relative p-6 mx-4
                           shadow-xl transition-all"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="space-y-6 text-center">
                    <div className="space-y-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                            Заказ оформлен!
                        </h2>
                        <p className="text-gray-600 md:text-lg leading-relaxed">
                            Наш менеджер свяжется с вами для подтверждения деталей заказа
                        </p>
                    </div>

                    {/* Кнопка подтверждения */}
                    <button
                        onClick={() => {
                            onClose();
                            updateStatus();
                        }}
                        className="w-full bg-[#054C73] hover:bg-[#033952] text-white
                                 py-3 px-6 rounded-lg font-medium transition-colors
                                 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Понятно
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderMoadal;