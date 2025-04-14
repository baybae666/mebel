import React, { useContext, useState } from "react";
import PremiumImage from "../../assets/premium.png";
import OptimaImage from "../../assets/optima.png";
import ElegantImage from "../../assets/elegant.png";
import StandartImage from "../../assets/standart.png";
import KantryImage from "../../assets/kantryF.png";
import ModernImage from "../../assets/modern.png";
import VolnaImage from "../../assets/wave.png";
import { Context } from "../../index";

const Facades = () => {
    const { facadeStore } = useContext(Context);

    const handleBatchFilterChange = (batch) => {
        facadeStore.setFilters("batch", batch);
    };

    const [facades, setFacades] = useState([
        { name: "Все фасады", type: "all" }, // Добавляем блок "Все фасады" в начало списка
        { name: "Премиум", image: PremiumImage },
        { name: "Оптима", image: OptimaImage },
        { name: "Элегант", image: ElegantImage },
        { name: "Стандарт", image: StandartImage },
        { name: "Кантри", image: KantryImage },
        { name: "Модерн", image: ModernImage },
        { name: "Волна", image: VolnaImage },
    ]);

    return (
        <div className="w-full mx-auto my-8">
            {/* Сетка фасадов с Flexbox */}
            <div className="flex flex-wrap justify-center lg:justify-center gap-4">
                {facades.map((facade, index) => (
                    <div
                        key={index}
                        className={`bg-white rounded-lg flex flex-col items-center p-2 shadow cursor-pointer hover:shadow-md transition-shadow w-[150px] md:w-[170px] ${
                            facade.type === "all" ? "h-32 self-center" : "w-[100px]"
                        }`}
                        onClick={() => {
                            handleBatchFilterChange(facade.name === "Все фасады" ? "" : facade.name);
                            facadeStore.filterFacades();
                        }}
                    >
                        {facade.type === "all" ? (
                            <>
                <span className="font-medium text-sm tracking-wide text-[#070707]">
                  Все фасады
                </span>
                                <div className="w-1/2 h-1/2 grid grid-cols-2 gap-1 mt-2">
                                    <div className="border-2 border-[#054C73] rounded-lg"></div>
                                    <div className="border-2 border-[#054C73] rounded-lg"></div>
                                    <div className="border-2 border-[#054C73] rounded-lg"></div>
                                    <div className="border-2 border-[#054C73] rounded-lg"></div>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 className="font-medium text-sm mb-2 text-[#070707]">
                                    {facade.name}
                                </h2>
                                <div
                                    className="w-full aspect-[3/4] rounded-md bg-no-repeat bg-cover bg-center"
                                    style={{ backgroundImage: `url("${facade.image}")` }}
                                ></div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Facades;
