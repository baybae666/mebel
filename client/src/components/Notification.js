import React, { useState, useEffect } from "react";

const Notification = ({ message, duration = 3000, offShow }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true); // Показываем уведомление
        const timer = setTimeout(() => {
            offShow()
            setIsVisible(false)
        }, duration); // Скрываем через duration

        return () => clearTimeout(timer); // Очищаем таймер при размонтировании
    }, [duration]);

    return (
        <div
            className={`fixed top-5 right-5 z-50 transition-transform duration-500 ease-in-out transform ${
                isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            } bg-[#054C73] text-white font-medium py-2 px-4 rounded shadow-md`}
        >
            {message}
        </div>
    );
};

export default Notification;
