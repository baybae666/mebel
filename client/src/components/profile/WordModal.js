import React from 'react';

const WordModal = ({onClose}) => {
    return (
        <div className="space-y-4 p-4 m-4 md:p-0">
            <p className="text-gray-700 leading-relaxed md:text-lg text-center">
                Если вы забыли проверочное слово, свяжитесь с нами по номеру{" "}
                <a
                    href="tel:79123456789"
                    className="text-blue-600 hover:text-blue-700 underline
                transition-colors focus:outline-none focus:ring-2
                focus:ring-blue-500 rounded-md px-1"
                >
                    7 (912) 345-67-89
                </a>
            </p>

            <button
                onClick={onClose}
                className="w-full bg-[#054C73] hover:bg-[#033952] text-white
             py-3 px-6 rounded-xl font-medium transition-all
             text-base md:text-lg
             hover:shadow-md focus:ring-2 focus:ring-[#033952]
             focus:ring-offset-2"
            >
                ОК
            </button>
        </div>
    );
};

export default WordModal;