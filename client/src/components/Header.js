import React, {useState, useEffect, useContext} from 'react';
import '../style/header.css';
import {NavLink, useNavigate} from 'react-router-dom';
import {
    ABOUTROUTER,
    CARTROUTER,
    CATALOGROUTER,
    CONTACTROUTER,
    HOMEROUTER,
    LOGINROUTER,
    PROFILEROUTER
} from '../utils/consts';
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { userStore } = useContext(Context); // используем UserStore
    const navigation = useNavigate()
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = async () => {
        await userStore.logout();
        navigation(HOMEROUTER)

    };

    // useEffect(() => {
    //     userStore.checkAuth(); // проверка авторизации при монтировании компонента
    // }, [userStore]);

    return (
        <div className="header w-screen max-h-40 h-32 flex flex-col">
            <div className="header_location_box bg-[#eee] w-full h-1/6 flex items-center justify-center">
                <div className="lcoation_box flex w-4/5 gap-1 text-center">
                    <div className="locationIcon"></div>
                    <span className="text-black">Екатеринбург</span>
                </div>
            </div>
            <div className="navbar w-full h-5/6 flex justify-center items-center relative">
                <div className="navbar_box w-4/5 h-full flex justify-between items-center">
                    <div className="logo"></div>
                    <div className="nav hidden lg:flex w-2/5 items-center justify-around text-white font-medium">
                        <NavLink to={HOMEROUTER}>Главная</NavLink>
                        <NavLink to={CATALOGROUTER}>Каталог</NavLink>
                        <NavLink to={ABOUTROUTER}>О компании</NavLink>
                        <NavLink to={CONTACTROUTER}>Контакты</NavLink>
                    </div>
                    <button
                        className="lg:hidden hamburger w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full"
                        onClick={toggleMenu}
                    >
                        ☰
                    </button>
                    {menuOpen && (
                        <div className="mobile-menu absolute z-20 top-full left-0 w-full bg-gray-200 text-black flex flex-col items-center py-4">
                            <NavLink to={HOMEROUTER} className="py-2" onClick={toggleMenu}>
                                Главная
                            </NavLink>
                            <NavLink to={CATALOGROUTER} className="py-2" onClick={toggleMenu}>
                                Каталог
                            </NavLink>
                            <NavLink to={ABOUTROUTER} className="py-2" onClick={toggleMenu}>
                                О компании
                            </NavLink>
                            <NavLink to={CONTACTROUTER} className="py-2" onClick={toggleMenu}>
                                Контакты
                            </NavLink>
                            {userStore.isAuth && <span onClick={handleLogout}>Выйти</span>}
                        </div>
                    )}
                    <div className={`nav_btn_group w-1/6 flex ${userStore.isAuth ? 'sm:justify-around justify-end' : 'sm:justify-center gap-2'}`}>
                        <NavLink to={CARTROUTER}><button className="basket_btn"></button></NavLink>

                        {userStore.isAuth ? (
                            <>
                                <NavLink to={PROFILEROUTER + '/lk'}><button className="person_btn ms-2 inline"></button></NavLink>
                                <button className="logout_btn hidden sm:inline" onClick={handleLogout}></button>
                            </>

                        ) : (
                            <NavLink to={LOGINROUTER}><button className="person_btn"></button></NavLink>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(Header);
