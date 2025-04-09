import React from "react";
import { NavLink } from "react-router-dom";
import { CATALOGROUTER } from "../../utils/consts";

const HeroSection = () => {
    return (
        <div className="home_header flex  md:flex-row md:items-start text-center md:text-left px-4">
            <div className="w-full mx-auto my-auto  md:w-[929px] md:ms-auto md:me-[10%] h-auto max-h-[543px] bg-gray-200/75 shadow-lg rounded-2xl p-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#054C73] mb-4">
                    ТехноФасад
                </h1>
                <p className="text-base sm:text-lg md:text-xl font-medium text-gray-800 leading-6 sm:leading-8 mb-6 md:mb-8">
                    Предоставляем широкий выбор фасадов для кухни, шкафов и других элементов интерьера.
                    Наша продукция сочетает в себе стильный дизайн, надежность и доступные цены. Вы можете
                    выбрать готовые решения или заказать фасады по индивидуальным размерам и предпочтениям.
                    <br />
                    <br />
                    Стильная и качественная мебель для комфортной жизни!
                </p>
                <NavLink to={CATALOGROUTER}>
                    <button className="w-full sm:w-[226px] h-[70px] bg-[#054C73] text-white font-bold text-lg rounded-full">
                        КАТАЛОГ
                    </button>
                </NavLink>
            </div>
        </div>
    );
};


export default HeroSection;
