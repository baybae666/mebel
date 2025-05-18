import React from 'react';

const Descriptioon = ({facade}) => {

    return (
        <div className="w-full sm:w-[70%] lg:w-[70%] mx-auto mt-20">
            <div className='w-full border-b-2 border-[#054C73] flex mb-10'>
                <div className='border-r border-[#054C73] flex justify-center items-center py-5 px-10 mb-2'>
                    <h2 className='font-bold text-xl tracking-wide text-[#054C73]'>Описание</h2>
                </div>
            </div>

            <p className='font-normal text-xl text-black tracking-wide inline-block w-full text-left mt-10 text-justify'>
                {facade.Description}
            </p>
        </div>
    );
};

export default Descriptioon;