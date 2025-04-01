import React from "react";

const Examples = ({ facadesData }) => {
    return (
        <section className="text-center my-12 px-4">
            <h2 className="text-2xl sm:text-3xl md:text-[32px] font-bold text-[#054C73] mb-4">
                Примеры фасадов
            </h2>
            <p className="text-base sm:text-lg text-[#666666] mb-8">
                произведенных по индивидуальному шаблону
            </p>
            <div className="grid mx-auto w-4/5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 justify-items-center">
                {facadesData.map((facade) => (
                    <div
                        key={facade.id}
                        className="relative w-[200px] sm:w-[300px] lg:w-[400px] h-[400px] sm:h-[476px]"
                    >
                        <div
                            className="w-full h-[90%] rounded-[20px] sm:rounded-[40px] bg-cover bg-center shadow-lg"
                            style={{ backgroundImage: `url("${facade.image}")` }}
                        ></div>
                        <div
                            className="absolute top-2/3 left-0 w-full h-[60px] bg-[rgba(238,238,238,0.6)] backdrop-blur-[2px] flex items-center justify-center"
                        >
                            <span className="text-[16px] sm:text-[20px] font-medium text-[#0C0C0C] drop-shadow-md">
                                {facade.title}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Examples;
