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
        <div>
            {/* Кнопка отображается только на маленьких экранах */}
            <button
                className="block sm:hidden bg-[#054C73] text-white p-2 px-5 rounded-full m-auto"
                onClick={() => setShowFilters(!showFilters)}
            >
                {showFilters ? "Скрыть фильтры" : "Показать фильтры"}
            </button>

            {/* Контейнер для центрирования на больших экранах */}
            <div
                className={`${
                    showFilters ? "block" : "hidden"
                } sm:flex sm:items-center md:justify-center sm:justify-center sm:h-screen`}
            >
                {/* Сам блок с фильтрами */}
                <div className="w-4/5 relative z-20 m-auto sm:ms-32 lg:ms-60  sm:w-[300px] h-auto bg-transparent p-4">
                    {/* Фильтр по толщине */}
                    <div className="mb-10">
                        <h3 className="font-montserrat font-medium text-[20px] text-center sm:text-left text-[#070707]">
                            Толщина МДФ
                        </h3>
                        <div className="mt-4 flex justify-center flex-col items-center sm:block">
                            {["10", "16", "19"].map((item, index) => (
                                <label key={index} className="flex items-center mb-3 cursor-pointer">
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
                    <div className="mb-10">
                        <h3 className="font-montserrat font-medium text-[20px] text-center sm:text-left text-[#070707]">
                            Обработка под лак
                        </h3>
                        <div className="mt-4 flex justify-center flex-col items-center sm:block">
                            {["Да", "Нет"].map((item, index) => (
                                <label key={index} className="flex items-center mb-3 cursor-pointer">
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
                        <h3 className="font-montserrat text-center sm:text-left font-medium text-[20px] text-[#070707]">
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
