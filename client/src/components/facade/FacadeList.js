import React, {useContext, useEffect, useMemo, useState} from 'react';
import { Context } from "../../index";
import FacadeItem from "./FacadeItem";
import { observer } from "mobx-react-lite";

const FacadeList = () => {
    const { facadeStore, cartStore } = useContext(Context);
    const [cartProducts, setCartProducts] = useState(null)
    const [facades, setFacades] = useState(null)

    useEffect(() => {
        facadeStore.setCurrentPage(1);
    }, [facadeStore._filters, facadeStore._sorting]);

    const filteredFacades = facadeStore.filterFacades();

    const totalFilteredCount = facadeStore.getFilteredFacadesCount();

    const totalPages = Math.ceil(totalFilteredCount / facadeStore.itemsPerPage);

    const handlePageChange = (page) => {
        facadeStore.setCurrentPage(page);
    };

    useEffect(() => {
        facadeStore.getAll().then(res => setFacades(res))
    }, [cartStore.cart]);

    useEffect(() => {
        window.scrollTo({
            top: 200,
            behavior: 'smooth'
        })
    }, [facadeStore.currentPage]);

    return (
        <div className="w-full mx-auto p-4 sm:p-0 bg-[#eee] rounded-xl">
            <div className="grid grid-cols-1 m-auto md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredFacades.map((facade) => (
                    <FacadeItem key={facade.id} facade={facade}/>
                ))}
            </div>


            {totalPages > 1 && (
                <div className="flex justify-center mt-5">
                    {Array.from({length: totalPages}, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-4 py-2 mx-3 rounded-full text-white ${
                                facadeStore.currentPage === index + 1
                                    ? 'bg-blue-500'
                                    : 'bg-[#939497] hover:bg-gray-300 hover:text-black transition-colors duration-200'
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default observer(FacadeList);
