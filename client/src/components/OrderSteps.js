import React from "react";

const OrderSteps = ({ orderLevelsData }) => {
    return (
        <section className="text-center mt-12 pb-12 px-4">
            <h2 className="text-2xl sm:text-3xl md:text-[32px] font-bold text-[#054C73] mb-4">
                Этапы выполнения заказа
            </h2>
            <p className="text-base sm:text-lg text-[#666666] mb-8">
                заказ выполняется в три основных действия
            </p>
            <div className="grid w-4/5 mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 justify-items-center">
                {orderLevelsData.map((level) => (
                    <div
                        key={level.id}
                        className="relative w-[250px] sm:w-[300px] lg:w-[350px] flex flex-col items-center"
                    >
                        <div
                            className="w-full relative flex justify-center h-[300px] sm:h-[396px] rounded-[20px] sm:rounded-[40px] bg-cover bg-center shadow-lg"
                            style={{backgroundImage: `url("${level.image}")`}}
                        >
                            <div
                                className="absolute -bottom-[35px] sm:-bottom-[45px] w-[70px] sm:w-[90px] h-[70px] sm:h-[90px] rounded-full bg-[#EEEEEE] flex items-center justify-center">
                                <div
                                    className="w-2/3 h-2/3 bg-[#111] rounded-full font-bold flex justify-center items-center text-xl sm:text-2xl text-white">
                                    {level.id}
                                </div>
                            </div>
                        </div>
                        <h3 className="text-lg sm:text-[24px] font-bold text-[#054C73] mt-11">{level.title}</h3>
                        <p className="text-sm sm:text-[18px] font-normal text-[#666666] mt-2">{level.text}</p>
                    </div>
                ))}
            </div>

        </section>
    );
};


export default OrderSteps;
