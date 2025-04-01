import React, { useState, useContext } from 'react';
import { Context } from "../index";

const CatalogSearch = () => {
    const [search, setSearch] = useState('');
    const { facadeStore } = useContext(Context);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearch(query);
        facadeStore.setSearchQuery(query);
        facadeStore.setCurrentPage(1);
    };

    return (
        <div className="catalog-search w-[90%] sm:w-1/2 mx-auto my-6 flex items-center relative">
            <input
                type="search"
                value={search}
                onChange={handleSearch}
                placeholder="Введите название фасада..."
                className="w-[75%] sm:w-[80%] border ps-3 font-normal text-base border-[#939497] rounded-l-[40px] outline-none h-[40px]"
            />
            <button className="w-[25%] sm:w-[20%] bg-gray-400 text-white rounded-r-[40px] text-center h-[40px]">
                Поиск
            </button>
        </div>

    );
};

export default CatalogSearch;
