import React from 'react';
import {Link, useLocation} from "react-router-dom";

const Path = () => {
    const location = useLocation();

    if (location.pathname === '/') {
        return null;
    }

    const pathnames = location.pathname.split('/').filter(Boolean);

    const breadcrumbMap = {
        '': 'Главная',
        catalog: 'Каталог',
        about: 'О компании',
        contact: 'Контакты',
        login: 'Вход',
        register: 'Регистрация',
        cart: 'Корзина',
        profile: 'Личный кабинет',
        lk: 'Личные данные',
        orders: 'Мои заказы',
        orderconfirm: 'Оформлние заказа',
        users: 'Пользователи'
    };

    return (
        <div className="text-lg text-gray-800 flex items-center gap-2 ms-[10%] mt-10">
            <Link to="/" className="hover:underline">
                Главная
            </Link>

            {pathnames.map((segment, index) => {
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;

                return (
                    <React.Fragment key={to}>
                        {!(+segment) && <span className="mx-2">→</span>}
                        {isLast ? (
                            <span>{breadcrumbMap[segment] || ((+segment) ? '' : segment) }</span>
                        ) : (
                            <Link to={to} className="hover:underline">
                                {breadcrumbMap[segment] || segment}
                            </Link>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default Path;