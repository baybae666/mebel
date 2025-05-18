import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import {useParams} from "react-router-dom";
import ProductHeader from "../components/product/ProductHeader";
import {observer} from "mobx-react-lite";
import Descriptioon from "../components/product/Descriptioon";
import Parameters from "../components/product/Parameters";

const Product = () => {
    const {facadeStore} = useContext(Context);
    const {FacadeID} = useParams()

    const getFacade = async () => {
        await facadeStore.getById(FacadeID);
    }

    useEffect(() => {
        getFacade();
    }, [FacadeID]);

    return (
        <div className='w-screen home p-4'>
            {facadeStore._facadeItem.FacadeID && <ProductHeader facade={facadeStore._facadeItem}/>}
            {facadeStore._facadeItem.FacadeID && <Descriptioon facade={facadeStore._facadeItem}/>}
            {facadeStore._facadeItem.FacadeID && <Parameters facade={facadeStore._facadeItem}/>}

            <p className='font-normal text-xl text-black tracking-wider block w-[70%] my-20 opacity-60 me-auto ms-auto text-justify'>
                Обратите внимание! Вся информация о товарах, размещенная на сайте, не является публичной офертой,
                определяемой положениями Части 2
                Статьи 437 Гражданского кодекса РФ. Производители товаров вправе вносить изменения в технические
                характеристики, внешний вид и комплектацию
                товаров без предварительного уведомления. При оформлении заказа уточняйте актуальные характеристики
                товара у наших менеджеров.
            </p>
        </div>
    );
};

export default observer(Product);