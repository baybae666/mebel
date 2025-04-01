import React from 'react';
import MapImage from '../assets/map.png';

const Contact = () => {
    return (
        <div className="flex flex-col w-screen bg-[#eee] home">
            <div className="w-11/12 lg:w-4/5 mx-auto my-10">
                <h1 className="text-4xl md:text-5xl font-bold text-[#054C73] mb-6 text-center lg:text-left">Контакты</h1>
                <div className="text-lg font-normal text-black flex flex-wrap justify-between gap-6" style={{ letterSpacing: '1px' }}>
                    {/* Связаться с нами */}
                    <div className="w-full lg:w-[47%] flex flex-col">
                        <h2 className="text-2xl font-bold text-[#054C73] mb-3 text-center lg:text-left">Связаться с нами</h2>
                        <div className="w-full bg-white border rounded-2xl p-5 shadow-md">
                            <p>Телефон для связи с директором: +7 (908) 639-46-10</p>
                            <p className="mt-2">Телефон отдела продаж: +7 (908) 533-10-56</p>
                            <p className="mt-2">Адрес: г. Екатеринбург, ул. Окружная, 88</p>
                            <p className="mt-2">Электронная почта: tfasad96@mail.ru</p>
                        </div>
                    </div>

                    {/* Реквизиты компании */}
                    <div className="w-full lg:w-[47%] flex flex-col">
                        <h2 className="text-2xl font-bold text-[#054C73] mb-3 text-center lg:text-left">Реквизиты компании</h2>
                        <div className="w-full bg-white border rounded-2xl p-5 shadow-md">
                            <p>“Мебельная фабрика ТехноФасад”, ИП Подоруев В. В.</p>
                            <p className="mt-2">ИНН/КПП: 665701572426</p>
                            <p className="mt-2">ОГРНИП: 309662526700012</p>
                            <p className="mt-2">Фактический адрес: г. Екатеринбург, ул. Окружная, 88</p>
                            <p className="mt-2">Директор: Подоруев Валерий Викторович</p>
                        </div>
                    </div>

                    {/* Время работы */}
                    <div className="w-full lg:w-[47%] flex flex-col">
                        <h2 className="text-2xl font-bold text-[#054C73] mb-3 text-center lg:text-left">Время работы</h2>
                        <div className="w-full bg-white border rounded-2xl p-5 shadow-md">
                            <p>Понедельник - Четверг с 09:00 до 21:00</p>
                            <p className="mt-2">Пятница с 09:00 до 17:00</p>
                            <p className="mt-2">Суббота-Воскресенье - Нерабочие дни</p>
                            <p className="mt-2">Обработка заявок и звонков с 09:00 до 17:00 ежедневно</p>
                        </div>
                    </div>

                    {/* Доставка и самовывоз */}
                    <div className="w-full lg:w-[47%] flex flex-col">
                        <h2 className="text-2xl font-bold text-[#054C73] mb-3 text-center lg:text-left">Доставка и самовывоз</h2>
                        <div className="w-full bg-white border rounded-2xl p-5 shadow-md">
                            <p>Доставка осуществляется от производства до объекта на транспорте компании.</p>
                            <p className="mt-2">Самовывоз. Вы можете забрать заказ с нашего склада самостоятельно.</p>
                        </div>
                    </div>

                    {/* Способы заказа */}
                    <div className="w-full flex flex-col">
                        <h2 className="text-2xl font-bold text-[#054C73] mb-3 text-center lg:text-left">Способы заказа</h2>
                        <div className="w-full bg-white border rounded-2xl p-5 shadow-md">
                            <p>Розничные заказы. Идеально подходят для частных клиентов, желающих обновить интерьер.</p>
                            <p className="mt-2">Оптовые заказы. Специальные условия для компаний, дизайнеров, мебельных производств и торговых точек.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Карта */}
            <div className="w-11/12 lg:w-4/5 mx-auto h-60 lg:h-[45vh] bg-no-repeat bg-cover bg-center border-2 mb-20 border-[#054C73] rounded-lg" style={{
                backgroundImage: `url(${MapImage})`,
            }}></div>
        </div>
    );
};

export default Contact;
