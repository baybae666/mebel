import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const ProductHeader = ({ facade }) => {
    const [count, setCount] = useState(1);
    const [cartProducts, setCartProducts] = useState([])
    const { cartStore } = useContext(Context);

    const [cartItem, setCartItem] = useState(cartStore.cart.find(item => item.FacadeID === facade.FacadeID));
    const handleAddToCart = () => {
        if (count > 0) {
            cartStore.addToCart(facade.FacadeID, count).then(res => setCartItem(cartStore.cart.find(item => item.FacadeID === facade.FacadeID)))
        }
    };

    useEffect(() => {
        cartStore.fetchCart().then(res => {
            setCartProducts(res.map(product => product.FacadeID))
        })
    }, []);

    return (
        <div className='w-full sm:w-[70%] lg:w-[70%] h-auto flex flex-col sm:flex-row justify-between sm:gap-8 mx-auto mt-20'>
            <div className='w-full sm:w-[47%] lg:w-[47%] h-full border rounded-[20px] flex justify-center items-center bg-white shadow-lg py-5'>
                <img className='w-full sm:w-[303px] h-auto sm:h-4/5'
                     src={process.env.REACT_APP_API_URL + facade.PhotoURL} alt={facade.Name} />
            </div>

            <div className='w-full sm:w-[47%] lg:w-[47%] h-full flex flex-col justify-start items-center mt-5 sm:mt-0'>
                <h1 className='text-3xl self-start sm:text-4xl lg:text-[42px] font-bold text-[#054C73] mb-5 text-left'>
                    {facade.FacadeName}
                </h1>

                <div className='w-full h-1/4 flex flex-wrap items-center justify-around mb-10'>
                    <div className='w-1/2 h-1/2 flex flex-col justify-center'>
                        <span className='font-normal text-xl text-black tracking-[5%]'>Цена за шт.</span>
                        <span className='font-medium text-xl text-black tracking-[5%]'>
                            <span className='font-semibold text-3xl text-black tracking-[5%]'>{facade.Price}</span> руб.
                        </span>
                    </div>

                    <div className='w-1/2 h-1/2 flex justify-end items-center'>
                        <button className='cursor-pointer text-[#054C73] font-medium text-3xl me-2'
                                onClick={() => count > 1 && setCount(count - 1)}>-</button>
                        <div className='w-[60px] h-[38px] mx-5 rounded-[40px] bg-[#939497] flex items-center justify-center font-medium text-white text-sm'>
                            {count}
                        </div>
                        <button className='text-[#054C73] cursor-pointer font-medium text-3xl ms-2'
                                onClick={() => setCount(count + 1)}>+</button>
                    </div>

                    <button
                        className='w-full h-[40px] min-w-[145px] mt-2 bg-[#054C73] border-none rounded-[40px] text-white font-medium text-base flex justify-center items-center'
                        onClick={handleAddToCart}>
                        {cartItem ? 'Товар добавлен в корзину' : 'В корзину'}
                    </button>
                </div>

                <div className='w-full'>
                    <p className='text-black font-normal text-xl tracking-wide mb-7'>Краткие характеристики:</p>
                    <p className='text-black font-normal text-xl tracking-wide mb-4'>Материал:
                        ........................................ {facade.Material}</p>
                    <p className='text-black font-normal text-xl tracking-wide mb-4'>Серия:
                        ................................................ {facade.Batch}</p>
                    <p className='text-black font-normal text-xl tracking-wide mb-4'>Гарантия (месяц):
                        .......................................... {facade.Guarantee}</p>
                </div>
            </div>
        </div>
    );
};

export default observer(ProductHeader);
