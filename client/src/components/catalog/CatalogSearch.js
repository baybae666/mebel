import React, {useState, useContext, useEffect} from 'react';
import { Context } from "../../index";
import SearchIcon from "../icons/SearchIcon";
import {observer} from "mobx-react-lite";

const CatalogSearch = () => {
    const [search, setSearch] = useState('');
    const { facadeStore } = useContext(Context);

    const handleSearch = () => {
        facadeStore.setSearchQuery(search);
        facadeStore.setCurrentPage(1);
    };


    useEffect(() => {
        if (!search) {
            handleSearch()
        }
    }, [search]);

    return (
        <div className="w-full max-w-2xl mx-auto my-8 flex gap-2">
            <input
                type="search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full px-4 py-3 rounded-full border border-gray-300
             focus:ring-2 focus:ring-[#054C73] focus:border-transparent
             transition-all placeholder-gray-400"
                placeholder="Поиск фасадов..."
            />
            <button className="px-6 bg-[#054C73] hover:bg-[#033952] text-white
                    rounded-full transition-colors flex items-center gap-2" onClick={handleSearch}>
                <SearchIcon className="w-5 h-5"/>
                <span className="hidden sm:block">Найти</span>
            </button>
        </div>

    );
};

export default observer(CatalogSearch);
