import React, { useContext, useState } from "react";
import CheckboxUI from "./CheckboxUI";
import { Context } from "../../index";

const FilterPanel = () => {
    const { facadeStore } = useContext(Context);
    const [maxPrice, setMaxPrice] = useState(facadeStore._filters.priceRange[1]);
    const [minPrice, setMinPrice] = useState(facadeStore._filters.priceRange[0]);
    const [showFilters, setShowFilters] = useState(false);

    const handleThicknessFilterChange = (thickness) => {
        if (facadeStore._filters.thickness === thickness) {
            facadeStore.setFilters("thickness", "");
        } else {
            facadeStore.setFilters("thickness", thickness);
        }
    };

    const handlePatinaFilterChange = (patina) => {
        if (facadeStore._filters.patina === patina) {
            facadeStore.setFilters("patina", "");
        } else {
            facadeStore.setFilters("patina", patina);
        }
    };

    const handlePriceRangeChange = (min, max) => {
        facadeStore.setFilters("priceRange", [min, max]);
    };

    return (
        <div className="lg:w-72 xl:w-80 flex-shrink-0">
            {/* Кнопка отображается только на маленьких экранах */}
            <button
                className="lg:hidden w-full mb-4 bg-[#054C73] text-white
                    py-2 rounded-full"
                onClick={() => setShowFilters(!showFilters)}
            >
                {showFilters ? "Скрыть фильтры" : "Показать фильтры"}
            </button>

            {/* Контейнер для центрирования на больших экранах */}
            <div
                className={`${showFilters ? 'block' : 'hidden'} lg:block 
                bg-white p-6 rounded-xl shadow-sm`}
            >
                {/* Сам блок с фильтрами */}
                <div className="space-y-6">
                    <div className="space-y-3">
                        <h3 className="text-lg font-medium font-montserrat">
                            Толщина МДФ
                        </h3>
                        <div className="space-y-2">
                            {["10", "16", "19"].map((item, index) => (
                                <label key={index} className="flex items-center gap-3">
                                    <CheckboxUI
                                        labelValue={item + "мм"}
                                        isChecked={facadeStore._filters.thickness === item}
                                        onChange={() => handleThicknessFilterChange(item)}
                                    />
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Фильтр по патине */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-montserrat font-medium">
                            Обработка под лак
                        </h3>
                        <div className="space-y-2">
                            {["Да", "Нет"].map((item, index) => (
                                <label key={index} className="flex items-center gap-3">
                                    <CheckboxUI
                                        labelValue={item}
                                        isChecked={facadeStore._filters.patina === item}
                                        onChange={() => handlePatinaFilterChange(item)}
                                    />
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Фильтр по цене */}
                    <div className="mb-10">
                        <h3 className="font-montserrat sm:text-left text-lg font-medium text-[20px] text-[#070707]">
                            Цена
                        </h3>
                        <div className="mt-4 flex justify-between gap-2">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    className="w-full sm:w-[90px] border-b bg-transparent border-[#054C73] text-sm px-2 py-1 outline-none"
                                    placeholder="от 1000"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                />
                            </div>
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="до 99999"
                                    className="w-full sm:w-[90px] border-b bg-transparent border-[#054C73] text-sm px-2 py-1 outline-none"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Кнопка "Найти" */}
                    <div className="flex justify-center w-full">
                        <button
                            className="bg-[#054C73] w-full text-white rounded-full px-6 py-2 text-[20px] font-montserrat"
                            onClick={() => {
                                handlePriceRangeChange(minPrice || 0, maxPrice || 9999);
                                facadeStore.filterFacades();
                            }}
                        >
                            Найти
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;
