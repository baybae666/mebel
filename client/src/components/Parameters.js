import React from 'react';

const Parameters = ({facade}) => {
    return (
        <div className="w-full sm:w-[70%] lg:w-[70%] mx-auto mt-20 mb-24">
            <div className='w-full border-b-2 border-[#054C73] flex mb-10'>
                <div className='border-r border-[#054C73] flex justify-center items-center py-5 px-10 mb-2'>
                    <h2 className='font-bold text-xl tracking-wide text-[#054C73]'>Характеристики</h2>
                </div>
            </div>

            <div className='font-normal text-xl text-black tracking-wide inline-block text-left w-full mt-10'>
                <p className='mb-3 flex items-center'>Материал <span
                    className='inline-block h-2 border-b border-dotted flex-1 mx-2 border-[#054C73]'></span> {facade.Material}
                </p>
                <p className='mb-3 flex items-center'>Обратная сторона <span
                    className='inline-block h-2 border-b border-dotted flex-1 mx-2 border-[#054C73]'></span> {facade.Backside}
                </p>
                <p className='mb-3 flex items-center'>Покрытие <span
                    className='inline-block h-2 border-b border-dotted flex-1 mx-2 border-[#054C73]'></span> {facade.Cover}
                </p>
                <p className='mb-3 flex items-center'>Патина <span
                    className='inline-block h-2 border-b border-dotted flex-1 mx-2 border-[#054C73]'></span> {facade.Patina}
                </p>
                <p className='mb-3 flex items-center'>Размер <span
                    className='inline-block h-2 border-b border-dotted flex-1 mx-2 border-[#054C73]'></span> Индивидуальный
                </p>
                <p className='mb-3 flex items-center'>Вырез под стекло <span
                    className='inline-block h-2 border-b border-dotted flex-1 mx-2 border-[#054C73]'></span> {facade.SpaceForGlass ? 'Да' : 'Нет'}
                </p>
                <p className='mb-3 flex items-center'>Направление текстуры <span
                    className='inline-block h-2 border-b border-dotted flex-1 mx-2 border-[#054C73]'></span> {facade.Direction}
                </p>
                <p className='mb-3 flex items-center'>Серия <span
                    className='inline-block h-2 border-b border-dotted flex-1 mx-2 border-[#054C73]'></span> {facade.Batch}
                </p>
                <p className='mb-3 flex items-center'>Гарантия (месяц) <span
                    className='inline-block h-2 border-b border-dotted flex-1 mx-2 border-[#054C73]'></span> {facade.Guarantee}
                </p>
            </div>
        </div>
    );
};

export default Parameters;