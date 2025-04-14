import React, {useContext, useState} from 'react';
import FacadeList from "../components/facade/FacadeList";
import { observer } from "mobx-react-lite";
import CatalogSearch from "../components/catalog/CatalogSearch";
import Facades from "../components/facade/Facades";
import FilterPanel from "../components/catalog/FilterPanel";
import {Context} from "../index";

const Catalog = () => {
    const {facadeStore} = useContext(Context);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedSorting, setSelectedSorting] = useState("Сортировка");

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const filteredFacades = facadeStore.filterFacades();

    const handleSortingChange = (sortType) => {
        setSelectedSorting(sortType);
        setIsDropdownOpen(false);

            if (sortType === "Сначала дешевые") {
                facadeStore.setSorting('byPrice', 'asc')
            }
            if (sortType === "Сначала дорогие") {
                facadeStore.setSorting('byPrice', 'desc')
            }
            if (sortType === "По алфавиту: А-Я") {
                facadeStore.setSorting('byName', 'asc')
            }
            if (sortType === "По алфавиту: Я-А") {
                facadeStore.setSorting('byName', 'desc')
            }

    };

    return (
        <div className="w-4/5 min-h-screen mx-auto pb-24">
            <CatalogSearch/>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#054C73]
                mb-8 sm:mb-20 text-center sm:text-left">
                Каталог товаров
            </h1>
            <Facades/>

            <div  className='w-5/6 flex sm:justify-around justify-center h-[50px] mt-12 mb-7 ms-auto'>
                <span className='hidden sm:block font-semibold text-base sm:text-lg'>
      {filteredFacades.length || facadeStore._facdeList.length} товаров
    </span>
                <div className="relative w-full sm:w-60">
                    <div onClick={handleDropdownToggle}
                         className='w-full h-full bg-white opacity-85 flex justify-between items-center rounded-3xl px-4 cursor-pointer'>
                        <span>{selectedSorting}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="feather feather-chevron-down">
                            <path d="M6 9l6 6 6-6"></path>
                        </svg>
                    </div>

                    {isDropdownOpen && (
                        <div className="absolute top-[50px] left-0 w-full bg-white shadow-lg rounded-lg z-10">
                            <ul>
                                <li onClick={() => handleSortingChange("Сначала дешевые")}
                                    className="p-2 cursor-pointer hover:bg-gray-200">Сначала дешевые
                                </li>
                                <li onClick={() => handleSortingChange("Сначала дорогие")}
                                    className="p-2 cursor-pointer hover:bg-gray-200">Сначала дорогие
                                </li>
                                <li onClick={() => handleSortingChange("По алфавиту: А-Я")}
                                    className="p-2 cursor-pointer hover:bg-gray-200">По алфавиту: А-Я
                                </li>
                                <li onClick={() => handleSortingChange("По алфавиту: Я-А")}
                                    className="p-2 cursor-pointer hover:bg-gray-200">По алфавиту: Я-А
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full flex flex-col lg:flex-row gap-4 lg:gap-6">
                <FilterPanel/>
                <div className='w-full flex-grow'>
                <FacadeList/>
                </div>
            </div>

        </div>


    );
};

export default observer(Catalog);
