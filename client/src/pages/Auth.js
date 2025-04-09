import React, {useContext, useEffect, useState} from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {HOMEROUTER, LOGINROUTER, REGISTERROUTER} from "../utils/consts";
import { observer } from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const { userStore } = useContext(Context); // Доступ к UserStore
    const location = useLocation();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRecove, setPasswordRecove] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const checkIsLogin = () =>
        location.pathname === LOGINROUTER ? setIsLogin(true) : setIsLogin(false);

    useEffect(() => {
        checkIsLogin();
        userStore.setError('')
    }, [location.pathname]);

    const handleSubmit = async () => {

        if (isLogin) {
            await userStore.login(phone, password).then(res => navigate(HOMEROUTER), rej => userStore.setError('Не верные логин или пароль')) // Вход
        } else {
            if (!phone || !name || !password || !email) {
                userStore.setError('Заполнены не все поля')
                return;
            }
            if (password !== passwordRecove) {
                userStore.setError('Пароли не совпадают')
                return;
            }
            await userStore.register(name, email, phone, password).then(res => navigate(HOMEROUTER), rej => userStore.setError('Не верные логин или пароль') ); // Регистрация
        }

    };

    return (
        <div className={`auth w-4/5 m-auto ${isLogin ? 'min-h-[65vh]' : 'min-h-[75vh]'} flex flex-col items-start justify-start bg-[#eee] p-4 sm:p-8 sm:ps-0`}>
            <h1 className="text-2xl sm:text-4xl font-bold text-[#054C73] mb-6 text-left">
                {isLogin ? "Вход" : "Регистрация"}
            </h1>
            <div className="w-full m-auto max-w-md mt-10 bg-white shadow-lg rounded-lg p-6 sm:p-8">
                <div className="space-y-4">
                    {isLogin ? (
                        <>
                            <input
                                className="shadow-lg rounded-lg w-full bg-gray-50 h-[48px] text-black p-3 outline-none"
                                placeholder="Номер телефона"
                                type="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <input
                                className="shadow-lg rounded-lg w-full bg-gray-50 h-[48px] text-black p-3 outline-none"
                                placeholder="Пароль"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </>
                    ) : (
                        <>
                            <input
                                className="shadow-lg rounded-lg w-full bg-gray-50 h-[48px] text-black p-3 outline-none"
                                placeholder="ФИО"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                className="shadow-lg rounded-lg w-full bg-gray-50 h-[48px] text-black p-3 outline-none"
                                placeholder="E-mail"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                className="shadow-lg rounded-lg w-full bg-gray-50 h-[48px] text-black p-3 outline-none"
                                placeholder="Номер телефона"
                                type="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <input
                                className="shadow-lg rounded-lg w-full bg-gray-50 h-[48px] text-black p-3 outline-none"
                                placeholder="Пароль"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input
                                className="shadow-lg rounded-lg w-full bg-gray-50 h-[48px] text-black p-3 outline-none"
                                placeholder="Повторите пароль"
                                type="password"
                                value={passwordRecove}
                                onChange={(e) => setPasswordRecove(e.target.value)}
                            />
                        </>
                    )}
                </div>
                <button
                    onClick={handleSubmit}
                    className="bg-[#054C73] mt-6 w-full text-white font-medium tracking-wide rounded-lg px-6 py-3 text-lg hover:bg-[#043b5a] transition duration-300"
                >
                    {isLogin ? "Войти" : "Зарегистрироваться"}
                </button>
                {userStore.error && <p className='text-center text-red-500 mt-2'>{userStore.error}</p>}
                <div className="text-center mt-4">
                    {isLogin ? (
                        <span>
                            Нет аккаунта?{" "}
                            <NavLink to={REGISTERROUTER} className="text-[#054C73] font-bold">
                                Зарегистрироваться
                            </NavLink>
                        </span>
                    ) : (
                        <span>
                            Уже есть аккаунт?{" "}
                            <NavLink to={LOGINROUTER} className="text-[#054C73] font-bold">
                                Войти
                            </NavLink>
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
});

export default Auth;
