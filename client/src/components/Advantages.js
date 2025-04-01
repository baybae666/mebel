import React from "react";
import CarIcon from "../assets/car.svg";
import HeartIcon from "../assets/heart.svg";
import ShieldIcon from "../assets/shit.svg";

const Advantages = () => {
    const advantages = [
        { icon: CarIcon, title: "Короткие сроки", text: "изготовления и доставки" },
        { icon: HeartIcon, title: "Индивидуальный подход", text: "к каждому клиенту" },
        { icon: ShieldIcon, title: "100% Гарантия", text: "на всю мебель 18 месяцев" },
    ];

    return (
        <div className="w-full bg-white/75 shadow-md flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-10 py-6 px-4">
            {advantages.map((adv, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="w-[66px] h-[66px] flex items-center justify-center border-4 border-black rounded-full">
                        <img src={adv.icon} alt={adv.title} className="w-[40px] h-[40px]" />
                    </div>
                    <div className="text-center sm:text-left">
                        <p className="font-semibold text-base sm:text-lg text-gray-800">{adv.title}</p>
                        <p className="font-normal text-sm text-gray-600">{adv.text}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};


export default Advantages;
